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
          <code style={{width: "100%", display: "flex", "justify-content": "center" }}>
            {(function () {
              var hex = (x, len = 1) => {
                var str = x.toString(16);
                while (str.length < len) {
                  str = "0" + str;
                }
                return str;
              };
              var lines = [];
              for (var line of getResult(user)) {
                var {id, timestamp, seed, answer} = line;
                var {border, center, clock, wheel} = answer;
                lines.push([
                  hex(id, 2),
                  hex(timestamp, 12),
                  hex(seed, 8),
                  hex(border, 1),
                  hex(center, 1),
                  clock.map(x => hex(x,1)).join(""),
                  wheel.map(x => hex(x,1)).join("")
                ].join("-"));
              }
              return lines.join("\n");
            })()}
          </code>
        </pre>
      </div>
    </>
  );
}
