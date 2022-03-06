import { useState } from "react";
import { getStorage, storageSetUser } from "../utils/storage";
// import fetch from "../fetch";

export default function Home({whenAdvance, goToLevel, goToEnd, user, setUser, setStartTime, setEndTime}) {
  async function login() {
    try {
      const reboot = getStorage();
      if (reboot[user]) {
        const data = reboot[user];
        if (data.endTime) {
          goToEnd();
        } else if (data.startTime) {
          goToLevel(data.actualQuestion.id);
        } else {
          whenAdvance();
        }
      } else {
        storageSetUser(user);
        whenAdvance();
      }
    } catch(err) {
      console.log(err);
      setShowError(true);
    }
  }

  const [showError, setShowError] = useState(false);
  return (
    <>
      <h1>enQIne</h1>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <label htmlFor='user'>User</label>
          <input type='user' name='user' onChange={e => setUser(e.target.value)}></input>
        </div>
        {showError && <span className="error mt-5 bold">Could not authenticate this user.</span>}
      </div>
      <button className="mt-30" onClick={login}>Start</button>
    </>
  );
}