import { useState } from "react";
import Level from "../components/Level";
import { shape_empty, shape_equal } from "../utils/shape";

export default function LevelDebug({levelBuilder}) {
  let [level, setLevel] = useState(levelBuilder());
  let [answer, setAnswer] = useState(shape_empty());

  return (
    <>
      <Level level={level} answer={answer} setAnswer={setAnswer} />
      <button className="mt-30 mb-30" onClick={() => setLevel(levelBuilder())}>Refresh</button>
      <p>Answer is correct? { shape_equal(answer, level[2][2]) ? 'True' : 'False' }</p>
    </>
  );
}