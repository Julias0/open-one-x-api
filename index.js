const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const app = require('express')();
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json())

// connect to Mongo daemon
mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/auth', require('./routes/auth'));
app.use('/me', require('./routes/me'));
app.use('/meeting', require('./routes/meeting'));
app.use('/next-steps', require('./routes/next-step'));
app.use('/classify_question', require('./routes/classify_question'));


const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
