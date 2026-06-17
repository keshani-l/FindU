import { useEffect, useState } from "react";
import axios from "axios";
import { itemCategories } from "../constants/itemCategories";

async function fetchReports(setReports) {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.get(
      `http://localhost:5000/api/items/user/${user.id}`
    );

    setReports(res.data);
  } catch (err) {
    console.log(err);
  }
}

function MyReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports(setReports);
  }, []);

  const editReport = async (item) => {
    const newName = prompt("Enter new item name:", item.item_name);
    const newCategory = prompt(
      `Enter category (${itemCategories.join(", ")}):`,
      item.category || "Other"
    );
    const newDescription = prompt("Enter new description:", item.description);
    const newLocation = prompt("Enter new location:", item.location);

    if (!newName || !newCategory || !newDescription || !newLocation) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/items/${item.item_id}`,
        {
          item_name: newName,
          category: itemCategories.includes(newCategory) ? newCategory : "Other",
          description: newDescription,
          location: newLocation
        }
      );

      alert(res.data.message);
      fetchReports(setReports);
    } catch {
      alert("Error updating report");
    }
  };

  const deleteReport = async (item_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/items/${item_id}`
      );

      alert(res.data.message);
      fetchReports(setReports);
    } catch {
      alert("Error deleting report");
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>My Reports</h1>
        <p>Review, update, or remove the items you have reported.</p>
      </div>

      {reports.length === 0 ? (
        <section className="empty-state card">
          You have not submitted any reports yet. Use Report Lost Item or Report
          Found Item to add your first one.
        </section>
      ) : (
        reports.map((item) => (
          <div key={item.item_id} className="card">
            <h3>{item.item_name}</h3>

            <div className="item-meta">
              <span className="category-pill">{item.category || "Other"}</span>
            </div>

            <p>
              <strong>Type:</strong> {item.item_type}
            </p>

            <p>
              <strong>Description:</strong> {item.description}
            </p>

            <p>
              <strong>Location:</strong> {item.location}
            </p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>

            <div className="card-actions">
              <button onClick={() => editReport(item)}>
                Edit
              </button>

              <button onClick={() => deleteReport(item.item_id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default MyReports;
