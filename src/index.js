import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// TODO: do this right
if (window.location.href.indexOf("aprendiz") !== -1) {
  window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfarRCmCVD0BGKbLiIi-WQozDmmlaLWy9TkfNWOdPNGUuVlag/viewform";
}

ReactDOM.render(
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
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
