import EntryScreen from "../screens/EntryScreen";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const AnimatedRouting = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
        <Route
          path="/game"
          element={<EntryScreen title="Game of Year"></EntryScreen>}
        ></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRouting;
