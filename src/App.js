import "./App.css";
import data from "./data/sample";
import TrackDetail from "./components/TrackDetail";

function App() {
  return (
    <div className="App">
      <TrackDetail data={data} />
    </div>
  );
}

export default App;
