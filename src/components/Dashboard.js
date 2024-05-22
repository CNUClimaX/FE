import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 36.5,
  lng: 127.5
};

const Dashboard = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    axios.get('/api/disaster-data')
      .then(response => {
        setHeatmapData(response.data);
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
        <HeatmapLayer data={heatmapData} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Dashboard;
