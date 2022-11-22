import "./App.css";
import EntryScreen from "./screens/EntryScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
        <Route
          path="/game"
          element={<EntryScreen title="Game of Year"></EntryScreen>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
