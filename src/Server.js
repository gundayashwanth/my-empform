const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/submitForm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  employeeId: String,
  company: String,
  designation: String,
});

const Submission = mongoose.model('Submission', submissionSchema);

app.get('/fetch-data', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions); // Use a different variable name here
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/submitForm', async (req, res) => {
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.status(201).send('Form submitted successfully!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/delete-form/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Submission.findByIdAndDelete(id);
    res.send(`Form with ID ${id} deleted successfully!`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/update-form/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Submission.findByIdAndUpdate(id, req.body);
    res.send(`Form with ID ${id} updated successfully!`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
