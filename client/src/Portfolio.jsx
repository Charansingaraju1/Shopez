import { useEffect, useState } from "react";

function Portfolio() {
  const [stocks, setStocks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    fetch(`https://shopez-1-8mwl.onrender.com/portfolio/${user.email}`)
      .then((res) => res.json())
      .then((data) => setStocks(data))
      .catch((err) => console.log(err));
  }, []);

  const sellStock = async (id) => {
    try {
      const res = await fetch(
        `https://shopez-1-8mwl.onrender.com/portfolio/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      alert(data.message);

      setStocks(
        stocks.filter((stock) => stock._id !== id)
      );
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  const totalValue = stocks.reduce(
    (sum, stock) => sum + Number(stock.price),
    0
  );

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
          marginBottom: "20px",
        }}
      >
        ⬅ Back
      </button>

      <h1>💼 My Portfolio</h1>

      <h3>Total Stocks Owned: {stocks.length}</h3>

      <h3>Total Portfolio Value: ₹{totalValue}</h3>

      {stocks.length === 0 ? (
        <p>No stocks purchased yet.</p>
      ) : (
        stocks.map((stock) => (
          <div
            key={stock._id}
            style={{
              background: "white",
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{stock.stockName}</h3>

            <p>Price: ₹{stock.price}</p>

            <p>Market: {stock.market}</p>

            <button
              onClick={() => sellStock(stock._id)}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Sell Stock
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Portfolio;