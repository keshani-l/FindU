import { useState } from "react";
import axios from "axios";
import { itemCategories } from "../constants/itemCategories";

function ReportLost() {
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
        "http://localhost:5000/api/items/lost",
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
        <h1>Report Lost Item</h1>
        <p>Add clear details so the campus community can help find it.</p>
      </div>

      <form className="card form-card" onSubmit={handleSubmit}>
        <label>
          Item name
          <input
            type="text"
            name="item_name"
            placeholder="Black backpack"
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
            placeholder="Add color, brand, and any useful identifying details"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Last seen location
          <input
            type="text"
            name="location"
            placeholder="Library, 2nd floor"
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
          Submit Lost Report
        </button>
      </form>

      <section className="note-panel">
        <h2>Helpful reporting tip</h2>
        <p>
          Include the category, last seen place, color, brand, and any unique
          marks. For urgent lost items, contact the campus lost and found office.
        </p>
      </section>
    </>
  );
}

export default ReportLost;
