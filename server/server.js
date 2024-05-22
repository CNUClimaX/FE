const express = require('express');
const app = express();
const port = 5000;

app.get('/api/disaster-data', (req, res) => {
  const data = [
    { location: { lat: 36.778259, lng: 127.419418 }, weight: 3 },
    { location: { lat: 36.576477, lng: 127.292549 }, weight: 2 }
  ];
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
