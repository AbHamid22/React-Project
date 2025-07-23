import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/progresses";

const AllProgressive = () => {
  const [progresses, setProgresses] = useState([]);

  const fetchProgresses = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch progresses");
      const data = await res.json();
      setProgresses(data);
    } catch (err) {
      console.error("Failed to load progresses:", err);
    }
  };

  const deleteProgress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProgresses((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting progress:", err);
    }
  };

  useEffect(() => {
    fetchProgresses();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-primary mb-4 fw-bold">Project Progressive List</h2>
      <Link to="/add-progress" className="btn btn-primary mb-4">
        + Add Progress
      </Link>

      <div className="row">
        {progresses.map((progress) => (
          <div key={progress.id} className="col-md-6 mb-4">
            <div className="card border-primary rounded shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center bg-light fw-semibold">
                <span>{progress.module?.name || "N/A"}</span>
                <div>
                  <span className="text-dark fw-bold me-2">
                    {parseFloat(progress.percent) === 100
                      ? "100% (Completed)"
                      : progress.percent + "%"}
                  </span>
                  <span className="badge bg-info">{progress.status?.name || "N/A"}</span>
                </div>
              </div>

              <div className="card-body">
                <p>
                  <strong>Project:</strong> {progress.project?.name || "N/A"}
                </p>
                <p>
                  <strong>Review:</strong> {progress.review}
                </p>
                <p>
                  <strong>Remarks:</strong> {progress.remarks}
                </p>

                <ul className="list-group mb-3">
                  <li className="list-group-item">
                    <strong>Expected Completion:</strong> {progress.expected_completion_date}
                  </li>
                  <li className="list-group-item">
                    <strong>Actual Completion:</strong>{" "}
                    {progress.actual_completion_date || "Pending"}
                  </li>
                  <li className="list-group-item">
                    <strong>Updated By:</strong> {progress.updated_by}
                  </li>
                </ul>

                <div className="d-flex justify-content-between">
                  <Link to={`/progresse/${progress.id}`} className="btn btn-sm btn-primary">
                    View
                  </Link>
                  <Link to={`/edit-progress/${progress.id}`} className="btn btn-sm btn-success">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProgress(progress.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProgressive;
