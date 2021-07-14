import "./App.css";
import data from "./data/sample";
import SongCard from "./components/SongCard";

function App() {
  return (
    <div className="App">
      <SongCard data={data} />
    </div>
  );
}

export default App;
