import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [shops, setShops] = useState([]);

  const fetchShops = async () => {
    try {
      const res = await fetch("http://localhost:5500/api/v1/shop/all", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch shops");
      } else {
        setShops(data.data);
        toast.success("Shops loaded successfully");
      }
    } catch (error) {
      toast.error("Server error while fetching shops");
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      {shops.length === 0 ? (
        <p>No shops found</p>
      ) : (
        <div className="shops-list">
          {shops.map((shop, index) => (
            <div key={index} className="shop-card">
              <h3 className="shop-name">{shop.Shop.name}</h3>
              <ul className="product-list">
                {shop.Products.length === 0 ? (
                  <li>No products in this shop</li>
                ) : (
                  shop.Products.map((product) => (
                    <li key={product._id}>
                      {product.name}{" "}
                      {product.price !== undefined && `- $${product.price}`}{" "}
                      {product.quantity !== undefined &&
                        `(Qty: ${product.quantity})`}
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
