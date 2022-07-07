import { ComposedChart, Bar, XAxis, YAxis, Area, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ComposedChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
    <ComposedChart data={data} margin={{top: 50}}>
      <CartesianGrid strokeDasharray='3 3' />
      <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
      <XAxis dataKey='date' />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey='count' barSize={50} fill='#413ea0' />
      <Line type="monotone" dataKey="count" stroke="#ff7300" />
    </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ComposedChartComponent