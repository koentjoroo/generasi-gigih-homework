import "./App.css";
import Tracks from './components/Tracks'
import Player from './components/Player'
import data from "./data/sample";

function App() {
  return (
    <div className="App">
      <Tracks data={data} />
    </div>
  );
}

export default App;
