import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Cannot connect to backend");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <Link to="/" className="brand auth-brand">
          <span className="brand-mark">U</span>
          <span>FindU</span>
        </Link>
        <h1>Join the campus lost and found hub.</h1>
        <p>
          Create your account to report items, make claims, and keep track of
          updates.
        </p>
      </section>

      <section className="auth-card">
        <div className="auth-heading">
          <h1>Register</h1>
          <p>Set up your FindU profile in a few seconds.</p>
        </div>

        {message && <div className="form-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              type="text"
              name="name"
              placeholder="Logathasan Keshani"
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
            />
          </label>

          <label>
            Role
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="staff">Staff</option>
            </select>
          </label>

          <button type="submit">Register</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
