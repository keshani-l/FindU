import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const apiBase = "http://localhost:5000";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function formatDate(value) {
  if (!value) return "Today";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function ItemPreview({ item, type }) {
  const imageUrl = item.image ? `${apiBase}/uploads/${item.image}` : null;
  const statusClass = type === "lost" ? "lost" : "found";
  const category = item.category || "Other";

  return (
    <div className="recent-item">
      {imageUrl ? (
        <img src={imageUrl} alt={item.item_name} />
      ) : (
        <div className={`item-placeholder ${statusClass}`}>
          {type === "lost" ? "L" : "F"}
        </div>
      )}

      <div className="recent-item-info">
        <strong>{item.item_name}</strong>
        <span>{category} - {item.location || "Location not added"}</span>
      </div>

      <span className={`status-pill ${statusClass}`}>{type}</span>
      <time>{formatDate(item.created_at)}</time>
    </div>
  );
}

function RecentPanel({ title, linkTo, items, type }) {
  const emptyMessages = {
    lost: "No lost items reported yet. Check again later or report a missing item.",
    found: "No found items reported yet. Found something on campus? Add it here."
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>{title}</h2>
        <Link to={linkTo}>View all</Link>
      </div>

      <div className="recent-list">
        {items.length === 0 ? (
          <p className="empty-state">{emptyMessages[type]}</p>
        ) : (
          items.slice(0, 4).map((item) => (
            <ItemPreview item={item} type={type} key={item.item_id} />
          ))
        )}
      </div>
    </section>
  );
}

function Dashboard() {
  const user = getUser();
  const userId = user?.id || user?.user_id;
  const [summary, setSummary] = useState({
    lost: [],
    found: [],
    reports: [],
    claims: []
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const requests = [
          axios.get(`${apiBase}/api/items/lost`),
          axios.get(`${apiBase}/api/items/found`),
          userId
            ? axios.get(`${apiBase}/api/items/user/${userId}`)
            : Promise.resolve({ data: [] }),
          userId
            ? axios.get(`${apiBase}/api/claims/user/${userId}`)
            : Promise.resolve({ data: [] })
        ];

        const [lostRes, foundRes, reportsRes, claimsRes] =
          await Promise.all(requests);

        setSummary({
          lost: lostRes.data || [],
          found: foundRes.data || [],
          reports: reportsRes.data || [],
          claims: claimsRes.data || []
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, [userId]);

  const stats = [
    {
      label: "Lost Items",
      value: summary.lost.length,
      caption: "Total lost items reported",
      to: "/lost-items",
      icon: "L",
      tone: "blue"
    },
    {
      label: "Found Items",
      value: summary.found.length,
      caption: "Total found items reported",
      to: "/found-items",
      icon: "F",
      tone: "green"
    },
    {
      label: "My Reports",
      value: summary.reports.length,
      caption: "Items you have reported",
      to: "/my-reports",
      icon: "R",
      tone: "purple"
    },
    {
      label: "My Claims",
      value: summary.claims.length,
      caption: "Claims you have made",
      to: "/my-claims",
      icon: "C",
      tone: "orange"
    }
  ];

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>
          Welcome back, {user?.name || "FindU user"}. Find and report lost
          items around campus quickly.
        </p>
      </div>

      <section className="info-grid how-it-works" aria-label="How FindU works">
        <article className="info-card">
          <span>1</span>
          <h2>Report lost or found item</h2>
          <p>Add the item category, location, description, and photo.</p>
        </article>

        <article className="info-card">
          <span>2</span>
          <h2>Browse matching items</h2>
          <p>Check recent lost and found posts by category and location.</p>
        </article>

        <article className="info-card">
          <span>3</span>
          <h2>Claim with proof</h2>
          <p>Only claim your own item and share proof of ownership.</p>
        </article>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <article className={`stat-card ${stat.tone}`} key={stat.label}>
            <div className="stat-icon">{stat.icon}</div>
            <div>
              <strong>{stat.value}</strong>
              <h2>{stat.label}</h2>
              <p>{stat.caption}</p>
            </div>
            <Link to={stat.to}>View all</Link>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <RecentPanel
          title="Recent Found Items"
          linkTo="/found-items"
          items={summary.found}
          type="found"
        />
        <RecentPanel
          title="Recent Lost Items"
          linkTo="/lost-items"
          items={summary.lost}
          type="lost"
        />
      </section>

      <section className="dashboard-bottom">
        <div className="cta-panel">
          <div className="shield-badge">F</div>
          <div>
            <h2>Let's keep our campus safe</h2>
            <p>Report lost or found items to help others.</p>
          </div>
          <Link to="/report-lost" className="primary-link">
            Report an Item
          </Link>
        </div>

        <div className="announcement-panel">
          <div className="panel-header">
            <h2>Announcements</h2>
          </div>
          <div className="announcement-card">
            <p>Please check Lost and Found regularly for your missing items.</p>
            <time>Today</time>
          </div>
          <div className="announcement-card">
            <p>For urgent lost items, contact the campus lost and found office.</p>
            <time>Help note</time>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
