import { useState, useEffect, useContext } from "react";
import fetch from "../fetch";
import Level from "../components/Level";
import { shape_empty, shape_equal } from "../utils/shape";
import { get_seed } from "../levels";
import Timer from "../components/Timer";
import { getStorage, storageAddActualQuestion } from "../utils/storage";
import { LanguageContext } from "../languages";
import throttle from "../utils/throttle";

export default function LevelWrapper({
  whenAdvance,
  levelBuilder,
  id,
  user,
  goToEnd,
}) {
  let [startTime, setStartTime] = useState(Number(new Date()));
  let [seed, setSeed] = useState(get_seed());
  let [level, setLevel] = useState(levelBuilder(seed));
  let [answer, setAnswer] = useState(shape_empty());

  useEffect(() => {
    const reboot = getStorage();
    if (reboot[user]) {
      if (
        reboot[user].actualQuestion &&
        reboot[user].actualQuestion?.id === id
      ) {
        setStartTime(reboot[user].actualQuestion.startTime);
        // setTime(reboot[user].actualQuestion.time);
      } else {
        storageAddActualQuestion(user, { id, startTime });
      }
    }
  }, []);

  // useEffect(() => {
  //   storageAddActualQuestion(user, { id, time });
  // }, [time]);

  async function annotateResponse() {
    const timestamp = Number(new Date());
    const correct = shape_equal(answer, level[2][2]);
    fetch("/register", {
      method: "POST",
      data: {
        timestamp,
        user,
        action: {
          type: "ANSWER",
          data: {
            id,
            correct,
            seed,
            answer,
          },
        },
      },
    }).catch((err) => {}); // TODO
    whenAdvance();
  }

  function refresh() {
    fetch("/register", {
      method: "POST",
      data: {
        timestamp: Number(new Date()),
        user,
        action: {
          type: "REFRESH",
          data: {
            id,
          },
        },
      },
    })
      .then((res) => {
        if (res.status === 429) goToEnd();
      })
      .catch((err) => {}); // TODO
    const new_seed = get_seed();
    setSeed(new_seed);
    setLevel(levelBuilder(new_seed));
  }

  const language = useContext(LanguageContext).dictionary;

  return (
    <>
      <Timer whenAdvance={annotateResponse} max={120} startTime={startTime}>
        <Level level={level} answer={answer} setAnswer={setAnswer} />
        <p
          className="bold mt-30"
          style={{
            position: "relative",
            top: "-10px",
          }}
        >
          {language.level.warning}
        </p>
        <div
          className="mb-30 mt-10"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button
            className="mr-10"
            onClick={() => {
              throttle(refresh, 100);
            }}
          >
            {language.level.refresh}
          </button>
          <button onClick={annotateResponse}>{language.button.advance}</button>
        </div>
      </Timer>
    </>
  );
}
