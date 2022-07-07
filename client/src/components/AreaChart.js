import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const AreaChartComponent = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data} margin={{top: 50}}>
        <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs> 
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"  />
        <Area type="monotone" dataKey="count" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent