import { useState } from "react";
import axios from "axios";

function ReportLost() {
  const [form, setForm] = useState({
    item_name: "",
    description: "",
    location: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/items/lost",
        {
          user_id: user.id,
          ...form
        }
      );

      alert(res.data.message);

      setForm({
        item_name: "",
        description: "",
        location: ""
      });

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Error submitting item"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Report Lost Item</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item_name"
          placeholder="Item Name"
          value={form.item_name}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          cols="40"
          value={form.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReportLost;