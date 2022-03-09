import { useState, useContext } from "react";
import fetch from "../fetch";
import Level from "../components/Level";
import train from "../levels/train";
import { shape_empty } from "../utils/shape";
import { storageSetStart } from "../utils/storage";
import { LanguageContext } from "../languages";

function Instruction({ content, whenAdvance, buttonText }) {
  const language = useContext(LanguageContext).dictionary;

  return (
    <>
      <h1>{language.instructions.title}</h1>
      {content}
      <button className="mt-30 mb-30" onClick={whenAdvance}>
        {buttonText || language.button.advance}
      </button>
    </>
  );
}

export function Instruction1({ whenAdvance }) {
  const language = useContext(LanguageContext).dictionary;

  const content = (
    <>
      <div>
        <ol>
          {language.instructions[1].items.map((instruction, i) => (
            <li className="mb-20" key={i}>
              {instruction}
            </li>
          ))}
        </ol>
      </div>
      <p style={{ marginTop: "20px" }}>{language.instructions[1].advance}</p>
    </>
  );

  return <Instruction content={content} whenAdvance={whenAdvance} />;
}

export function Instruction2({ whenAdvance }) {
  const [level, setLevel] = useState(train());
  const [answer, setAnswer] = useState(shape_empty());
  const language = useContext(LanguageContext).dictionary;

  const content = (
    <>
      <div>
        {language.instructions[2].header.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      <Level level={level} answer={answer} setAnswer={setAnswer} />
      <div className="bold mt-30">
        {language.instructions[2].footer.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </>
  );

  return <Instruction content={content} whenAdvance={whenAdvance} />;
}

export function Instruction3({ whenAdvance, user, setStartTime }) {
  function start() {
    const startTime = Number(new Date());
    storageSetStart(user, startTime);
    setStartTime(startTime);
    const res = fetch("/register", {
      method: "POST",
      data: {
        timestamp: startTime,
        user,
        action: {
          type: "START",
        },
      },
    });
    whenAdvance();
  }

  const language = useContext(LanguageContext).dictionary;
  const content = (
    <>
      <div>
        <ol>
          {language.instructions[3].map((instruction, i) => (
            <li className="mb-20" key={i}>
              {instruction}
            </li>
          ))}
        </ol>
      </div>
    </>
  );

  return (
    <Instruction
      content={content}
      whenAdvance={start}
      buttonText={language.button.start}
    />
  );
}
