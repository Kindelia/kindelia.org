import { useState } from "react";
import fetch from "../fetch";
import Level from "../components/Level";
import { shape_empty, shape_equal } from "../utils/shape";
import { get_seed } from "../levels";

export default function LevelWrapper({whenAdvance, levelBuilder, id, email, time}) {
  let [seed, setSeed] = useState(get_seed())
  let [level, setLevel] = useState(levelBuilder(seed));
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
            seed,
            answer
          }
        }
      })
      whenAdvance();
    } catch(err) {
      console.log(err); // TODO
    }
  }

  function refresh() {
    const new_seed = get_seed();
    setSeed(new_seed);
    setLevel(levelBuilder(new_seed));
  }

  return (
    <>
      <p>{time}</p>
      <Level level={level} answer={answer} setAnswer={setAnswer} />
      <p className='bold mt-30'>After advance you cannot go back!</p>
      <div className="mb-30" style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={refresh}>Refresh</button>
        <button onClick={annotateResponse}>Advance</button>
      </div>  
    </>
  );
}