import { useEffect, useState } from "react";

function UsStocks() {
const [stocks, setStocks] = useState([]);

useEffect(() => {
fetch("http://localhost:5000/products")
.then((res) => res.json())
.then((data) => {
const usStocks = data.filter(
(stock) => stock.market === "US"
);
setStocks(usStocks);
})
.catch((err) => console.log(err));
}, []);

const buyStock = async (stock) => {
const user = JSON.parse(localStorage.getItem("user"));

```
if (!user) {
  alert("Please Login First");
  return;
}

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

alert(data.message);
```

};

return (
<div style={{ padding: "30px" }}>
<button
onClick={() => window.history.back()}
>
⬅ Back </button>

```
  <h1>🇺🇸 US Stock Market</h1>

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
        <p>${stock.price}</p>

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

export default UsStocks;
