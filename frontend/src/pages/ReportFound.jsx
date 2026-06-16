import { useState } from "react";
import axios from "axios";

function ReportFound() {
  const [form, setForm] = useState({
    item_name: "",
    description: "",
    location: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();
    formData.append("user_id", user.id || user.user_id);
    formData.append("item_name", form.item_name);
    formData.append("description", form.description);
    formData.append("location", form.location);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/items/found",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(res.data.message);

      setForm({
        item_name: "",
        description: "",
        location: ""
      });

      setImage(null);
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Error submitting item"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Report Found Item</h1>

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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReportFound;