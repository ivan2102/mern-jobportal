import StatsItem from "./StatsItem";
import { useAppContext } from '../context/appContext';
import {RiSuitcaseFill} from 'react-icons/ri';
import {GoCalendar} from 'react-icons/go';
import {VscBug} from 'react-icons/vsc';
import Wrapper from '../assets/wrappers/StatsContainer';


const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <RiSuitcaseFill />,
      color: "#9c88ff",
      bcg: "#8c7ae6",
    },

    {
      title: "interview scheduled",
      count: stats.interview || 0,
      icon: <GoCalendar />,
      color: "#D6A2E8",
      bcg: "#82589F",
    },

    {
      title: "jobs searching",
      count: stats.searching || 0,
      icon: <VscBug />,
      color: "#6a89cc",
      bcg: "#54a0ff",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {

        return <StatsItem key={index} {...item} />
      })}
     
    </Wrapper>
  );
};
export default StatsContainer