import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import MyReports from "./pages/MyReports";
import MyClaims from "./pages/MyClaims";

import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/report-lost" element={<Layout><ReportLost /></Layout>} />
        <Route path="/report-found" element={<Layout><ReportFound /></Layout>} />
        <Route path="/lost-items" element={<Layout><LostItems /></Layout>} />
        <Route path="/found-items" element={<Layout><FoundItems /></Layout>} />
        <Route path="/my-reports" element={<Layout><MyReports /></Layout>} />
        <Route path="/my-claims" element={<Layout><MyClaims /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
