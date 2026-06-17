import { useEffect, useState } from "react";
import axios from "axios";

async function fetchFoundItems(setItems) {
  try {
    const res = await axios.get("http://localhost:5000/api/items/found");
    setItems(res.data);
  } catch (err) {
    console.log(err);
  }
}

function FoundItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchFoundItems(setItems);
  }, []);

  const claimItem = async (item_id) => {
    const proof = prompt("Enter proof of ownership:");
    if (!proof) return;

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.post("http://localhost:5000/api/claims", {
        item_id,
        user_id: user.id || user.user_id,
        proof
      });

      alert(res.data.message);
    } catch {
      alert("Error submitting claim");
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Found Items</h1>
        <p>Browse recovered items and claim only what belongs to you.</p>
      </div>

      <section className="note-panel">
        <h2>Claim reminder</h2>
        <p>
          Only claim items you own. You may be asked to provide proof of
          ownership before the item is returned.
        </p>
      </section>

      {items.length === 0 ? (
        <section className="empty-state card">
          No found items reported yet. Found something on campus? Add a found
          item report so the owner can locate it.
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

            <div className="card-actions">
              <button onClick={() => claimItem(item.item_id)}>
                Claim Item
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default FoundItems;
