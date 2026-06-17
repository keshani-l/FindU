import Navbar from "./Navbar";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function Layout({ children }) {
  const user = getUser();
  const role = user?.role || "Student";

  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-main">
        <header className="topbar">
          <button type="button" className="icon-button menu-button" aria-label="Open menu">
            =
          </button>

          <label className="search-box">
            <span>Search</span>
            <input type="search" placeholder="Search items..." />
          </label>

          <div className="topbar-actions">
            <div className="topbar-profile">
              <div className="avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <strong>{user?.name || "FindU User"}</strong>
                <span>{role}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
