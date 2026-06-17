import { useEffect, useState } from "react";
import axios from "axios";

async function fetchClaims(setClaims) {
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
}

function MyClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims(setClaims);
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>My Claims</h1>
        <p>Track the ownership requests you have submitted.</p>
      </div>

      {claims.length === 0 ? (
        <section className="empty-state card">
          No claims yet. Browse Found Items and submit proof when you recognize
          something that belongs to you.
        </section>
      ) : (
        claims.map((claim) => (
          <div key={claim.claim_id} className="card">
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
    </>
  );
}

export default MyClaims;
