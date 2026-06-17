import { NavLink, useNavigate } from "react-router-dom";

const navGroups = [
  {
    label: "Report",
    links: [
      { to: "/report-lost", icon: "!", text: "Report Lost Item" },
      { to: "/report-found", icon: "+", text: "Report Found Item" }
    ]
  },
  {
    label: "Browse",
    links: [
      { to: "/lost-items", icon: "L", text: "Lost Items" },
      { to: "/found-items", icon: "F", text: "Found Items" }
    ]
  },
  {
    label: "My Area",
    links: [
      { to: "/my-reports", icon: "R", text: "My Reports" },
      { to: "/my-claims", icon: "C", text: "My Claims" }
    ]
  }
];

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();
  const role = user?.role || "Student";
  const sideLinkClass = ({ isActive }) =>
    isActive ? "side-link active" : "side-link";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="brand">
        <span className="brand-mark">U</span>
        <span>FindU</span>
      </NavLink>

      <nav className="side-nav" aria-label="Main navigation">
        <NavLink to="/dashboard" className={sideLinkClass}>
          <span className="nav-icon">D</span>
          <span>Dashboard</span>
        </NavLink>

        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <p>{group.label}</p>
            {group.links.map((link) => (
              <NavLink to={link.to} className={sideLinkClass} key={link.to}>
                <span className="nav-icon">{link.icon}</span>
                <span>{link.text}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-profile">
        <div className="avatar avatar-large">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <strong>{user?.name || "FindU User"}</strong>
        <span>{role}</span>
        <button type="button" className="sidebar-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Navbar;
