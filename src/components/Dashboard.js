import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';
import axios from 'axios';
import DetailInfos from './DetailInfos';
import './Dashboard.css';

const containerStyle = {
  width: '100%',
  height: '1500px',
  position: 'relative'
};

const center = {
  lat: 36.3,
  lng: 127.8
};

const Dashboard = ({ category }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [zoomStep, setZoomStep] = useState(0);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    axios.get(`/api/disaster-data?category=${category}`)
      .then(response => {
        setHeatmapData(response.data);
      });
  }, [category]);

  useEffect(() => {
    if (map) {
      const listener = map.addListener('bounds_changed', () => {
        setBounds(map.getBounds());
      });
      return () => listener.remove();
    }
  }, [map]);

  const handleCellClick = (lat, lng) => {
    if (map && zoomStep < 2) {
      const zoomIncrements = [10, 13]; // Define the zoom levels for each step
      const newZoom = zoomIncrements[zoomStep] || 15;
      const center = new window.google.maps.LatLng(lat, lng);
      map.panTo(center);
      map.setZoom(newZoom);
      setZoomStep((prevStep) => (prevStep + 1));
    } else { // open a modal window
        setSelectedCell({ lat, lng });
        setIsGridVisible(false);
    }
  };

  const generateGrid = () => {
    if (!bounds || !isGridVisible) return null;
    const gridCells = [];
    const boundsNE = bounds.getNorthEast();
    const boundsSW = bounds.getSouthWest();
    const latStep = (boundsNE.lat() - boundsSW.lat()) / 10;
    const lngStep = (boundsNE.lng() - boundsSW.lng()) / 10;

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const lat = boundsNE.lat() - latStep * row;
        const lng = boundsSW.lng() + lngStep * col;
        gridCells.push(
          <div
            key={`${row}-${col}`}
            className="grid-cell"
            style={{
              width: `${100 / 10}%`,
              height: `${100 / 10}%`,
              top: `${(boundsNE.lat() - lat) / (boundsNE.lat() - boundsSW.lat()) * 100}%`,
              left: `${(lng - boundsSW.lng()) / (boundsNE.lng() - boundsSW.lng()) * 100}%`
            }}
            onClick={() => handleCellClick(lat - latStep / 2, lng + lngStep / 2)}
          ></div>
        );
      }
    }
    return gridCells;
  };

  const closeModal = () => {
    setSelectedCell(null);
    setIsGridVisible(true);
  };

  return (
    <div className="map-container">
      <LoadScript
        googleMapsApiKey="AIzaSyDuz-EmVBl-jQPPDpExnswSwiwiIsQOPTs"
        libraries={['visualization']}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8.5}
          onLoad={mapInstance => setMap(mapInstance)}
        >
          <HeatmapLayer data={heatmapData.map(item => ({
            location: new window.google.maps.LatLng(item.location.lat, item.location.lng),
            weight: item.weight
          }))} />
        </GoogleMap>
      </LoadScript>
      <div className="grid-overlay">
        {generateGrid()}
      </div>
      {selectedCell && (
        <div className="modal-overlay">
          <button className="close-button" onClick={closeModal}>X</button>
          <DetailInfos />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
