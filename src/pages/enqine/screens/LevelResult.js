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
      <p style={{ marginBottom: "0.5em" }}>
        Question {level_id} of user {user}
      </p>
      <p style={{ marginBottom: "0.5em", fontSize: "1.2rem" }}>
        Answered in {Math.floor(duration / 1000)}s with {refresh || 0}{" "}
        refresh(s)
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div >
          <Level level={level} answer={empty} hideButtons showCorrectAnswer />
          <div class="result-level-wrapper">
            <div class="expected-text"> Expected answer </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "0 2em",
          }}
        >
          {/* <div>
            <p style={{ textAlign: "center" }}>The answer</p>
            <Shape key_number={1000} shape={level[2][2]} />
          </div> */}
          <div>
            <div style={{paddingBottom: "5px"}}>
              <Shape key_number={2000} shape={answer}  />
            </div>
            <div style={{ position: "relative" }}>
              <p style={{
                textAlign: "center",
                minHeight: "2em",
                maxWidth: "150px",
              }}>
                Your answer
              </p>
              <p style={{
                position: "absolute",
                top: "120%",
                color: correct ? "green" : "red",
                textWeight: "bold",
                minWidth: "150px",
                textAlign: "center",
              }}>
                ({correct ? "Correct" : "Wrong"})
              </p>
            </div>
          </div>
        </div>
        {/* <p
          style={{
            textAlign: "center",
            flex: "1",
            
          }}
        >
          
        </p> */}
      </div>
      <div style={{ paddingTop: "2em" }}>
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
