import Header from "./Components/header";
import { useState, useEffect } from "react";
import Receipe from "./Components/receipe";
function App() {
  const [receipeLists, setReceipeLists] = useState([]);

  const pull_data = (data) => {
    setReceipeLists(data);
    preload();
  };

  const extract_data = (data) => {
    let receipe = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("receipeList")) {
        receipe = JSON.parse(localStorage.getItem("receipeList"));
      }
      receipe.forEach((item, i) => {
        if (item.id === data) {
          receipe.splice(i, 1);
        }
      });
      localStorage.setItem("receipeList", JSON.stringify(receipe));
    }
    preload();
    return receipe;
  };

  const preload = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("receipeList") !== null) {
        setReceipeLists(JSON.parse(localStorage.getItem("receipeList")));
      }
    }
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <>
      <div className="head">
        <Header addChild={pull_data} title="receipe-box" />
        <Receipe deleteChild={extract_data} value={receipeLists} />
      </div>
    </>
  );
}

export default App;
