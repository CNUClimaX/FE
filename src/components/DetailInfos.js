import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DetailInfos.css';

const DetailInfos = ({ category, selectedCell, videoURLs, isValidCell }) => {
  const data = [
    { name: 'Monday', value: 15 },
    { name: 'Tuesday', value: 10 },
    { name: 'Wednesday', value: 10 },
    { name: 'Thursday', value: 3 },
    { name: 'Friday', value: 7 },
    { name: 'Saturday', value: 0 },
    { name: 'Sunday', value: 0 },
  ];

  const cellKey = `${selectedCell.lat},${selectedCell.lng}`;
  const videoURL = videoURLs[cellKey] || null;

  if (!isValidCell) {
    return (
      <div className="detail-infos">
        <h2>해당 지역에 대한 정보는 제공하지 않습니다</h2>
      </div>
    );
  }

  return (
    <div className="detail-infos">
      <h2>{category} Information</h2>
      <div className="video-section">
        <div className="video-container">
          <h3>Live CCTV Feed</h3>
          {videoURL ? (
            <video width="640" height="480" controls>
              <source src={videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>선택한 위치에 대한 영상정보가 존재하지 않습니다.</p>
          )}
        </div>
      </div>
      <div className="graph-section">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 20]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DetailInfos;
