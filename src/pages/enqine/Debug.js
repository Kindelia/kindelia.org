import LevelDebug from "./screens/LevelDebug";
import level_07 from "./levels/level_07";
import "./EnQIne.css";

export default function Debug() {
  return (
    <main className="enqine-app">
      <LevelDebug levelBuilder={level_07} />
    </main>
  );
}