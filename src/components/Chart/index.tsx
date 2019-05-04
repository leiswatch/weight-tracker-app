import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { sortBy } from 'lodash';

type data = {
  weight: number;
  date: Date;
};

interface chartProps {
  data: data[];
}

const Chart: React.FC<chartProps> = ({ data }) => {
  const sortedData = sortBy(data, 'date');

  return (
    <div>
      {data && (
        <LineChart
          width={730}
          height={250}
          data={sortedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='weight' stroke='#8884d8' />
        </LineChart>
      )}
    </div>
  );
};

export default Chart;
