import axios from "../axios";

export default function End({email, endTime}) {
  if (!endTime || endTime === 0) {
    axios.post('/candidate/end', {
      email,
      timestamp: Number(new Date())
    });
  }

  return (
    <>
      <h1>Thanks for Participate!</h1>
    </>
  );
}