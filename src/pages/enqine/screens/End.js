import { useContext, useEffect } from "react";
import fetch from "../fetch";
import { storageSetEnd } from "../utils/storage";
import { LanguageContext } from "../languages";
export default function End({ user }) {
  useEffect(() => {
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
  }, []);

  const language = useContext(LanguageContext).dictionary;

  return (
    <>
      <h1>{language.end}</h1>
    </>
  );
}
