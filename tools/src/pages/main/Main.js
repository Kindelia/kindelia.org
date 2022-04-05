import { Link } from "react-router-dom";

export default function Main() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/test">Kindelia Test</Link>
          </li>
          <li>
            <Link to="/roadgraph">Kindelia RoadGraph</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
