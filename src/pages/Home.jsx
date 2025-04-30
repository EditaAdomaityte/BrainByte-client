import React from "react";
import logo from "./logo.png"; // 

function Home() {
  return (
    <section className="section has-text-centered has-background-white">
      <div className="container">
        <h1 className="title is-1 has-text-weight-bold has-text-dark mb-5">
          Welcome to
        </h1>
        <figure className="image is-256x256 is-inline-block">
          <img src={logo} alt="BrainByte Logo" />
        </figure>
      </div>
    </section>
  );
}

export default Home;