import React, { Component, createRef } from "react";

import D3Chart from "./D3Chart";

class D3Wrapper extends Component {
  constructor(props) {
    super(props);

    this.chart = createRef();
  }

  componentDidMount() {
    new D3Chart(this.chart);
  }

  render() {
    return <div ref={this.chart} />;
  }
}

export default D3Wrapper;
