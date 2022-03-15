import { Layer, Stage } from "react-konva";
import Level, { draw_board } from "../components/Level";
import { levels } from "../levels";
import { shape_empty, shape_equal } from "../utils/shape";

export default function LevelResult({
  user,
  level_id,
  seed,
  answer,
  refresh,
  duration,
  whenAdvance,
  whenBack,
  last,
}) {
  const level = levels[`lv${level_id}`](seed);
  const empty = shape_empty();
  const correct = shape_equal(answer, level[2][2]);

  return (
    <>
      <p style={{ marginBottom: "20px" }}>
        Question {level_id} of user {user}
      </p>
      <p style={{ marginBottom: "30px", fontSize: "1.2rem" }}>
        Answered in {Math.floor(duration / 1000)}s with {refresh || 0}{" "}
        refresh(s)
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p style={{ textAlign: "center" }}>The level</p>
          <Level level={level} answer={empty} hideButtons />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 100px",
            flex: "1",
          }}
        >
          <div>
            <p style={{ textAlign: "center" }}>The answer</p>
            <Shape key_number={1000} shape={level[2][2]} />
          </div>
          <div>
            <p style={{ textAlign: "center" }}>Your answer</p>
            <Shape key_number={2000} shape={answer} />
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            flex: "1",
            color: correct ? "green" : "red",
          }}
        >
          {correct ? "Correct" : "Wrong"}
        </p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          style={{ marginRight: "20px" }}
          onClick={() => {
            whenBack();
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            whenAdvance();
          }}
          disabled={last}
        >
          Next
        </button>
      </div>
    </>
  );
}

function Shape({ key_number, shape }) {
  const elem = draw_board(key_number, 75, 75, 64, shape);

  return (
    <Stage width={150} height={150} className="canvas-wrapper">
      <Layer>{elem}</Layer>
    </Stage>
  );
}
