const express = require('express');
const session = require('express-session');
const cors = require('cors');
const routes = require('./app/routes/index');
// const uploadImg = require('./middleware/uploadImg')

const app = express();
require('dotenv').config();

app.use(
    session({
        secret: 'mySecretKey', // Chuỗi bí mật dùng để mã hóa session
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcom to book management application.', session: req.session });
});

const MongooseService = require('./app/services/mongoose.service');
MongooseService.connectDB();

routes(app);

module.exports = app;