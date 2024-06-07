import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
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

const libraries = ['visualization'];

// Dummy data for heatmap with higher weight for specific areas
const dummyData = [
  { location: { lat: 36.3, lng: 127.8 }, weight: 0, category: '강수량' },
  { location: { lat: 36.4, lng: 127.9 }, weight: 0, category: '풍수해' },
  { location: { lat: 36.2, lng: 127.7 }, weight: 0, category: '산사태' },
  { location: { lat: 36.35063386120811, lng: 127.35235004425047 }, weight: 100, category: '강수량' }, // Daejeon example
  { location: { lat: 37.46745297346658, lng: 127.0330513000488 }, weight: 0, category: '풍수해' },
  { location: { lat: 35.185649127848336, lng: 129.10122756958006 }, weight: 0, category: '산사태' }
];

const videoURLs = {
  "36.35063386120811,127.35235004425047": "http://cctvsec.ktict.co.kr/9970/4hMr0kyj59zQUuh0Tv8b+ctK/kUSxQWREnnLJWWJeRL9IHlX0Veu1ItOR9Mjb306",
  "37.46745297346658,127.02250270843504": "http://cctvsec.ktict.co.kr/9973/muzof50ma0nbDM33Zht8mmuUO28iidKbUyX+i91bAl4x1J8q5K8AOPIB00Yykpj8",
  "35.185649127848336,129.1115358352661": "http://cctvsec.ktict.co.kr/9967/bQD0iEcxnOWtskuKmZ130WyLdeRgoB71smnw9VxEqzbXqXFaaTtxXL6F+osUGCBh"
};

// Define the bounding polygon for South Korea
const southKoreaPolygon = [
  { lat: 37.11236475252168, lng: 126.83485107421873 },
  { lat: 36.78035393090839, lng: 126.83485107421873 },
  { lat: 36.78035393090839, lng: 126.55909423828123 },
  { lat: 36.4483431092951, lng: 126.55909423828123 },
  { lat: 36.11633228768182, lng: 126.83485107421873 },
  { lat: 35.78432146606853, lng: 126.83485107421873 },
  { lat: 35.452310644455245, lng: 126.55909423828123 },
  { lat: 35.12029982284196, lng: 126.55909423828123 },
  { lat: 34.78828900122867, lng: 126.55909423828123 },
  { lat: 34.78828900122867, lng: 126.83485107421873 },
  { lat: 34.78828900122867, lng: 127.11060791015623 },
  { lat: 34.35774523327822, lng: 127.1795471191406 },
  { lat: 34.35774523327822, lng: 127.59318237304683 },
  { lat: 35.12029982284196, lng: 127.93787841796873 },
  { lat: 35.12029982284196, lng: 128.21363525390623 },
  { lat: 35.12029982284196, lng: 128.48939208984373 },
  { lat: 34.86063980068315, lng: 128.97196655273436 },
  { lat: 34.86063980068315, lng: 129.1098449707031 },
  { lat: 35.028438979842214, lng: 129.3856018066406 },
  { lat: 35.452310644455245, lng: 129.04090576171873 },
  { lat: 35.78432146606853, lng: 129.04090576171873 },
  { lat: 35.86231947275347, lng: 129.66135864257808 },
  { lat: 36.4483431092951, lng: 129.04090576171873 },
  { lat: 36.78035393090839, lng: 129.04090576171873 },
  { lat: 37.11236475252168, lng: 129.04090576171873 },
  { lat: 37.518580670962606, lng: 129.24772338867186 },
  { lat: 37.444375574134966, lng: 128.76514892578123 },
  { lat: 37.776386395748254, lng: 128.48939208984373 },
  { lat: 37.776386395748254, lng: 127.93787841796873 },
  { lat: 37.776386395748254, lng: 127.66212158203123 },
  { lat: 37.776386395748254, lng: 127.38636474609373 },
  { lat: 37.776386395748254, lng: 127.11060791015623 },
  { lat: 37.444375574134966, lng: 126.83485107421873 }
];

// Function to check if a point is within the South Korea polygon
const isWithinSouthKorea = (lat, lng) => {
  let x = lng, y = lat;
  let inside = false;
  for (let i = 0, j = southKoreaPolygon.length - 1; i < southKoreaPolygon.length; j = i++) {
    let xi = southKoreaPolygon[i].lng, yi = southKoreaPolygon[i].lat;
    let xj = southKoreaPolygon[j].lng, yj = southKoreaPolygon[j].lat;

    let intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
};

const Dashboard = ({ category }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [zoomStep, setZoomStep] = useState(0);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isValidCell, setIsValidCell] = useState(true);

  useEffect(() => {
    // Replace API call with dummy data
    const fetchData = async () => {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setHeatmapData(dummyData);
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    if (map) {
      const listener = map.addListener('bounds_changed', () => {
        setBounds(map.getBounds());
      });
      return () => listener.remove();
    }
  }, [map]);

  useEffect(() => {
    setZoomStep(0);
    setSelectedCell(null);
    setIsGridVisible(true);
  }, [category]);

  const handleCellClick = (lat, lng) => {
    console.log('Clicked cell coordinates:', { lat, lng });
    if (!isGridVisible) {
      return;
    }

    if (!isWithinSouthKorea(lat, lng)) {
      alert('This area is not supported.');
      setIsValidCell(false);
      setSelectedCell({ lat, lng });
      setIsGridVisible(false);
      return;
    }

    setIsValidCell(true);

    if (map && zoomStep < 2) {
      const zoomIncrements = [10, 13];
      const newZoom = zoomIncrements[zoomStep] || 15;
      const center = new window.google.maps.LatLng(lat, lng);
      map.panTo(center);
      map.setZoom(newZoom);
      setZoomStep((prevStep) => (prevStep + 1));
    } else {
      setSelectedCell({ lat, lng });
      setIsGridVisible(false);
    }
  };

  const getGridCellOpacity = (lat, lng) => {
    const cellData = heatmapData.find(
      item =>
        Math.abs(item.location.lat - lat) < 0.05 && Math.abs(item.location.lng - lng) < 0.05
    );
    if (cellData) {
      return Math.min(cellData.weight * 0.1, 1); // Adjust the factor to control opacity range
    }
    return 0.1;
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
        const cellOpacity = getGridCellOpacity(lat - latStep / 2, lng + lngStep / 2);
        const isDaejeon = lat > 36.3 - latStep / 2 && lat < 36.4 + latStep && lng > 127.3 - lngStep / 2 && lng < 127.4 + lngStep / 2;

        gridCells.push(
          <div
            key={`${row}-${col}`}
            className={`grid-cell ${category} ${isDaejeon ? `highlight-cell-${category}` : ''}`}
            style={{
              width: `${100 / 10}%`,
              height: `${100 / 10}%`,
              top: `${(boundsNE.lat() - lat) / (boundsNE.lat() - boundsSW.lat()) * 100}%`,
              left: `${(lng - boundsSW.lng()) / (boundsNE.lng() - boundsSW.lng()) * 100}%`,
              '--bg-opacity': cellOpacity
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
        libraries={libraries}
        loadingElement={<div>Loading...</div>}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8.5}
          onLoad={mapInstance => setMap(mapInstance)}
        >
        </GoogleMap>
      </LoadScript>
      <div className="grid-overlay">
        {generateGrid()}
      </div>
      {selectedCell && (
        <div className="modal-overlay">
          <button className="close-button" onClick={closeModal}>X</button>
          <DetailInfos 
            category={category} 
            selectedCell={selectedCell} 
            videoURLs={videoURLs} 
            isValidCell={isValidCell}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
