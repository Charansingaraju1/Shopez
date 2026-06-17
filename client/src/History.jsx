function History() {
  const stocks = JSON.parse(localStorage.getItem("portfolio")) || [];

  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={() => window.history.back()}
        style={{
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ⬅ Back
      </button>

      <h1>📜 Transaction History</h1>

      <h3>Total Transactions: {stocks.length}</h3>

      {stocks.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        stocks.map((stock, index) => (
          <div
            key={index}
            style={{
              background: "white",
              border: "1px solid #ddd",
              padding: "20px",
              marginTop: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{stock.name}</h3>
            <p>Price: {stock.price}</p>
            <p>Status: ✅ Purchased</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;