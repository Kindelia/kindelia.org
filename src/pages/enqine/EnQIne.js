// EnQIne

// TODO:
// - Procedural random level generation
// - Answer submission and score
// - Make all levels :)

import "./EnQIne.css";
import React, { useState, createContext } from "react";
import { levels } from "./levels";
import Home from "./screens/Home";
import End from "./screens/End";
import {
  Instruction1,
  Instruction2,
  Instruction3,
} from "./screens/Instructions";
import LevelWrapper from "./screens/LevelWrapper";
import { LanguageProvider, LanguageSelector } from "./languages/index.js";

export default function Enqine() {
  const [screenNumber, setScreenNumber] = useState(0);
  const [user, setUser] = useState("");
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [language, setLanguage] = useState("pt-BR");

  const advance = () => {
    setScreenNumber(screenNumber + 1);
  };
  const goToLevel = (i) => {
    setScreenNumber(4 + i);
  };
  const goToEnd = () => {
    setScreenNumber(screens.length - 1);
  };

  const screens = [
    <Home
      whenAdvance={advance}
      goToLevel={goToLevel}
      goToEnd={goToEnd}
      user={user}
      setUser={setUser}
      setStartTime={setStartTime}
      setEndTime={setEndTime}
    />,
    <Instruction1 whenAdvance={advance} />,
    <Instruction2 whenAdvance={advance} />,
    <Instruction3
      whenAdvance={advance}
      user={user}
      setStartTime={setStartTime}
    />,
    ...Object.values(levels).map((levelBuilder, i) => (
      <LevelWrapper
        key={i}
        whenAdvance={advance}
        levelBuilder={levelBuilder}
        id={i}
        user={user}
      />
    )),
    <End user={user} endTime={endTime} />,
  ];

  return (
    <LanguageProvider>
      <LanguageSelector></LanguageSelector>
      <main className="enqine-app">{screens[screenNumber]}</main>
    </LanguageProvider>
  );
}

// type Color
//   = None
//   | White
//   | Gray
//   | Black
// type Board = {
//   border     : Fin 4
//   center     : Fin 4
//   clock      : Vec 8 Bool
//   wheel      : Vec 8 Color
// }

// function board(border, center, clock, wheel) {
//   return {border, center, clock, wheel};
// }

// // Logic: rotates by 1
// function level_0() {
//   return level();
// }

// // Logic: find the missing shape
// function level_1() {
//   var boards = [
//     [
//       board(1, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(2, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(3, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0])
//     ],
//     [
//       board(3, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(1, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(2, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0])
//     ],
//     [
//       board(2, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(3, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(1, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0])
//     ]
//   ];
//   return boards;
// }

// // Logic: keep identicals
// function level_2() {
//   var boards = [
//     [
//       board(1, 0, [0,0,0,0,0,0,0,0], [3,0,3,0,0,0,3,0]),
//       board(1, 0, [0,0,0,0,0,0,0,0], [3,0,3,3,0,0,0,0]),
//       board(1, 0, [0,0,0,0,0,0,0,0], [3,0,3,0,0,0,0,0])
//     ],
//     [
//       board(1, 0, [0,0,0,0,0,0,0,0], [0,3,3,0,0,3,0,0]),
//       board(1, 0, [0,0,0,0,0,0,0,0], [0,0,3,0,3,0,3,0]),
//       board(1, 0, [0,0,0,0,0,0,0,0], [0,0,3,0,0,0,0,0])
//     ],
//     [
//       board(1, 0, [0,0,0,0,0,0,0,0], [3,0,0,0,3,0,0,3]),
//       board(1, 0, [0,0,0,0,0,0,0,0], [0,3,0,0,3,0,3,3]),
//       board(1, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,3,0,0,3])
//     ]
//   ];
//   return boards;
// }

// // Logic: global rotation + missing shape
// function level_3() {
//   var boards = [
//     [
//       board(1, 0, [1,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(2, 0, [0,1,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(3, 0, [0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0])
//     ],
//     [
//       board(2, 0, [0,0,0,1,0,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(3, 0, [0,0,0,0,1,0,0,0], [0,0,0,0,0,0,0,0]),
//       board(1, 0, [0,0,0,0,0,1,0,0], [0,0,0,0,0,0,0,0])
//     ],
//     [
//       board(3, 0, [0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0]),
//       board(1, 0, [0,0,0,0,0,0,0,1], [0,0,0,0,0,0,0,0]),
//       board(2, 0, [1,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0])
//     ]
//   ];
//   return boards;
// }

// // Logic:
// // - Rotating clock, clockwise, quadratic
// // - Rotating clock, anti-clockwise, linear
// // - Wheels follow addition mod 4:
// //   - null  = 0
// //   - white = 1
// //   - gray  = 2
// //   - black = 3
// // - Center is mod 2 of dots count
// function level_X() {
//   var boards = [
//     [
//       board(2, 3, [1,0,0,0,1,0,0,0], [0,1,0,1,0,0,2,0]),
//       board(2, 3, [0,1,0,1,0,0,0,0], [0,0,0,1,0,0,0,0]),
//       board(2, 3, [0,0,1,1,0,0,0,0], [0,1,0,2,0,0,2,0])
//     ],
//     [
//       board(2, 3, [0,1,0,0,0,0,1,0], [0,2,0,0,2,0,2,0]),
//       board(2, 0, [1,0,1,0,0,0,0,0], [0,3,0,0,2,0,0,0]),
//       board(2, 0, [0,0,0,0,0,0,0,1], [0,1,0,0,0,0,2,0])
//     ],
//     [
//       board(2, 3, [0,0,0,0,0,1,1,0], [1,0,2,0,0,0,2,0]),
//       board(2, 0, [0,0,0,0,1,1,0,0], [0,0,1,0,2,0,0,0]),
//       board(2, 0, [0,0,0,0,1,0,0,0], [1,0,3,0,2,0,2,0])
//     ]
//   ];
//   return boards;
// }
