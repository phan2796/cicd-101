import React from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>PHAN ELAH</p>
        <Link className="App-link" to="/game">
          How good are your eyes?
        </Link>
      </header>
    </div>
  );
}

export default connect(null, null)(Home);
