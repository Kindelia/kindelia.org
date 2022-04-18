import { useState, useContext } from "react";
import { LanguageContext } from "../languages";
import { getStorage, storageSetUser } from "../utils/storage";
import throttle from "../utils/throttle";
import fetch from "../fetch";

export default function Home({
  setUser,
  whenLogin,
}) {
  const language = useContext(LanguageContext).dictionary;

  async function login() {
    try {
      await whenLogin();
    } catch (err) {
      setShowError(true);
    }
  }

  const [showError, setShowError] = useState(false);
  return (
    <>
      <h1>Kindelia</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <label htmlFor="user">{language.home.user}</label>
          <input
            type="user"
            name="user"
            onChange={(e) => setUser(e.target.value)}
          ></input>
        </div>
        {showError && (
          <span className="error mt-5 bold">{language.home.error}</span>
        )}
      </div>
      <button
        className="mt-30"
        onClick={() => {
          throttle(login, 500);
        }}
      >
        {language.button.start}
      </button>
    </>
  );
}
