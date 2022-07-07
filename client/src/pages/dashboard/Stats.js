import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import StatsContainer from "../../components/StatsContainer";
import ChartsContainer from "../../components/ChartsContainer";
import Loading from '../../components/Loading';

const Stats = () => {

  const { showStats, isLoading, monthlyApplications } = useAppContext()

  useEffect(() => {

    showStats()
  }, [])

  if(isLoading) return <Loading center/>

  return (
    <>
    <StatsContainer />
    { monthlyApplications.length > 0 && <ChartsContainer /> }
    </>
  )
}

export default Stats