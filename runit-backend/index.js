const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user-routes');
const clubRoutes = require('./routes/club-routes');
const runRoutes = require('./routes/run-routes');
const uploadRoutes = require('./routes/upload-routes');

require('./database/database')

const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/v1/user', userRoutes);
app.use('/v1/club', clubRoutes);
app.use('/v1/run', runRoutes);
app.use('/v1/upload', uploadRoutes);

app.listen(8080, () => {
    console.log(`Server running on port ${8080}`)
})