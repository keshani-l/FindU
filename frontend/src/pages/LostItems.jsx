import { useEffect, useState } from "react";
import axios from "axios";

async function fetchLostItems(setItems) {
  try {
    const res = await axios.get("http://localhost:5000/api/items/lost");
    setItems(res.data);
  } catch (err) {
    console.log(err);
  }
}

function LostItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchLostItems(setItems);
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>Lost Items</h1>
        <p>Browse missing items reported by the campus community.</p>
      </div>

      {items.length === 0 ? (
        <section className="empty-state card">
          No lost items reported yet. Check again later or report a missing
          item from the sidebar.
        </section>
      ) : (
        items.map((item) => (
          <div key={item.item_id} className="card">
            {item.image && (
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.item_name}
                style={{
                  width: "200px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
            )}

            <h3>{item.item_name}</h3>

            <div className="item-meta">
              <span className="category-pill">{item.category || "Other"}</span>
            </div>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p>
              <strong>Reported:</strong>{" "}
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}

      <section className="note-panel">
        <h2>Need help?</h2>
        <p>
          If the item is urgent or valuable, contact the campus lost and found
          office while you keep checking new reports here.
        </p>
      </section>
    </>
  );
}

export default LostItems;
