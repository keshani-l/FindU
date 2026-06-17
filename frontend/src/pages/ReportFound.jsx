import { useState } from "react";
import axios from "axios";
import { itemCategories } from "../constants/itemCategories";

function ReportFound() {
  const [form, setForm] = useState({
    item_name: "",
    category: "Other",
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
    formData.append("category", form.category);
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
        category: "Other",
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
    <>
      <div className="page-header">
        <h1>Report Found Item</h1>
        <p>Post found items quickly so owners can claim them.</p>
      </div>

      <form className="card form-card" onSubmit={handleSubmit}>
        <label>
          Item name
          <input
            type="text"
            name="item_name"
            placeholder="Silver watch"
            value={form.item_name}
            onChange={handleChange}
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {itemCategories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Description
          <textarea
            name="description"
            placeholder="Add color, brand, and where it can be collected"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Found location
          <input
            type="text"
            name="location"
            placeholder="Cafeteria"
            value={form.location}
            onChange={handleChange}
          />
        </label>

        <label>
          Item image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <button type="submit">
          Submit Found Report
        </button>
      </form>

      <section className="note-panel">
        <h2>Safety reminder</h2>
        <p>
          Keep valuable found items secure and share enough detail for the owner
          to identify it. Owners may be asked to provide proof before collection.
        </p>
      </section>
    </>
  );
}

export default ReportFound;
