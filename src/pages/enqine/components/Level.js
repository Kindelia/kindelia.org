import { Stage, Layer, Line, Rect, Circle } from "react-konva"

export default function Level({level, answer, setAnswer}) {
  var P = 16;
  var W = P * 30;
  var r = P * 4;
  var p = P * 5;
  var w = P * 10;
  var elems = [];
  for (var y = 0; y < 3; ++y) {
    for (var x = 0; x < 3; ++x) {
      let shape = x !== 2 || y !== 2 ? level[y][x] : answer;
      elems = [...elems, draw_board(""+x+y, p+w*x, p+w*y, r, shape)];
    }
  }
  
  function button(font_size, w, h, content, click) {
    return <button
      onClick={() => click()}
      style={{
        "display": "block",
        "width": w+"px",
        "height": h+"px",
        "fontSize": font_size+"px",
        "cursor": "pointer",
        padding: 0,
        margin: '1px'
      }}>
      {content}
    </button>
  }
  function draw_shape(state) {
    switch (state) {
      case 0: return " ";
      case 1: return "♢";
      case 2: return "◯";
      case 3: return "▢";
    }
  }
  function draw_dot(state) {
    switch (state) {
      case 0: return " ";
      case 1: return "◯";
      case 2: return "⨁";
      case 3: return "⬤";
    }
  }
  function draw_bit(state) {
    switch (state) {
      case 0: return "◯";
      case 1: return "⬤";
    }
  }

  function clock_button(i, txt) {
    return button(16, 48, 48, answer.clock[i] ? txt : "", () => {
      var new_clock = answer.clock.slice(0);
      new_clock[i] = (new_clock[i] + 1) % 2;
      setAnswer({...answer, clock: new_clock});
    });
  }

  function wheel_button(i, txt) {
    return button(16, 48, 48, answer.wheel[i] ? draw_dot(answer.wheel[i]) : "", () => {
      var new_wheel = answer.wheel.slice(0);
      new_wheel[i] = (new_wheel[i] + 1) % 4;
      setAnswer({...answer, wheel: new_wheel});
    });
  }

  // FIXME TODO: improve this hardcoded monster
  // Ei candidatos, temos aqui o exemplo de um código que vocês NÃO devem escrever
  return <div>
    <Stage width={W} height={W}>
      <Layer>
        {elems}
      </Layer>
    </Stage>
    <table style={{width:W+"px", "fontSize": "26px"}}>
      <thead>
        <tr style={{"fontWeight": "bold", "textAlign": "center"}}>
          <td style={{"width": w+"px"}}>Shape</td>
          <td style={{"width": w+"px"}}>Clock</td>
          <td style={{"width": w+"px"}}>Wheel</td>
        </tr>
      </thead>
      <tbody>
        <tr style={{"textAlign": "center"}}>
          <td style={{"display": "flex", "flexFlow": "column nowrap", "justifyContent": "center", "alignItems": "center"}}>
            <table>
              <tbody>
                <tr>
                  <td>{button(22, 64, 64, draw_shape(answer.border), () => {
                    setAnswer({...answer, border: (answer.border + 1) % 4});
                  })}</td>
                </tr>
                <tr>
                  <td>{button(22, 64, 64, draw_dot(answer.center), () => {
                    setAnswer({...answer, center: (answer.center + 1) % 4});
                  })}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table>
              <tbody>
                <tr>
                  <td>
                    {clock_button(5, "╲")}
                  </td>
                  <td>
                    {clock_button(6, "｜")}
                  </td>
                  <td>
                    {clock_button(7, "⟋")}
                  </td>
                </tr>
                <tr>
                  <td>
                    {clock_button(4, "―")}
                  </td>
                  <td style={{"visibility":"hidden"}}>
                    {button(16, 48, 48, "")}
                  </td>
                  <td>
                    {clock_button(0, "―")}
                  </td>
                </tr>
                <tr>
                  <td>
                    {clock_button(3, "⟋")}
                  </td>
                  <td>
                    {clock_button(2, "｜")}
                  </td>
                  <td>
                    {clock_button(1, "╲")}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table>
              <tbody>
                <tr>
                  <td>
                    {wheel_button(5)}
                  </td>
                  <td>
                    {wheel_button(6)}
                  </td>
                  <td>
                    {wheel_button(7)}
                  </td>
                </tr>
                <tr>
                  <td>
                    {wheel_button(4)}
                  </td>
                  <td style={{"visibility":"hidden"}}>
                    {button(16, 48, 48, "")}
                  </td>
                  <td>
                    {wheel_button(0)}
                  </td>
                </tr>
                <tr>
                  <td>
                    {wheel_button(3)}
                  </td>
                  <td>
                    {wheel_button(2)}
                  </td>
                  <td>
                    {wheel_button(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>;
}

// AUX

function rect(key, x, y, w, h) {
  return <Rect key={key} x={x} y={y} width={w} height={h} stroke="black"/>;
}

function circle(key, x, y, r, fill=0) {
  var fill = ["white", "#D0D0D0", "black"][fill];
  return <Circle key={key} x={x} y={y} radius={r} stroke="black" fill={fill}/>;
}

function line(key, x0, y0, x1, y1) {
  return <Line key={key.toString()} x={x0} y={y0} points={[0, 0, x1, y1]} stroke="black"/>;
}

function draw_board(key, x, y, rad, board) {
  var elems = [];

  // Border diamond
  if (board.border === 1) {
    var points = [[0,[-1,0,1,-1]], [1,[0,-1,1,1]], [2,[1,0,-1,1]], [3,[0,1,-1,-1]]];
    for (var [i,[a,b,c,d]] of points) {
      elems = [...elems, (line(key+"_border_diamond_"+i, x + rad * a, y + rad * b, rad * c, rad * d))];
    }
  }

  // Border circle
  if (board.border === 2) {
    elems = [...elems, (circle(key+"_border_circle", x, y, rad, 0))];
  }

  // Border square
  if (board.border === 3) {
    elems = [...elems, (rect(key+"_border_square", x - rad, y - rad, rad * 2, rad * 2, 0))];
  }

  // Wheel lines and dots
  for (var i = 0; i < 8; ++i) {
    var ang = Math.PI * 2 * i / 8;
    var mul = i % 2 == 0 ? 1 : [1, Math.sqrt(2)/2, 1, Math.sqrt(2)][board.border];
    var x0 = x;
    var y0 = y;
    var x1 = rad * Math.cos(ang) * mul;
    var y1 = rad * Math.sin(ang) * mul;
    if (board.clock[i]) {
      elems = [...elems, (line(key+"_line_"+i, x0, y0, x1, y1))];
    }
    if (board.wheel[i]) {
      elems = [...elems, (circle(key+"_dot_"+i, x0+x1, y0+y1, 8, board.wheel[i] - 1))];
    }
  }

  // Center circle
  if (board.center > 0) {
    elems = [...elems, (circle(key+"_center_circle", x, y, rad*0.25, board.center - 1))];
  }

  return elems;
}