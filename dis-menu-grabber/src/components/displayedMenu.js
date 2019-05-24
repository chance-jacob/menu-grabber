import React, { Component } from "react";

let globalKey = " ";

// function to allow for posting only 1 section Title per menuItem rendered
function isUnique(currentKey) {
  if (currentKey === globalKey) {
    return "";
  } else {
    globalKey = currentKey;
    return currentKey;
  }
}
//create each menuItem as object
function getMenuItem(currentMenuItem) {
  let menuItem = {
    catagory: "",
    name: "",
    description: "",
    price: ""
  };
  // length of array will determine if there is a price and a description.
  if (currentMenuItem.length === 4) {
    menuItem.catagory = currentMenuItem[0];
    menuItem.name = currentMenuItem[1];
    menuItem.description = currentMenuItem[2];
    menuItem.price = currentMenuItem[3];
  }

  if (currentMenuItem.length === 3) {
    menuItem.catagory = currentMenuItem[0];
    menuItem.name = currentMenuItem[1];
    menuItem.price = currentMenuItem[3];
    menuItem.description = " ";
  }
  return menuItem;
}
// iterate through the the array of all the items sent from the parseString
function getAllMenuItems(menuArray) {
  let menuItems = [];
  let i = 0;

  while (i < menuArray.length) {
    let currentMenuItem = menuArray[i];
    let item = getMenuItem(currentMenuItem);
    menuItems.push(item);
    i++;
  }

  return menuItems;
}

// convert the string sent from the backend to a nested array.
function parseString(menuString) {
  menuString = menuString.menu;

  let menuArray = menuString.split("###");
  let sortedMenuArray = [];
  let menuItems = [];
  let i = 1;
  let keyPointer = -1;

  while (i < menuArray.length) {
    let currentStr = menuArray[i];
    let firstChar = currentStr[0];

    if (firstChar === " ") {
      let getStr = menuArray[i];
      let cleanStr = getStr.split("/n");
      let finalStr = cleanStr[0].trim();
      sortedMenuArray.push(finalStr);
      keyPointer += 1;
    }

    if (firstChar === "#") {
      let dishInfo = [];
      let currentKey = sortedMenuArray[keyPointer];
      dishInfo.push(currentKey);
      let getStr = menuArray[i];
      let strArray = [];
      strArray = getStr.split("\n\n");
      let dishName = strArray[0];
      let dishNameArray = dishName.split("#");
      dishName = dishNameArray[1];
      dishName = dishName.trim();
      dishInfo.push(dishName);

      if (strArray.length === 4) {
        dishInfo.push(strArray[1]);
        dishInfo.push(strArray[2]);
      }
      if (strArray.length === 3) {
        dishInfo.push(strArray[1]);
      }
      menuItems.push(dishInfo);
    }
    i++;
  }
  menuItems = getAllMenuItems(menuItems);

  return menuItems; //formattedMenu;
}

class DisplayedMenu extends Component {
  constructor() {
    super();
    this.state = {
      parsedMenu: ""
    };
  }

  //allows for parsing and converted the json string sent to this component between calling of the component and rendering of the text
  componentWillMount(menu) {
    menu = this.props.menu; //retrieves json string value
    menu = parseString(menu); // turns json string into jsonArray
    this.setState({ parsedMenu: menu }); //attempting to set state to alow for .map()
  }

  render() {
    return this.state.parsedMenu.map(menuItem => (
      <div>
        <h3>{isUnique(menuItem.catagory)}</h3>
        <div>
          <p>{menuItem.name}</p>
          <p>{menuItem.description}</p>
          <p>{menuItem.price}</p>
        </div>
      </div>
    ));
  }
}

export default DisplayedMenu;
