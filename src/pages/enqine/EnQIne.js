// EnQIne

// TODO:
// - Procedural random level generation
// - Answer submission and score
// - Make all levels :)

import './EnQIne.css';
import React, { useState } from 'react';
import { levels } from "./levels";
import {fmtNumber} from './utils/fmt';
import Home from './screens/Home';
import End from './screens/End';
import { Instruction1, Instruction2, Instruction3 } from './screens/Instructions';
import LevelWrapper from './screens/LevelWrapper';

export default function Enqine() {

  const [screenNumber, setScreenNumber] = useState(0);
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('00:00');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const TIME_LIMIT = 10 * 60 * 1000;

  function timer(startTime) {
    if (startTime === 0) {
      startTime = Number(new Date())
    };
    const i = setInterval(() => {
      const now = Number(new Date());
      const diff = now - startTime;
      const min = fmtNumber(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      const sec = fmtNumber(Math.floor((diff % (1000 * 60)) / 1000));
      setTime(`${min}:${sec}`);
      if (diff >= TIME_LIMIT) { // 30min
        clearInterval(i);
        goToEnd();
      }
    }, 1000);
  }

  const advance = () => {setScreenNumber(screenNumber + 1)};
  const goToLevel = (i) => {setScreenNumber(4 + i)};
  const goToEnd = () => {setScreenNumber(screens.length - 1)};

  const screens = [
    <Home 
      whenAdvance={advance} 
      goToLevel={goToLevel}
      goToEnd={goToEnd}
      email={email} 
      setEmail={setEmail} 
      setStartTime={setStartTime} 
      setEndTime={setEndTime}
      timer={timer}
    />,
    <Instruction1 whenAdvance={advance}/>,
    <Instruction2 whenAdvance={advance}/>,
    <Instruction3 whenAdvance={advance} timer={() => timer(startTime)} email={email} setStartTime={setStartTime} />,
    ...Object.values(levels).map((levelBuilder, i) => 
      <LevelWrapper 
        key={i} 
        whenAdvance={advance} 
        levelBuilder={levelBuilder} 
        id={i} 
        email={email}
        time={time}
      />
    ),
    <End email={email} endTime={endTime} />
  ];

  return (
    <main className='enqine-app'>
      {screens[screenNumber]}
    </main>
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