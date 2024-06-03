import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DetailInfos.css';
const DetailInfos = ({ category }) => {
  const data = [
    { name: 'Monday', value: 15 },
    { name: 'Tuesday', value: 10 },
    { name: 'Wednesday', value: 10 },
    { name: 'Thursday', value: 3 },
    { name: 'Friday', value: 7 },
    { name: 'Saturday', value: 0 },
    { name: 'Sunday', value: 0 },
  ];

  return (
    <div className="detail-infos">
      <h2>{category} Information</h2>
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
            <YAxis domain={[0, 10]} />
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
