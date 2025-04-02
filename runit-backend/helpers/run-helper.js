exports.calculateRecurrence = (run) => {
    const recurrenceDates = [];
    const currentDate = new Date();
    const endDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000); 

    let nextDate = new Date(run.start_date);

    while (nextDate <= endDate) {
        if (nextDate >= currentDate) {
            recurrenceDates.push(new Date(nextDate));
        }

        switch (run.recurrence) {
            case 'daily':
                nextDate.setDate(nextDate.getDate() + 1);
                break;
            case 'weekly':
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case 'monthly':
                nextDate.setMonth(nextDate.getMonth() + 1);
                break;
            default:
                break;
        }
    }

    return recurrenceDates;
};