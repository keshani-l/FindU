import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>FindU Dashboard</h1>
      <h3>Welcome, {user?.name}</h3>

      <br />

      <Link to="/report-lost">
        <button>Report Lost Item</button>
      </Link>

      <br /><br />

      <Link to="/report-found">
        <button>Report Found Item</button>
      </Link>

      <br /><br />

      <Link to="/lost-items">
        <button>View Lost Items</button>
      </Link>

      <br /><br />

      <Link to="/found-items">
        <button>View Found Items</button>
      </Link>

      <br /><br />

      <Link to="/my-reports">
        <button>My Reports</button>
      </Link>

      <br /><br />
<Link to="/my-claims">
  <button>My Claims</button>
</Link>

<br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;