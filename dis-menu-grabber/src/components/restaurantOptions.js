import React, { Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import DisplayedMenu from "./displayedMenu";
import "../style/restaurantOptions.css";

class ResturantFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      selectedPark: {},
      selectedResturant: {},
      selectedPeriod: {},
      grabbedMenu: ""
    };
  }

  //handler for reset button to clear the state of all the selectors and displayed menu
  resetPage() {
    this.setState({ grabbedMenu: "" });
    this.setState({ selectedPark: {} });
    this.setState({ selectedResturant: {} });
    this.setState({ selectedPeriod: {} });
  }
  // handler for park select. Save park choice to state for use in POST request
  handleChange1 = selectedPark => {
    this.setState({ selectedPark });
  };
  // handle and save restuarant selection
  handleChange2 = selectedPark => {
    this.setState({ selectedResturant: selectedPark });
  };
  // handle and save period selection
  handleChange3 = selectedPeriod => {
    this.setState({ selectedPeriod });
  };

  render() {
    //choices for park selector
    const parks = [
      { value: "magic-kingdom", label: "Magic Kingdom" },
      { value: "hollywood-studios", label: "Hollywood Studios" },
      { value: "epcot", label: "Epcot" },
      { value: "animal-kingdom", label: "Animal Kingdom" },
      { value: "disney-springs", label: "Disney Springs" }
    ];

    const resturant = [
      //MagicKingdom Signature Dining Options
      {
        value: "cinderella-royal-table",
        label: "Cinderella's Royal Table",
        link: "magic-kingdom"
      },
      // Hollywood Singature Dining Options
      {
        value: "hollywood-brown-derby",
        label: "Hollywood Brown Derby",
        link: "hollywood-studios"
      },
      //Epcot Signature Dining options
      {
        value: "le-cellier-steakhouse",
        label: "Le Cellier Steakhouse",
        link: "epcot"
      },
      {
        value: "monsieur-paul",
        label: "Monsieur Paul",
        link: "epcot"
      },
      //Animal Kingdom Signature Dining options
      {
        value: "tiffins",
        label: "Tiffins Restaurant",
        link: "animal-kingdom"
      },
      //Disney Springs Signature Dining options
      {
        value: "boathouse-restaurant",
        label: "Boathouse Restaurant",
        link: "disney-springs"
      },
      {
        value: "jaleo",
        label: "Jaleo by José Andrés",
        link: "disney-springs"
      },
      {
        value: "morimoto-asia",
        label: "Morimoto Asia",
        link: "disney-springs"
      },
      {
        value: "paddlefish",
        label: "Paddlefish",
        link: "disney-springs"
      },
      {
        value: "stk-steakhouse",
        label: "STK Orlando",
        link: "disney-springs"
      },
      {
        value: "wolfgang-puck-bar-and-grill",
        label: "Wolfgang Puck Bar & Grill",
        link: "disney-springs"
      }
    ];
    //selector for time of meal
    const period = [
      { value: "lunch", label: "Lunch" },
      { value: "dinner", label: "Dinner" }
    ];

    // Filter restuarant off of link value from park selector
    const filteredOptions = resturant.filter(
      o => o.link === this.state.selectedPark.value
    );

    //Load this if the app has not retrieved a menu yet
    if (this.state.grabbedMenu.length === 0) {
      return (
        <div>
          <p>Select the Park</p>
          <Select
            name="form-field-name"
            value={this.state.selectedPark.value}
            onChange={this.handleChange1}
            options={parks}
          />
          <p>Now Select a Resturant</p>
          <Select
            name="form-field-name"
            value={this.state.selectedResturant.value}
            onChange={this.handleChange2}
            options={filteredOptions}
          />
          <p>Select a Time</p>
          <Select
            name="form-field-name"
            value={this.state.selectedPeriod.value}
            onChange={this.handleChange3}
            options={period}
          />
          <div className="button-group">
            <button
              onClick={async () => {
                let park = this.state.selectedPark.value;
                let restaurant = this.state.selectedResturant.value;
                let period = this.state.selectedPeriod.value;
                const desiredMenu = { park, restaurant, period };
                const response = await fetch("http://127.0.0.1:5000/getMenu", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(desiredMenu)
                }).then(function(response) {
                  let menu = response.text();
                  return menu;
                });
                this.setState({ grabbedMenu: JSON.parse(response) });
              }}
            >
              Fetch Menu
            </button>
          </div>
        </div>
      );
    }
    // Load this once menu data has been feteched
    return (
      <div>
        <p>Select the Park</p>
        <Select
          name="form-field-name"
          value={this.state.selectedPark.value}
          onChange={this.handleChange1}
          options={parks}
        />
        <p>Now Select a Resturant</p>
        <Select
          name="form-field-name"
          value={this.state.selectedResturant.value}
          onChange={this.handleChange2}
          options={filteredOptions}
        />
        <p>Select a Time</p>
        <Select
          name="form-field-name"
          value={this.state.selectedPeriod.value}
          onChange={this.handleChange3}
          options={period}
        />
        <div className="button-group">
          <button onClick={this.resetPage.bind(this)}>Reset</button>
        </div>
        <DisplayedMenu menu={this.state.grabbedMenu} />
      </div>
    );
  }
}
export default ResturantFinder;
