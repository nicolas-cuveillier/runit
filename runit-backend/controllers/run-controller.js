const User = require('../models/user');
const Club = require('../models/club');
const Run = require('../models/run');
const cron = require('node-cron');
const mongoose = require('mongoose');
const { calculateRecurrence } = require('../helpers/run-helper');

exports.createRun = async (req, res) => {
    const { title, description, start_date, recurrence, location, distance, pace, water_spot, bag_drop, post_event, club, participants } = req.body;

    // Input validation
    if (!title || !description || !start_date || !recurrence || !location || !distance || !pace || !club) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    try {
        // Create a new run
        const newRun = new Run({
            title,
            description,
            start_date,
            recurrence,
            location,
            distance,
            pace,
            water_spot: water_spot || false,
            bag_drop: bag_drop || false,
            post_event: post_event || false,
            club,
            participants: participants || [],
        });

        // Save the run to the database
        const savedRun = await newRun.save();

        // Update the club's runs
        await Club.findByIdAndUpdate(club, { $push: { runs: newRun._id } });

        // Update the participants' runs
        await User.updateMany(
            { _id: { $in: participants } },
            { $push: { runs: savedRun._id } }
        );

        // Respond with the created run
        res.status(201).json({ message: 'Run created successfully', run: newRun });
    } catch (error) {
        console.error('Error creating run:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateRun = async (req, res) => {
    const { id } = req.params;
    const { title, description, start_date, recurrence, location, distance, pace, water_spot, bag_drop, post_event, participants, original_run } = req.body;

    // Input validation
    if (!id) {
        return res.status(400).json({ message: 'Run ID is required' });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const run = await Run.findById(id).session(session);
        if (!run) {
            return res.status(404).json({ message: 'Run not found' });
        }

        // Update fields if they are provided
        if (title) run.title = title;
        if (description) run.description = description;
        if (start_date) run.start_date = start_date;
        if (recurrence) run.recurrence = recurrence;
        if (location) run.location = location;
        if (distance) run.distance = distance;
        if (pace) run.pace = pace;
        if (original_run) run.original_run = original_run;
        if (typeof water_spot !== 'undefined') run.water_spot = water_spot;
        if (typeof bag_drop !== 'undefined') run.bag_drop = bag_drop;
        if (typeof post_event !== 'undefined') run.post_event = post_event;
        if (participants) {
            // Update the participants if they are changed
            run.participants = participants;

            // Remove the run from the old participants
            await User.updateMany(
                { _id: { $in: run.participants } },
                { $pull: { runs: run._id } }
            ).session(session);

            // Add the run to the new participants
            run.participants = participants;
            await User.updateMany(
                { _id: { $in: participants } },
                { $push: { runs: run._id } }
            ).session(session);
        }

        // Save the updated run to the database
        await run.save({ session });

        // If the run is a recurrent run, update the generated runs
        if (run.recurrence !== 'none') {
            const generatedRuns = await Run.find({ original_run: run._id, start_date: { $gt: new Date() } }).session(session);

            for (let generatedRun of generatedRuns) {
                if (title) generatedRun.title = title;
                if (description) generatedRun.description = description;
                if (start_date) {
                    let new_date = new Date(start_date);

                    switch (run.recurrence) {
                        case 'daily':
                            new_date.setDate(new_date.getDate() + (generatedRun.start_date.getDate() - run.start_date.getDate()));
                            break;
                        case 'weekly':
                            new_date.setDate(generatedRun.start_date.getDate() + (run.start_date.getDate() - (generatedRun.start_date.getDate() % 7)));
                            break;
                        case 'monthly':
                            new_date.setMonth(new_date.getMonth() + (generatedRun.start_date.getMonth() - run.start_date.getMonth()));
                            break;
                        default:
                            break;
                    }
                    generatedRun.start_date = new_date;
                }
                if (location) generatedRun.location = location;
                if (distance) generatedRun.distance = distance;
                if (pace) generatedRun.pace = pace;
                if (typeof water_spot !== 'undefined') generatedRun.water_spot = water_spot;
                if (typeof bag_drop !== 'undefined') generatedRun.bag_drop = bag_drop;
                if (typeof post_event !== 'undefined') generatedRun.post_event = post_event;

                await generatedRun.save({ session });
            }
        }

        await session.commitTransaction();

        // Respond with the updated run
        res.status(200).json({ message: 'Run updated successfully', run });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error updating run:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        session.endSession();
    }
};

exports.retrieveRun = async (req, res) => {
    const { id } = req.params;

    // Input validation
    if (!id) {
        return res.status(400).json({ message: 'Run ID is required' });
    }

    try {
        // Find the run by ID
        const run = await Run.findById(id).populate('participants', 'profil_picture');
        if (!run) {
            return res.status(404).json({ message: 'Run not found' });
        }

        // Respond with the retrieved run
        res.status(200).json(run);
    } catch (error) {
        console.error('Error retrieving run:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteRun = async (req, res) => {
    const { id } = req.params;

    // Input validation
    if (!id) {
        return res.status(400).json({ message: 'Run ID is required' });
    }

    try {
        // Find the run by ID and delete it
        const run = await Run.findByIdAndDelete(id);
        if (!run) {
            return res.status(404).json({ message: 'Run not found' });
        }

        // Remove the run from the participants
        await User.updateMany(
            { _id: { $in: run.participants } },
            { $pull: { runs: run._id } }
        );

        // Clean club
        await Club.findByIdAndUpdate(run.club, { $pull: { runs: run._id } });

        // Respond with success message
        res.status(200).json({ message: 'Run deleted successfully' });
    } catch (error) {
        console.error('Error deleting run:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Job that runs daily
exports.createRunsFromRecurrent = () => {
    cron.schedule('* * * * *', async () => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // select every club that has recurrent runs
            const clubs = await Club.aggregate([
                {
                    $lookup: {
                        from: 'runs',
                        localField: 'runs',
                        foreignField: '_id',
                        as: 'runsDetails'
                    }
                },
                {
                    $addFields: {
                        recurrentRuns: {
                            $filter: {
                                input: '$runsDetails',
                                as: 'run',
                                cond: { $ne: ['$$run.recurrence', 'none'] }
                            }
                        }
                    }
                },
                {
                    $match: {
                        recurrentRuns: { $ne: [] }
                    }
                },
            ]).session(session);

            // for each club 
            for (let club of clubs) {
                let generatedRuns = [];

                // for each reccurent run
                for (let run of club.recurrentRuns) {
                    //          calculate recurrence dates
                    const recurrenceDates = calculateRecurrence(run);

                    //          for each date
                    for (const date of recurrenceDates) {
                        //                if a run already exists at this date & time : pass

                        const r = await Club.aggregate([
                            {
                                $match: {
                                    _id: club._id
                                }
                            },
                            {
                                $lookup: {
                                    from: 'runs',
                                    localField: 'runs',
                                    foreignField: '_id',
                                    as: 'runsDetails'
                                }
                            },
                            {
                                $unwind: '$runsDetails'
                            },
                            {
                                $match: {
                                    'runsDetails.recurrence': 'none',
                                    'runsDetails.start_date': new Date(date)
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                }
                            }
                        ]).session(session);

                        if (r.length === 0) {
                            //                else : create a new run by copying the recurrent run and set the recurrence to none
                            delete run._id;
                            const newRun = new Run({
                                ...run,
                                start_date: date,
                                recurrence: 'none',
                            });

                            console.log(newRun);
                            await newRun.save({ session });
                            generatedRuns.push(newRun._id);
                        }
                    }
                }

                club.runs = club.runs.concat(generatedRuns);
                await Club.findByIdAndUpdate(club._id, club, { session });
            }

            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            console.error('Error in cron job:', error);
        } finally {
            session.endSession();
        }
    })
}