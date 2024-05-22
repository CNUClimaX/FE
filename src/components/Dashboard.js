import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';
import axios from 'axios';
import './Dashboard.css'; // Dashboard.css 파일을 임포트합니다.

const containerStyle = {
  width: '100%',
  height: '1500px',
  position: 'relative'
};

const center = {
  lat: 36.5,
  lng: 127.5
};

const Dashboard = ({ category }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    axios.get(`/api/disaster-data?category=${category}`)
      .then(response => {
        setHeatmapData(response.data);
      });
  }, [category]);

  const handleCellClick = (row, col) => {
    if (map) {
      const lat = 33.0 + (5.0 * (9 - row) / 9.0); // 33.0 ~ 38.0 사이의 위도, 상하 반전
      const lng = 124.0 + (7.0 * col / 9.0); // 124.0 ~ 131.0 사이의 경도
      map.panTo({ lat, lng });
      map.setZoom(10); // 확대 레벨 설정
    }
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
          zoom={8}
          onLoad={mapInstance => setMap(mapInstance)}
        >
          <HeatmapLayer data={heatmapData.map(item => ({
            location: new window.google.maps.LatLng(item.location.lat, item.location.lng),
            weight: item.weight
          }))} />
        </GoogleMap>
      </LoadScript>
      <div className="grid-overlay">
        {[...Array(10)].map((_, row) => (
          <div key={row} className="grid-row">
            {[...Array(10)].map((_, col) => (
              <div
                key={col}
                className="grid-cell"
                onClick={() => handleCellClick(row, col)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
