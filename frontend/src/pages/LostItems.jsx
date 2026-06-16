import { useEffect, useState } from "react";
import axios from "axios";

function LostItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items/lost");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lost Items</h1>

      {items.length === 0 ? (
        <p>No lost items found.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.item_id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px"
            }}
          >
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
            <p>
              <strong>Reported:</strong>{" "}
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default LostItems;