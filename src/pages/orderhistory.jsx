import { useEffect, useState } from "react";
import './orderhistory.css'
import { API_URL } from "../config/api";


function OrderHistory() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const fetchOrders = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      const response = await fetch(
        `${API_URL}/orders/user/${user.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        console.error(
          "Failed to fetch orders:",
          data
        );

        return;
      }

      setOrders(data);

    } catch (error) {

      console.error(
        "Error fetching orders:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);


  if (loading) {
    return <h2>Loading orders...</h2>;
  }


  return (

    <div className="order-history">

      <h1>My Orders</h1>


      {orders.length === 0 ? (

        <div>

          <h2>No orders yet</h2>

          <p>
            Your previous orders will
            appear here.
          </p>

        </div>

      ) : (

        orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            <div>

              <h2>
                Order #{order.id}
              </h2>

              <p>
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>

            </div>


            <div>

              <strong>
                {order.status}
              </strong>

            </div>


            <div>

              {order.items?.map(
                (item) => (

                  <div
                    key={item.id}
                  >

                    <span>
                      {item.product?.name}
                    </span>

                    <span>
                      × {item.quantity}
                    </span>

                    <span>
                      ₹
                      {Number(
                        item.price
                      ).toLocaleString()}
                    </span>

                  </div>

                )
              )}

            </div>


            <h3>
              Total: ₹
              {Number(
                order.totalAmount
              ).toLocaleString()}
            </h3>

          </div>

        ))

      )}

    </div>
  );
}

export default OrderHistory;