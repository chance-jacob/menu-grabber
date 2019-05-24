import React, { Component } from "react";
import "../style/headerArea.css";

// component to allow stying of the header section of the app
class HeaderArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header-area">
        <h1>Disney Menu Fetcher!</h1>
        <p>
          The best way to check up on the ever changing Fine Dining menus at the
          Walt Disney World Resort!
        </p>
      </div>
    );
  }
}

export default HeaderArea;
