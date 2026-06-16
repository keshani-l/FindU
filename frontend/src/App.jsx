import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import MyReports from "./pages/MyReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/lost-items" element={<LostItems />} />
        <Route path="/found-items" element={<FoundItems />} />
        <Route path="/my-reports" element={<MyReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;