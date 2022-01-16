import Header from "./Components/header";
import { useState, useEffect } from "react";
import Receipe from "./Components/receipe";
function App() {
  const [receipeList, setReceipeList] = useState([]);
  const pull_data = (data) => {
    setReceipeList(data);
    preload();
  };

  const preload = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("receipeList") !== null) {
        setReceipeList(JSON.parse(localStorage.getItem("receipeList")));
      }
    }
  };

  useEffect(() => {
    preload();
  }, []);

  console.log(receipeList);
  return (
    <>
      <div className="head">
        <Header addChild={pull_data} title="receipe-box" />
        <Receipe value={receipeList} />
      </div>
    </>
  );
}

export default App;
