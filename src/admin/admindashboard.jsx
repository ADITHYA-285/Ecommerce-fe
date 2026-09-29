import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./adminorders.css";

function AdminDashboard() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/orders`,
                {
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


    const pendingOrders = orders.filter(
        (order) =>
            order.status === "PENDING"
    ).length;


    const processingOrders = orders.filter(
        (order) =>
            order.status === "PROCESSING"
    ).length;


    const completedOrders = orders.filter(
        (order) =>
            order.status === "COMPLETED"
    ).length;


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

                    <Link
                        to="/admin"
                        className="active"
                    >
                        🏠
                        <span>Dashboard</span>
                    </Link>


                    <Link to="/admin/orders">
                        📦
                        <span>Orders</span>
                    </Link>


                    <Link to="/admin/products">
                        🛒
                        <span>Products</span>
                    </Link>


                </nav>


                <div className="sidebar-bottom">

                    <Link to="/">
                        ←
                        <span>
                            Logout
                        </span>
                    </Link>

                </div>

            </aside>


            {/* ================= MAIN ================= */}

            <main className="admin-main">


                {/* HEADER */}

                <header className="admin-topbar">

                    <div>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Welcome back, Administrator
                        </p>

                    </div>


                    <div className="admin-profile">

                        <div className="profile-icon">
                            A
                        </div>

                        <div>

                            <strong>
                                Admin
                            </strong>

                            <span>
                                Administrator
                            </span>

                        </div>

                    </div>

                </header>


                {/* ================= STATS ================= */}

                <section className="stats-grid">


                    <div className="stat-card">

                        <div className="stat-icon">
                            📦
                        </div>

                        <div>

                            <span>
                                Total Orders
                            </span>

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

                            <span>
                                Pending
                            </span>

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

                            <span>
                                Processing
                            </span>

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

                            <span>
                                Completed
                            </span>

                            <h2>
                                {completedOrders}
                            </h2>

                        </div>

                    </div>

                </section>


                {/* ================= QUICK ACTIONS ================= */}

                <section className="orders-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Manage your store
                            </p>

                        </div>

                    </div>


                    <div className="admin-orders-list">


                        <Link
                            to="/admin/orders"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >

                            <div className="admin-order-card">

                                <h2>
                                    📦 Manage Orders
                                </h2>

                                <p>
                                    View and manage customer
                                    orders and update their
                                    status.
                                </p>

                            </div>

                        </Link>


                        <Link
                            to="/admin/products"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >

                            <div className="admin-order-card">

                                <h2>
                                    🛒 Manage Products
                                </h2>

                                <p>
                                    Add, edit and delete
                                    products from your store.
                                </p>

                            </div>

                        </Link>


                    </div>

                </section>


            </main>

        </div>

    );
}

export default AdminDashboard;