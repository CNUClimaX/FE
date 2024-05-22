import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '1500px'
};

const center = {
  lat: 36.5,
  lng: 127.5
};

const Dashboard = ({ category }) => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    axios.get(`/api/disaster-data?category=${category}`)
      .then(response => {
        setHeatmapData(response.data);
      });
  }, [category]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDuz-EmVBl-jQPPDpExnswSwiwiIsQOPTs"
      libraries={['visualization']}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
        <HeatmapLayer data={heatmapData.map(item => ({
          location: new window.google.maps.LatLng(item.location.lat, item.location.lng),
          weight: item.weight
        }))} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Dashboard;
