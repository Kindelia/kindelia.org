import fetch from "../fetch";

export default function End({email, endTime}) {
  if (!endTime || endTime === 0) {
    fetch('/candidate/end', {
      method: 'POST',
      data: {
        email,
        timestamp: Number(new Date())
      }
    });
  }

  return (
    <>
      <h1>Thanks for Participate!</h1>
    </>
  );
}