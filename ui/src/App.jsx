import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import MyHome from "./pages/MyHome";
import Party from "./pages/Party";
import Search from "./pages/Search";
import Wool from "./pages/Wool";
import Detail from "./pages/Detail";
import MyTab from "./components/MyTab";
import Remind from "./pages/Remind";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/party" element={<Party />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wool" element={<Wool />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/remind" element={<Remind />} />
        </Routes>
        <MyTab />
      </HashRouter>
    </>
  );
}

export default App;
