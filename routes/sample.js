const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const dataFilePath = 'hospital_data.json';
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// GET all hospitals
router.get('/hospitals', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    res.json(JSON.parse(data));
  });
});


// POST a new hospital
router.post('/add', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {

    const hospitals = JSON.parse(data);
    hospitals.push(req.body);

    fs.writeFile(dataFilePath, JSON.stringify(hospitals), 'utf8', (err) => {
      res.json(hospitals);
    });
  });
});


// Update a hospital
router.put('/update/:id', (req, res) => {
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
router.delete('/delete-hospital/:id', (req, res) => {
  const hospitalId = Number(req.params.id);

  fs.readFile(dataFilePath, 'utf8', (err, data) => {

    const hospitals = JSON.parse(data);
    const updatedHospitals = hospitals.filter(h => h.id !== hospitalId);

    fs.writeFile(dataFilePath, JSON.stringify(updatedHospitals), 'utf8', (err) => {
      res.json({ message: 'Hospital deleted successfully' });
    });
  });
});

module.exports = router