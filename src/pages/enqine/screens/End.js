import { useContext, useEffect } from "react";
import fetch from "../fetch";
import { storageGetEnd, storageSetEnd } from "../utils/storage";
import { LanguageContext } from "../languages";
import { getResult } from "../utils/result";
export default function End({ user }) {
  useEffect(() => {
    if (!storageGetEnd(user)) {
      const endTime = Number(new Date());
      fetch("/register", {
        method: "POST",
        data: {
          user: user,
          timestamp: endTime,
          action: {
            type: "END",
          },
        },
      });
      storageSetEnd(user, endTime);
    }
  }, []);

  const language = useContext(LanguageContext).dictionary;

  return (
    <>
      <h1>{language.end}</h1>
      <div
        style={{
          "align-self": "flex-start",
          "font-size": "1rem",
          width: "100%",
        }}
      >
        <pre
          style={{
            overflow: "auto",
            width: "100%",
            "border-radius": "10px",
            "max-height": "500px",
            padding: "5px",
          }}
        >
          <code style={{ width: "100%" }}>
            {JSON.stringify(getResult(user))}
          </code>
        </pre>
      </div>
    </>
  );
}
