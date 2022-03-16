import { levels } from "./levels";
import LevelDebug from "./screens/LevelDebug";

const main_level = levels.sipher_art_1;

export default function Debug() {
  return (
    <main className="enqine-app">
      <LevelDebug levelBuilder={main_level} seed={4151664525}/>
    </main>
  );
}