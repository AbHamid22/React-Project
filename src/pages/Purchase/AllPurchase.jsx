import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../UI/Card";

function ManagePurchase() {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPurchases(currentPage);
    }, [currentPage]);

    const fetchPurchases = async (page = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/purchases?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!res.ok) throw new Error("Failed to fetch purchases");

            const json = await res.json();
            console.log(json);
            setPurchases(json.data);
            setCurrentPage(json.current_page);
            setLastPage(json.last_page);
        } catch (err) {
            console.error("Fetch Error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const deletePurchase = async (id) => {
        try {
            const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/purchases/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!res.ok) throw new Error("Failed to delete purchase");

            const text = await res.text();
            const data = text ? JSON.parse(text) : {};
            console.log("Delete Response:", data);

            fetchPurchases(currentPage); // Refresh
        } catch (err) {
            console.error("Delete Error:", err.message);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            deletePurchase(id);
        }
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    return (
        <Card title="Purchases">
            <NavLink className="btn btn-primary mb-3" to="/purchases/create">
                New
            </NavLink>

            <table className="table table-bordered table-hover">
                <thead className="table-info">
                    <tr>
                        <th>#</th>
                        <th>Vendor</th>
                        <th>Warehouse</th>
                        <th>Purchase Date</th>
                        <th>Delivery Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="9" className="text-center">Loading...</td>
                        </tr>
                    ) : purchases.length > 0 ? (
                        purchases.map((purchase) => (
                            <tr key={purchase.id}>
                                <td>{purchase.id}</td>
                                <td>{purchase.vendor?.name || purchase.vendor_id}</td>
                                <td>{purchase.warehouse?.name || purchase.warehouse_id}</td>
                                <td>{formatDate(purchase.purchase_date)}</td>
                                <td>{formatDate(purchase.delivery_date)}</td>
                                <td>{formatCurrency(purchase.purchase_total)} BDT</td>
                                <td>{formatCurrency(purchase.paid_amount)} BDT</td>
                                <td>{purchase.status?.name || purchase.status_id}</td>
                                <td className="btn-group">
                                    <button onClick={() => navigate(`/purchases/${purchase.id}`)} className="btn btn-success">View</button>
                                    {/* <button onClick={() => navigate(`/purchases/${purchase.id}/edit`)} className="btn btn-primary">Edit</button> */}
                                    <button onClick={() => handleDelete(purchase.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center text-muted">No purchases found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-3">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => goToPage(1)}>First</button>
                        </li>
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Previous</button>
                        </li>

                        {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                            <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                                <button className="page-link" onClick={() => goToPage(page)}>{page}</button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Next</button>
                        </li>
                        <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => goToPage(lastPage)}>Last</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </Card>
    );
}

// Utilities
const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const formatCurrency = (num) =>
    parseFloat(num).toLocaleString(undefined, { minimumFractionDigits: 2 });

export default ManagePurchase;
