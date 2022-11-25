import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRouting from "./components/AnimatedRouting";

function App() {
  return (
    <Router>
      <AnimatedRouting></AnimatedRouting>
    </Router>
  );
}

export default App;
