const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

app.get('/api/disaster-data', (req, res) => {
  const category = req.query.category;
  let data = [];
  if (category === 'rainfall') {
    data = [
      { location: { lat: 36.778259, lng: 127.419418 }, weight: 3 },
      { location: { lat: 36.576477, lng: 127.292549 }, weight: 2 }
    ];
  } else if (category === 'landslide') {
    data = [
      { location: { lat: 36.778259, lng: 127.419418 }, weight: 4 },
      { location: { lat: 36.576477, lng: 127.292549 }, weight: 3 }
    ];
  } else if (category === 'storm') {
    data = [
      { location: { lat: 36.778259, lng: 127.419418 }, weight: 5 },
      { location: { lat: 36.576477, lng: 127.292549 }, weight: 4 }
    ];
  }
  res.json(data);
});

app.get('/api/location-details', (req, res) => {
  const { lat, lng } = req.query;
  const details = {
    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
    name: `Location at ${lat}, ${lng}`,
    details: 'Detailed information about this location.',
    videoUrl: 'http://example.com/video.mp4',
    chartData: {
      // Chart data to be used by the front-end
    }
  };
  res.json(details);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
