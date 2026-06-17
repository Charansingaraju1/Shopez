import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IndianStocks from "./Indianstocks";
import UsStocks from "./Usstocks";
import Portfolio from "./Portfolio";
import Login from "./Login";
import Register from "./Register";
import History from "./History";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#1e3a8a",
          fontSize: "48px",
          marginBottom: "10px",
        }}
      >
        📈 ShopEZ
      </h1>

      <h2 style={{ color: "#555" }}>
        Buy and Track Stocks from India & USA
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "50px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/profile">
  <button
    style={{
      padding: "20px 40px",
      fontSize: "20px",
      border: "none",
      borderRadius: "10px",
      background: "#0ea5e9",
      color: "white",
      cursor: "pointer",
    }}
  >
    👤 Profile
  </button>
</Link>
        <Link to="/indian">
          <button
            style={{
              padding: "20px 40px",
              fontSize: "20px",
              border: "none",
              borderRadius: "10px",
              background: "#ff9933",
              color: "white",
              cursor: "pointer",
            }}
          >
            🇮🇳 Indian Stocks
          </button>
        </Link>

        <Link to="/us">
          <button
            style={{
              padding: "20px 40px",
              fontSize: "20px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            🇺🇸 US Stocks
          </button>
        </Link>

        <Link to="/portfolio">
          <button
            style={{
              padding: "20px 40px",
              fontSize: "20px",
              border: "none",
              borderRadius: "10px",
              background: "#16a34a",
              color: "white",
              cursor: "pointer",
            }}
          >
            💼 Portfolio
          </button>
        </Link>

        <Link to="/history">
          <button
            style={{
              padding: "20px 40px",
              fontSize: "20px",
              border: "none",
              borderRadius: "10px",
              background: "#f59e0b",
              color: "white",
              cursor: "pointer",
            }}
          >
            📜 History
          </button>
        </Link>

       {!user && (
  <>
    <Link to="/login">
      <button
        style={{
          padding: "20px 40px",
          fontSize: "20px",
          border: "none",
          borderRadius: "10px",
          background: "#7c3aed",
          color: "white",
          cursor: "pointer",
        }}
      >
        🔐 Login
      </button>
    </Link>

    <Link to="/register">
      <button
        style={{
          padding: "20px 40px",
          fontSize: "20px",
          border: "none",
          borderRadius: "10px",
          background: "#dc2626",
          color: "white",
          cursor: "pointer",
        }}
      >
        📝 Register
      </button>
    </Link>
  </>
)}
{user && (
  <button
    onClick={() => {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }}
    style={{
      padding: "20px 40px",
      fontSize: "20px",
      border: "none",
      borderRadius: "10px",
      background: "#111827",
      color: "white",
      cursor: "pointer",
    }}
  >
    🚪 Logout
  </button>
)}
      </div>

      <div
        style={{
          marginTop: "60px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>📊 Market Summary</h3>
        <p>NIFTY 50: +1.2%</p>
        <p>SENSEX: +0.9%</p>
        <p>NASDAQ: +1.5%</p>
        <p>S&P 500: +1.1%</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/indian" element={<IndianStocks />} />
        <Route path="/us" element={<UsStocks />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;