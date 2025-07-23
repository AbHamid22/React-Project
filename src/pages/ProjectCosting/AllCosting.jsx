import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const baseURL = "http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projectcostings";

function statusColor(status) {
  switch (status) {
    case "Pending":
      return "warning";
    case "Completed":
      return "success";
    case "In Progress":
    case "Ongoing":
      return "info";
    case "Cancelled":
      return "danger";
    default:
      return "secondary";
  }
}

function formatCurrency(val) {
  return Number(val).toLocaleString("en-BD", { minimumFractionDigits: 2 });
}

const AllCosting = () => {
  const [projectCostings, setProjectCostings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCostings = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}?page=${page}`);
      const data = await res.json();

      setProjectCostings(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        links: data.links,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        total: data.total,
      });
    } catch (err) {
      console.error("Failed to fetch project costings:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (link) => {
    if (link.url) {
      const url = new URL(link.url);
      const page = url.searchParams.get("page");
      fetchCostings(page);
    }
  };

  const deleteCosting = async (id) => {
    if (!window.confirm("Delete this project costing?")) return;
    try {
      const res = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          // Add authorization header here if needed
        },
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchCostings(pagination.current_page);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const numberLinks = useMemo(() => {
    if (!pagination.links) return [];
    return pagination.links.filter(
      (link) =>
        !link.label.includes("Previous") &&
        !link.label.includes("Next") &&
        !link.label.includes("First") &&
        !link.label.includes("Last")
    );
  }, [pagination.links]);

  useEffect(() => {
    fetchCostings();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Project Costing</h1>
      </div>

      {loading ? (
        <div className="alert alert-info text-center">Loading...</div>
      ) : projectCostings.length === 0 ? (
        <div className="alert alert-info text-center">No Project Costings found.</div>
      ) : (
        <div className="costing-grid">
          {projectCostings.map((costing) => (
            <div key={costing.id} className="card shadow-sm border-0 rounded">
              <div className={`card-header text-white d-flex align-items-center bg-${statusColor(costing.status)}`}>
                <i className="bi bi-folder-fill card-header-icon"></i>
                <div>
                  <h5 className="mb-0">{costing.project?.name || "Unnamed Project"}</h5>
                  <small>Module: {costing.module?.name || "N/A"}</small>
                </div>
              </div>

              <div className="card-body bg-light">
                <ul className="list-unstyled mb-3">
                  <li>
                    <strong>💰 Budget:</strong> ৳{formatCurrency(costing.budget)}
                  </li>
                  <li>
                    <strong>📉 Actual Cost:</strong> ৳{formatCurrency(costing.actual_cost)}
                  </li>
                  <li>
                    <strong>📅 Days:</strong> {costing.days}
                  </li>
                  <li>
                    <strong>✍️ Created By:</strong> {costing.created_by}
                  </li>
                  <li>
                    <strong>📝 Remarks:</strong> {costing.remarks || "N/A"}
                  </li>
                </ul>
                <span className={`badge bg-${statusColor(costing.status)}`}>{costing.status}</span>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <Link to={`/projectcostings/${costing.id}`} className="btn btn-sm btn-outline-primary">
                  View
                </Link>
                <Link to={`/projectcostings/${costing.id}/edit`} className="btn btn-sm btn-outline-success">
                  Edit
                </Link>
                <button onClick={() => deleteCosting(costing.id)} className="btn btn-sm btn-outline-danger">
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.total > 1 && (
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination">
            {/* First */}
            <li className={`page-item ${pagination.current_page === 1 ? "disabled" : ""}`}>
              <a
                href="#!"
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  fetchCostings(1);
                }}
              >
                « First
              </a>
            </li>

            {/* Previous */}
            <li className={`page-item ${!pagination.prev_page_url ? "disabled" : ""}`}>
              <a
                href="#!"
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  fetchCostings(pagination.current_page - 1);
                }}
              >
                ‹ Prev
              </a>
            </li>

            {/* Page Numbers */}
            {numberLinks.map((link) => (
              <li
                key={link.label}
                className={`page-item ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}
              >
                <a
                  href="#!"
                  className="page-link"
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(link);
                  }}
                ></a>
              </li>
            ))}

            {/* Next */}
            <li className={`page-item ${!pagination.next_page_url ? "disabled" : ""}`}>
              <a
                href="#!"
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  fetchCostings(pagination.current_page + 1);
                }}
              >
                Next ›
              </a>
            </li>

            {/* Last */}
            <li className={`page-item ${pagination.current_page === pagination.last_page ? "disabled" : ""}`}>
              <a
                href="#!"
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  fetchCostings(pagination.last_page);
                }}
              >
                Last »
              </a>
            </li>
          </ul>
        </nav>
      )}

      <style jsx>{`
        .costing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }
        .card-header-icon {
          font-size: 1.5rem;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default AllCosting;
