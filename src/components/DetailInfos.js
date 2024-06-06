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

  const videoURL = "http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=27K4jLbMwPAQvxz0K83HFfIl9c15OkGtvGqiK7WvrRAILCIDYX6x8inx0GH0TP7bgdjKxtbI06gGh81qg&cctvid=L280076&cctvName=%25EC%25A4%2591%25EA%25B3%25A1%25EC%259C%25A1%25EA%25B5%2590%25EC%25B0%25A8%25EB%25A1%259C(8%25EB%25B2%2588%25EA%25B5%2590%25EC%25B0%25A8%25EB%25A1%259C)-01&kind=t&cctvip=null&cctvch=null&id=637bef0325205&cctvpasswd=04&cctvport=null";

  return (
    <div className="detail-infos">
      <h2>{category} Information</h2>
      <div className="video-section">
        <div className="video-container">
          <h3>Live CCTV Feed</h3>
          <video width="640" height="480" controls>
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
