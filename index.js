const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://karrtopelka:M2A0X0M2ongo@cluster0.gyxbn.mongodb.net/krrtp-sigma-test?retryWrites=true&w=majority`,
      { useUnifiedTopology: true, useNewUrlParser: true },
    );
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
