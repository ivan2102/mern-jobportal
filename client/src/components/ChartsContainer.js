import React, {useState} from 'react';
import ComposedChart from './ComposedChart';
import AreaChart from './AreaChart';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';


const ChartsContainer = () => {

const [ barChart, setBarChart ] = useState(true)
const { monthlyApplications: data } = useAppContext()

  return (
    <Wrapper>
      <h4>Monthly report for employeers</h4>

      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'ComposedChart'}
      </button>

      { barChart ? <ComposedChart data={data} /> : <AreaChart data={data} /> }
    </Wrapper>
  )
}
export default ChartsContainer