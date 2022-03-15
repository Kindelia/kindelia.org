import { useState } from "react";
import fetch from "./fetch";
import Home from "./screens/Home";
import LevelResult from "./screens/LevelResult";

export default function Result() {
  const [screen, setActualScreen] = useState(0);
  const [result, setResult] = useState({
    answers: {},
  });
  const [user, setUser] = useState("");

  const whenAdvance = () => {
    setActualScreen(screen + 1);
  };

  const whenBack = () => {
    setActualScreen(screen - 1);
  };

  const screens = [
    <ResultHome
      user={user}
      setUser={setUser}
      setResult={setResult}
      whenAdvance={whenAdvance}
    />,
    <ResultInfo user={user} result={result} whenAdvance={whenAdvance} />,
    ...Object.values(result.answers).map(
      ({ id, seed, answer, duration, refresh }, i, arr) => (
        <LevelResult
          key={id + 1}
          user={user}
          level_id={id + 1}
          seed={seed}
          answer={answer}
          refresh={refresh}
          duration={duration}
          whenAdvance={whenAdvance}
          whenBack={whenBack}
          last={i === arr.length - 1}
        />
      )
    ),
  ];

  return <main className="enqine-app">{screens[screen]}</main>;
}

function ResultHome({ user, setUser, setResult, whenAdvance }) {
  const login = async () => {
    const res = await fetch("/result", {
      method: "POST",
      data: {
        user,
      },
    });
    if (res.status !== 200) throw res.statusText;
    const result = await res.json();
    if (result && result.answers && result.start && result.end) {
      setResult(result);
      whenAdvance();
    } else {
      throw "No answers for this user";
    }
  };
  return <Home setUser={setUser} whenLogin={login} />;
}

function ResultInfo({ user, result, whenAdvance }) {
  const answers = Object.values(result.answers);
  console.log(answers);
  const corrects = answers.filter((item) => item.correct).length;
  const answered = answers.length;
  const avg_time =
    answered > 0 ? answers.reduce((a, b) => a + b.duration, 0) / answered : 0;
  const duration = result.end ? result.end - result.start : undefined;

  return (
    <>
      <div className="space-y-20">
        <p>Hi, {user}!</p>
        <p>
          You started your test at {new Date(result.start).toLocaleString()} and{" "}
          {result.end
            ? `ended it at ${new Date(result.end).toLocaleString()}`
            : "didn't finish"}
        </p>

        {result.end && (
          <p>
            In total you spent {Math.floor(duration / 60000)}m and{" "}
            {Math.round((duration % 60000) / 1000)}s{" "}
          </p>
        )}
        <p>
          You answered correctly {corrects} questions in a total of {answered}{" "}
          answered
        </p>
        <p>Your avg time is {Math.floor(avg_time / 1000)}s per question </p>
        <p>You have used {result.refreshs} Randomizes in total</p>
      </div>
      <button
        style={{ marginTop: "30px" }}
        onClick={() => {
          whenAdvance();
        }}
      >
        Next
      </button>
    </>
  );
}
