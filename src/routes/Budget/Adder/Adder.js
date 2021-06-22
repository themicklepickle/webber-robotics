import React from "react";
import currencyToSymbolMap from "currency-symbol-map/map";

export default class Adder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "name",
      priority: 3,
      description: "description",
      vendor: "Home Depot",
      quantity: 3,
      unitPrice: 10,
      unitPriceCurrency: "CAD",
      url: "http://www.google.ca",
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    console.log(this.state.unitPriceCurrency);
    this.props.addItem(this.state);
  };

  render() {
    return (
      <div>
        <input
          placeholder="name"
          name="name"
          onChange={this.handleInputChange}
        ></input>
        <input
          placeholder="priority"
          name="priority"
          type="number"
          onChange={this.handleInputChange}
        ></input>
        <input
          placeholder="description"
          name="description"
          onChange={this.handleInputChange}
        ></input>
        <input
          placeholder="vendor"
          name="vendor"
          onChange={this.handleInputChange}
        ></input>
        <input
          placeholder="quantity"
          name="quantity"
          type="number"
          onChange={this.handleInputChange}
        ></input>
        <input
          placeholder="unit price"
          name="unitPrice"
          type="number"
          onChange={this.handleInputChange}
        ></input>
        <select
          placeholder="unit price currency"
          name="unitPriceCurrency"
          onChange={this.handleInputChange}
          defaultValue="CAD"
        >
          {Object.entries(currencyToSymbolMap).map(([key, val]) => {
            return <option key={key} value={key}>{`${key} (${val})`}</option>;
          })}
        </select>
        <input
          placeholder="URL"
          name="url"
          onChange={this.handleInputChange}
        ></input>
        <button onClick={this.handleClick}>insert</button>
      </div>
    );
  }
}
