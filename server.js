const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const fastcsv = require("fast-csv");
const fs = require("fs");
const Request = require("./models/requests");

const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3000;


cloudinary.config({
  cloud_name: 'dyavdpwv8',
  api_key: '121497323163754',
  api_secret: '_NrGzF6AAe2SIkWXypn4cOcL734'
});


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// fs = require('fs')
const csv = require("fast-csv");

const stream = fs.createReadStream("customers-100.csv");

const data = [];
const websites = [];
const compressed_url = [];

csv
  .parseStream(stream, { headers: true })
  .on("data", (row) => {
    data.push([row.Index, row.Customer_Id, row.Website]);
  })
  .on("end", () => {
    console.log(data);
    let uploadPromises = [];

    for (let i = 0; i < 1; i++) {
      let website = data[i][2];
      let uploadPromise = cloudinary.uploader.upload(website, {
        width: 0.5, // Scale to 50% width
        crop: "scale"
      }).then(result => {
        compressed_url.push(result.secure_url);
      }).catch(error => {
        console.error('Error uploading image:', error);
      });
      
      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises).then(() => {
      console.log('All images processed:', compressed_url);
    });
  });
// Multer setup for file uploads
// const upload = multer({ dest: 'uploads/' });

// const mongoUri = 'mongodb+srv://deepak8654454:JUkMMXXU4i7BJKBq@test-pro-db.ql5vw.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db'; // Replace with your MongoDB URI
// mongoose.connect(mongoUri)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

console.log(websites)
app.get("/", (req, res) => {
  res.send("Welcome to the backend application");
});


app.get("/data", async (req, res) => {
  res.send(websites);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});