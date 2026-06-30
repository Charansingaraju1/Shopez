import { useEffect, useState } from "react";

function IndianStocks() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch("https://shopez-1-8mwl.onrender.com")
      .then((res) => res.json())
      .then((data) => {
        const indianStocks = data.filter(
          (stock) => stock.market === "India"
        );
        setStocks(indianStocks);
      })
      .catch((err) => console.log(err));
  }, []);

  const buyStock = async (stock) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Login First");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/portfolio/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            stockName: stock.name,
            price: stock.price,
            market: stock.market,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      alert(data.message);
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <button onClick={() => window.history.back()}>
        ⬅ Back
      </button>

      <h1>🇮🇳 Indian Stock Market</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
        }}
      >
        {stocks.map((stock) => (
          <div
            key={stock.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>{stock.name}</h3>
            <p>₹{stock.price}</p>

            <button
              onClick={() => buyStock(stock)}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndianStocks;