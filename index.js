
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Helpers
const randInt = n => Math.floor(Math.random() * n);
const getRandomItemFromArray = arr => arr[randInt(arr.length)];

// Dog image data
const dogData = {
  beagle: ['beagle1.jpg', 'beagle2.jpg'],
  labrador: ['labrador1.jpg'],
  poodle: ['poodle1.jpg', 'poodle2.jpg']
};

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// API: GET /breeds — list all breeds
app.get('/breeds', (req, res) => {
  res.json(Object.keys(dogData));
});

// API: GET /image/:breed — return a random image for the breed
app.get('/image/:breed', (req, res) => {
  const breed = req.params.breed.toLowerCase();
  const images = dogData[breed];

  if (!images) {
    return res.status(404).json({ error: 'Breed not found' });
  }

  const selectedImage = getRandomItemFromArray(images);
  res.json({ image: `/img/${selectedImage}` });
});

// Fallback: serve index.html for other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => {
  console.log(`🐶 Local Dog API server running at http://localhost:${PORT}`);
});
