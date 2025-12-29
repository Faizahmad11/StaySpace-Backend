// Init
import React from "react";

// Importing Components

import Header from "../components/Header";
import Partone from "../components/Partone";
import Parttwo from "../components/Parttwo";
import Partthree from "../components/Partthree";
import Partfour from "../components/Partfour";
import Partfive from "../components/Partfive";
import Partsix from "../components/Partsix";
import Whatapp from "../components/Whatapp";
import Partseven from "../components/Partseven";
import Footer from "../components/Footer";
import Parteight from "../components/Parteight";
import Preloader from "../components/Preloader";
import Part1 from "../components/Part1";
import Partnine from "../components/Partnine";

// Home Component
export default function Home() {
  return (
    <div>
      <Preloader/>
      <Whatapp/>
      <Header />
      <Part1/>
      <Partone/>
      <Parttwo/>
      <Partthree/>
      <Partfour/>
      <Partfive/>
      <Parteight/>
      <Partsix/>
      <Partseven/>
      <Partnine/>
      <Footer/>
      
    </div>
  );
}
