import React from "react";
import { Navbar, Container } from "react-bootstrap";

import Chart from "./components/Chart.wrapper";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>Bar Chart</Navbar.Brand>
      </Navbar>
      <Container>
        <Chart />
      </Container>
    </div>
  );
}

export default App;
