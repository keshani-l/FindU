import { useEffect, useState } from "react";
import axios from "axios";

function MyClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id || user.user_id;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/claims/user/${userId}`
      );

      setClaims(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Claims</h1>

      {claims.length === 0 ? (
        <p>No claims found.</p>
      ) : (
        claims.map((claim) => (
          <div
            key={claim.claim_id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px"
            }}
          >
            <h3>{claim.item_name}</h3>

            <p>
              <strong>Proof:</strong> {claim.proof}
            </p>

            <p>
              <strong>Status:</strong> {claim.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyClaims;