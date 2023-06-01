const express = require('express');
const fs = require('fs');
require('dotenv').config();
const app = express();
app.use(express.json());

const dataFilePath = 'hospital_data.json';

// GET all hospitals
app.get('/hospitals', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    res.json(JSON.parse(data));
  });
});

// POST a new hospital
app.post('/hospitals', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {

    const hospitals = JSON.parse(data);
    hospitals.push(req.body);

    fs.writeFile(dataFilePath, JSON.stringify(hospitals), 'utf8', (err) => {

      res.json(hospitals);
    });
  });
});

// PUT (update) a hospital
app.put('/hospitals/:id', (req, res) => {
  const hospitalId = req.params.id;
  const updatedHospital = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {

    const hospitals = JSON.parse(data);
    const hospitalIndex = hospitals.findIndex(h => h.id === hospitalId);


    hospitals[hospitalIndex] = updatedHospital;

    fs.writeFile(dataFilePath, JSON.stringify(hospitals), 'utf8', (err) => {
     

      res.json(updatedHospital);
    });
  });
});

// DELETE a hospital
app.delete('/hospitals/:id', (req, res) => {
  const hospitalId = req.params.id;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {


    const hospitals = JSON.parse(data);
    const updatedHospitals = hospitals.filter(h => h.id !== hospitalId);



    fs.writeFile(dataFilePath, JSON.stringify(updatedHospitals), 'utf8', (err) => {


      res.json({ message: 'Hospital deleted successfully' });
    });
  });
});

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});