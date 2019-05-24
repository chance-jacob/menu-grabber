import React from "react";
import "./App.css";
import RestaurantOptions from "./components/restaurantOptions";
import "./style/restaurantOptions.css";
import HeaderArea from "./components/headerArea";
function App() {
  return (
    <div className="App">
      <HeaderArea />
      <RestaurantOptions />
    </div>
  );
}

export default App;
