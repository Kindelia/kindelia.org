import { useState } from "react";
import axios from "../axios";

export default function Home({whenAdvance, goToLevel, goToEnd, email, setEmail, setStartTime, setEndTime, timer}) {
  async function login() {
    try {
      const res = await axios.post('/candidate/authenticate', {
        email
      });
      setShowError(false);
      // if candidate end the test go to end
      if (res.data.endTime) {
        setEndTime(res.data.endTime);
        goToEnd();
      } else {
        // if candidate started the test go set startTime
        if (res.data.startTime) {
          setStartTime(res.data.startTime);
        }
        // if candidate started the test go to the level were he was
        if (res.data.lastQuestion !== null) {
          timer(res.data.startTime);
          goToLevel(res.data.lastQuestion + 1);
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
      <h1>enQIne<small>v1.0</small></h1>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' onChange={e => setEmail(e.target.value)}></input>
        </div>
        {showError && <span>Could not authenticate this email.</span>}
      </div>
      <button onClick={login}>Start</button>
    </>
  );
}