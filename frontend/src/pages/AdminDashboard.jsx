import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/claims"
      );

      setClaims(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (claim_id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/claims/${claim_id}`,
        { status }
      );

      alert(res.data.message);
      fetchClaims();
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <>
      <h1>Admin Dashboard</h1>

      {claims.map((claim) => (
        <div key={claim.claim_id} className="card">
          <h3>{claim.item_name}</h3>

          <p>
            <strong>Proof:</strong> {claim.proof}
          </p>

          <p>
            <strong>Status:</strong> {claim.status}
          </p>

          <button
            onClick={() =>
              updateStatus(claim.claim_id, "approved")
            }
          >
            Approve
          </button>

          {" "}

          <button
            onClick={() =>
              updateStatus(claim.claim_id, "rejected")
            }
          >
            Reject
          </button>
        </div>
      ))}
    </>
  );
}

export default AdminDashboard;
