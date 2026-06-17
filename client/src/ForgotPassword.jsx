import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const resetPassword = () => {
    alert("Password reset link sent to " + email);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🔑 Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
        }}
      />

      <br />
      <br />

      <button onClick={resetPassword}>
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPassword;