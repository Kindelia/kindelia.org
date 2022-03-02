import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import EnQIne from "./pages/enqine/EnQIne";

// TODO: do this right
if (window.location.href.indexOf("aprendiz") !== -1) {
  window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfarRCmCVD0BGKbLiIi-WQozDmmlaLWy9TkfNWOdPNGUuVlag/viewform";
}

const Main = 
  <div>
    <h2>
      Kindelia
    </h2>
    <div>
      Site em construção.
    </div>
    <h2>
      Links
    </h2>
    <ul>
      <li>
        <a href="https://github.com/kindelia">
          Nosso GitHub.
        </a>
      </li>
      <li>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfarRCmCVD0BGKbLiIi-WQozDmmlaLWy9TkfNWOdPNGUuVlag/viewform">
          Venha ser um Aprendiz!
        </a>
      </li>
    </ul>
  </div>;

//function Box(x, y, w, h, fill=0) {
  //var fill = ["white", "#D0D0D0", "black"][fill];
  //return <Rect x={x} y={y} width={w} height={h} stroke="black" fill={fill}/>;
//}

//function Ex0() {
  //return <Layer>
    //<Text text="Hello manin"/>
    //{Box(50, 50, 16, 16, 1)}
  //</Layer>
//}

//function App() {
  //return <Stage width="420" height="420"  style={{"border": "1px solid black"}}>
    //<Ex0/>
  //</Stage>;
//}

const Hello = <div>Ola</div>;

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={Main}/>
      <Route path="/enqine" element={<EnQIne/>}/>
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
