import { useState } from "react";
import fetch from "../fetch";
import Level from "../components/Level";
import train from "../levels/train";
import { shape_empty } from "../utils/shape";

function Instruction({content, whenAdvance, buttonText}) {
  return (
    <>
      <h1>Instructions</h1>
      {content}
      <button onClick={whenAdvance}>{buttonText || "Advance"}</button>
    </>
  );
}

export function Instruction1({whenAdvance}) {
  const content = (
    <>
      <div>
        <ol>
          <li>This is an IQ engine.</li>
          <li>Just like normal IQ tests, a 3x3 grid will be shown to you, with the last item missing</li>
          <li>Your task is find the pattern and discover what shape this missing item has</li>
        </ol>
      </div>
      <p style={{marginTop: "20px"}}>Advance to see an example</p>
    </>
  );

  return <Instruction content={content} whenAdvance={whenAdvance} />
}

export function Instruction2({whenAdvance}) {
  const [level, setLevel] = useState(train());
  const [answer, setAnswer] = useState(shape_empty());

  const content = (
    <>
      <p>Below is an example of a grid. Clearly the pattern is just repeat the row.</p>
      <p>You can form the missing shape pressing the buttons below the grid. Try to solve it!</p>
      <Level level={level} answer={answer} setAnswer={setAnswer} />
      <p className='bold' style={{marginTop: '30px'}}>Try to click in every button more than once!</p>
      <p className='bold'>You will have only this time to train!!! Click in advance only when you're ready!!!</p>
    </>
  );

  return <Instruction content={content} whenAdvance={whenAdvance} />
}

export function Instruction3({whenAdvance, timer, email, setStartTime}) {
  async function start() {
    const startTime = Number(new Date());
    setStartTime(startTime);
    const res = await fetch('/candidate/start', { 
      method: 'POST',
      data : {
        email,
        timestamp: startTime
      }
    });
    timer();
    whenAdvance();
  }

  const content = (
    <>
      <div>
        <ol>
          <li>There are 30 levels.</li>
          <li>You'll have 30 minutes to do them.</li>
          <li>1 correct answer is equal to 1 point</li>
          <li>Make sure your answer is correct, after advance a level you cannot go back.</li>
          <li>After you click in the 'Start' button, a timer will begin and there is no going back.</li>
        </ol>
      </div>
    </>
  );

  return <Instruction content={content} whenAdvance={start} buttonText={"Start"} />
}