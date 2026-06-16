import { useEffect, useState } from "react";
import axios from "axios";

function FoundItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const fetchFoundItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items/found");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (err) {
      alert("Error submitting claim");
    }
  };

  return (
    <>
      <h1>Found Items</h1>

      {items.length === 0 ? (
        <p>No found items found.</p>
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

            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Status:</strong> {item.status}</p>

            <button onClick={() => claimItem(item.item_id)}>
              Claim Item
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default FoundItems;
