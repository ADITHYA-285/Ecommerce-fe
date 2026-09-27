import { useEffect, useState } from "react";
import "./adminorders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

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
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/orders/${orderId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Failed to update status:",
          data
        );
        return;
      }

      fetchOrders();

    } catch (error) {
      console.error(
        "Error updating status:",
        error
      );
    }
  };


  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "PROCESSING"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "CANCELLED"
  ).length;

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "status-badge pending";

      case "PROCESSING":
        return "status-badge processing";

      case "COMPLETED":
        return "status-badge completed";

      case "CANCELLED":
        return "status-badge cancelled";

      default:
        return "status-badge";
    }
  };

  return (
    <div className="admin-app">

      {/* ================= SIDEBAR ================= */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          🛍️
          <span>MyStore</span>
        </div>

        <div className="admin-label">
          ADMIN PANEL
        </div>

        <nav className="admin-nav">

          <a href="/admin">
            🏠
            <span>Dashboard</span>
          </a>

          <a
            href="/admin/orders"
            className="active"
          >
            📦
            <span>Orders</span>
          </a>

          <a href="/admin/products">
            🛒
            <span>Products</span>
          </a>

          <a href="#">
            👥
            <span>Customers</span>
          </a>

        </nav>

        <div className="sidebar-bottom">

          <a href="/">
            ←
            <span>Back to Store</span>
          </a>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-topbar">

          <div>
            <h1>Order Management</h1>

            <p>
              Manage and track customer orders
            </p>
          </div>

          <div className="admin-profile">
            <div className="profile-icon">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>

        </header>


        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              📦
            </div>

            <div>
              <span>Total Orders</span>

              <h2>
                {orders.length}
              </h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ⏳
            </div>

            <div>
              <span>Pending</span>

              <h2>
                {pendingOrders}
              </h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🚚
            </div>

            <div>
              <span>Processing</span>

              <h2>
                {processingOrders}
              </h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ✅
            </div>

            <div>
              <span>Completed</span>

              <h2>
                {completedOrders}
              </h2>
            </div>

          </div>

        </section>


        {/* ================= ORDERS ================= */}

        <section className="orders-section">

          <div className="section-header">

            <div>
              <h2>Recent Orders</h2>

              <p>
                View and manage all customer orders
              </p>
            </div>

            <div className="order-count">
              {orders.length} orders
            </div>

          </div>


          {/* ORDERS */}

          <div className="admin-orders-list">

            {orders.length === 0 ? (

              <div className="no-orders">

                <div>
                  📦
                </div>

                <h2>
                  No Orders
                </h2>

                <p>
                  There are currently no customer orders.
                </p>

              </div>

            ) : (

              orders.map((order) => (

                <div
                  className="admin-order-card"
                  key={order.id}
                >

                  {/* ORDER TOP */}

                  <div className="order-card-top">

                    <div className="order-number">

                      <span>
                        ORDER
                      </span>

                      <h2>
                        #{order.id}
                      </h2>

                    </div>

                    <span
                      className={getStatusClass(
                        order.status
                      )}
                    >
                      {order.status}
                    </span>

                  </div>


                  {/* CUSTOMER */}

                  <div className="customer-info">

                    <div className="customer-avatar">
                      {order.user?.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>

                      <strong>
                        {order.user?.name}
                      </strong>

                      <span>
                        {order.user?.email}
                      </span>

                    </div>

                  </div>


                  {/* ORDER CONTENT */}

                  <div className="order-content">

                    <div className="products-info">

                      <h3>
                        Products
                      </h3>

                      {order.items?.map(
                        (item) => (

                          <div
                            className="product-row"
                            key={item.id}
                          >

                            <div className="product-icon">
                              📱
                            </div>

                            <div className="product-name">

                              <strong>
                                {item.product?.name}
                              </strong>

                              <span>
                                Quantity:{" "}
                                {item.quantity}
                              </span>

                            </div>

                            <div className="product-price">

                              ₹
                              {Number(
                                item.price
                              ).toLocaleString()}

                            </div>

                          </div>

                        )
                      )}

                    </div>


                    {/* TOTAL */}

                    <div className="order-total">

                      <span>
                        Total Amount
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.totalAmount
                        ).toLocaleString()}
                      </strong>

                      <small>
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </small>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="order-card-footer">

                    {order.status === "PENDING" && (

                      <>

                        <button
                          className="btn-processing"
                          onClick={() =>
                            updateStatus(
                              order.id,
                              "PROCESSING"
                            )
                          }
                        >
                          Start Processing
                        </button>

                        <button
                          className="btn-cancel"
                          onClick={() =>
                            updateStatus(
                              order.id,
                              "CANCELLED"
                            )
                          }
                        >
                          Cancel
                        </button>

                      </>

                    )}


                    {order.status === "PROCESSING" && (

                      <>

                        <button
                          className="btn-complete"
                          onClick={() =>
                            updateStatus(
                              order.id,
                              "COMPLETED"
                            )
                          }
                        >
                          ✓ Mark Completed
                        </button>

                        <button
                          className="btn-cancel"
                          onClick={() =>
                            updateStatus(
                              order.id,
                              "CANCELLED"
                            )
                          }
                        >
                          Cancel
                        </button>

                      </>

                    )}


                    {order.status === "COMPLETED" && (

                      <div className="locked-order">
                        🔒
                        <span>
                          Completed — no changes allowed
                        </span>
                      </div>

                    )}


                    {order.status === "CANCELLED" && (

                      <div className="locked-order">
                        🔒
                        <span>
                          Cancelled — no changes allowed
                        </span>
                      </div>

                    )}

                  </div>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminOrders;