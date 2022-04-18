import { createContext, useState, useContext, useEffect } from "react";

import pt from "./pt.json";
import en from "./en.json";

const dictionaryList = { pt, en };
export const languageOptions = {
  pt: "Português",
  en: "English",
};
// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: "pt",
  dictionary: dictionaryList.pt,
});

export function LanguageProvider({ children }) {
  const [userLanguage, setUserLanguage] = useState("pt");

  useEffect(() => {
    const defaultLanguage = localStorage.getItem("rcml-lang");
    setUserLanguage(defaultLanguage || "pt");
  }, []);

  const userLanguageChange = (selected) => {
    setUserLanguage(selected);
    localStorage.setItem("rcml-lang", selected);
  };

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange,
  };
  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);
  // set selected language by calling context method
  const handleLanguageChange = (e) => userLanguageChange(e.target.value);
  return (
    <select
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        margin: "10px",
        fontFamily: "monospace",
        background: "transparent",
        border: "1.5px solid black",
        borderRadius: "5px",
      }}
      onChange={handleLanguageChange}
      value={userLanguage}
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
