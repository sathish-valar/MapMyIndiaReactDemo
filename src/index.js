import React from "react";
import ReactDOM from "react-dom";
// import MapComponent from "./MapComponent";
import MapmyIndia from "mapmyindia-react";

import "./styles.css";
const API_KEY = "4aab3aed0599e48b6a19ace36ce8c9b4";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: "",
      geoData: null,
    };
    // this.searchPINCode = this.searchPINCode.bind(this);
  }

  searchPINCode = (e) => {
    const value = e.target.value;
    this.setState({ pincode: value });
  };

  handleSearch = () => {
    if (!this.state.pincode) {
      alert("Please enter a pincode");
      return;
    }

    fetch(
      `https://apis.mapmyindia.com/advancedmaps/v1/${API_KEY}/geo_code?addr=${this.state.pincode}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        this.setState({ geoData: data });
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  onMapClick = (value) => {
    console.log(":;;;;;;;;; val ", value);
  };

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <div>Enter Pincode </div>
        <input
          style={{ margin: "10px", width: "200px", height: "20px" }}
          type="text"
          onChange={this.searchPINCode}
          value={this.state.pincode}
        />
        <button style={{ padding: "8px 16px" }} onClick={this.handleSearch}>
          Search
        </button>
        <div id="mapyyy" style={{ width: "100%", height: "100%" }}>
          <MapmyIndia onDblclick={this.onMapClick} />
        </div>

        {this.state.geoData && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <h3>Geo API Response:</h3>
            <pre>{JSON.stringify(this.state.geoData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
