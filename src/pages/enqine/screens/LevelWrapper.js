import { useState } from "react";
import fetch from "../fetch";
import Level from "../components/Level";
import { shape_empty, shape_equal } from "../utils/shape";

export default function LevelWrapper({whenAdvance, levelBuilder, id, email, time}) {
  let [level, setLevel] = useState(levelBuilder());
  let [answer, setAnswer] = useState(shape_empty());

  async function annotateResponse() {
    const correct = shape_equal(answer, level[2][2]);
    
    try {
      await fetch('/candidate/question', {
        method: 'POST',
        data: {
          email,
          question: {
            id,
            correct,
            timestamp: Number(new Date()),
            answer
          }
        }
      })
      whenAdvance();
    } catch(err) {
      console.log(err); // TODO
    }
  }

  return (
    <>
      <p>{time}</p>
      <Level level={level} answer={answer} setAnswer={setAnswer} />
      <p className='bold mt-30'>After advance you cannot go back!</p>
      <div className="mb-30" style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={() => setLevel(levelBuilder())}>Refresh</button>
        <button onClick={annotateResponse}>Advance</button>
      </div>  
    </>
  );
}