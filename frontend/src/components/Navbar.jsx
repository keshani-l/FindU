import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>FindU</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/lost-items">Lost</Link>
        <Link to="/found-items">Found</Link>
        <Link to="/my-reports">Reports</Link>
        <Link to="/my-claims">Claims</Link>
        <Link to="/">Logout</Link>
      </div>
    </div>
  );
}

export default Navbar;