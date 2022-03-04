import { useState } from "react";
import fetch from "../fetch";

export default function Home({whenAdvance, goToLevel, goToEnd, email, setEmail, setStartTime, setEndTime, timer}) {
  async function login() {
    try {
      const res = await fetch('/candidate/authenticate', {
        method: 'POST',
        data: { email }
      });
      let data = await res.json();
      if (res.status !== 200) throw data.error;
      setShowError(false);
      // if candidate end the test go to end
      if (data.endTime) {
        setEndTime(data.endTime);
        goToEnd();
      } else {
        // if candidate started the test go set startTime
        if (data.startTime) {
          setStartTime(data.startTime);
        }
        // if candidate started the test go to the level were he was
        if (data.actualQuestion !== null) {
          timer(data.startTime);
          goToLevel(data.actualQuestion);
        }
        else whenAdvance();
      }
    } catch(err) {
      setShowError(true);
    }
  }

  const [showError, setShowError] = useState(false);
  return (
    <>
      <h1>enQIne</h1>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' onChange={e => setEmail(e.target.value)}></input>
        </div>
        {showError && <span className="error mt-5 bold">Could not authenticate this email.</span>}
      </div>
      <button className="mt-30" onClick={login}>Start</button>
    </>
  );
}