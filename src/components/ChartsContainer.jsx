import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useAppContext } from "../context/appContext";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";

const ChartsContainer = () => {
  const [isBarChart, setIsBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        onClick={() => {
          setIsBarChart((prevState) => !prevState);
        }}
      >
        {isBarChart ? "Area Chart" : "Bar Chart"}
      </button>
      {isBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
