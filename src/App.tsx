import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chapters from "./pages/Chapters";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Chapters />} />
      <Route path="*" element={<Chapters />} />
    </Routes>
  </BrowserRouter>
);

export default App;
