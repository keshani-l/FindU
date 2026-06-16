import { useEffect, useState } from "react";
import axios from "axios";

function MyReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.get(
        `http://localhost:5000/api/items/user/${user.id}`
      );

      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editReport = async (item) => {
    const newName = prompt("Enter new item name:", item.item_name);
    const newDescription = prompt("Enter new description:", item.description);
    const newLocation = prompt("Enter new location:", item.location);

    if (!newName || !newDescription || !newLocation) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/items/${item.item_id}`,
        {
          item_name: newName,
          description: newDescription,
          location: newLocation
        }
      );

      alert(res.data.message);
      fetchReports();
    } catch (err) {
      alert("Error updating report");
    }
  };

  const deleteReport = async (item_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/items/${item_id}`
      );

      alert(res.data.message);
      fetchReports();
    } catch (err) {
      alert("Error deleting report");
    }
  };

  return (
    <>
      <h1>My Reports</h1>

      {reports.map((item) => (
        <div key={item.item_id} className="card">
          <h3>{item.item_name}</h3>

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

          <button onClick={() => editReport(item)}>
            Edit
          </button>

          {" "}

          <button onClick={() => deleteReport(item.item_id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default MyReports;
