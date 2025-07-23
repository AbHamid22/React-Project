import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const formatCurrency = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? "0.00" : num.toLocaleString("en-BD", { minimumFractionDigits: 2 });
};

const formatDate = (dt) => {
  if (!dt) return "N/A";
  const date = new Date(dt);
  return date.toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" });
};

const ViewCosting = () => {
  const { id } = useParams();
  const [projectCosting, setProjectCosting] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectCosting = async () => {
      try {
        const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projectcostings/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project costing data");
        const data = await res.json();
        setProjectCosting(data);
      } catch (err) {
        setError("Unable to load project costing. Please try again later.");
        console.error(err);
      }
    };
    fetchProjectCosting();
  }, [id]);

  const budgetDifference = useMemo(() => {
    const b = parseFloat(projectCosting?.budget);
    const a = parseFloat(projectCosting?.actual_cost);
    return isNaN(b - a) ? 0 : b - a;
  }, [projectCosting]);

  const projectInfo = useMemo(() => {
    if (!projectCosting) return [];

    return [
      { label: "Project", value: projectCosting.project?.name || "N/A", icon: "bi-building" },
      { label: "Module", value: projectCosting.module?.name || "N/A", icon: "bi-puzzle-fill" },
      { label: "Days", value: projectCosting.days, icon: "bi-calendar-day" },
      { label: "Status", value: projectCosting.status, icon: "bi-info-circle-fill" },
      { label: "Remarks", value: projectCosting.remarks || "N/A", icon: "bi-chat-left-text-fill" },
      { label: "Created By", value: projectCosting.created_by, icon: "bi-person-check-fill" },
      { label: "Updated By", value: projectCosting.updated_by || "N/A", icon: "bi-person-fill-gear" },
      { label: "Created At", value: formatDate(projectCosting.created_at), icon: "bi-clock-fill" },
      { label: "Updated At", value: formatDate(projectCosting.updated_at), icon: "bi-clock-history" },
    ];
  }, [projectCosting]);

  return (
    <div className="container py-4">
      <Link to="/projectcostings" className="btn btn-success mb-3">
        Manage Project Costings
      </Link>

      {projectCosting && (
        <div
          className="card project-card shadow"
          style={{
            border: "none",
            borderRadius: "12px",
            background: "linear-gradient(to right, #f0f8ff, #e0f7fa)",
            maxWidth: "750px",
            margin: "0 auto 30px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            className="card-header text-white"
            style={{
              background: "linear-gradient(135deg, #007bff, #00c6ff)",
              borderRadius: "12px 12px 0 0",
              padding: "1rem 1.25rem",
            }}
          >
            <h4 className="mb-0">
              <i className="bi bi-kanban-fill me-2"></i>
              Project Costing Details (#{projectCosting.id})
            </h4>
          </div>
          <div className="card-body p-4">
            {projectInfo.map((item) => (
              <div
                key={item.label}
                className="row mb-3 align-items-center"
              >
                <div className="col-5 fw-semibold text-primary d-flex align-items-center">
                  <i className={`bi ${item.icon} me-2 fs-5`}></i> {item.label}:
                </div>
                <div className="col-7 text-dark fs-6">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {projectCosting && (
        <div
          className="card cost-summary-card"
          style={{
            maxWidth: "750px",
            margin: "0 auto 30px",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            background: "linear-gradient(to right, #fff7e6, #fff0cc)",
            border: "1px solid #f5d491",
          }}
        >
          <div
            className="card-header text-white"
            style={{
              background: "linear-gradient(135deg, #f6b93b, #feca57)",
              borderRadius: "10px 10px 0 0",
              padding: "1rem 1.25rem",
            }}
          >
            <h5 className="mb-0">Cost Summary</h5>
          </div>
          <div className="card-body p-3">
            <table className="table table-bordered mb-0">
              <tbody>
                <tr>
                  <th className="bg-light">Budget</th>
                  <td className="text-end">TK {formatCurrency(projectCosting.budget)}</td>
                </tr>
                <tr>
                  <th className="bg-light">Actual Cost</th>
                  <td className="text-end">TK {formatCurrency(projectCosting.actual_cost)}</td>
                </tr>
                <tr>
                  <th className="bg-light">Difference</th>
                  <td
                    className={
                      budgetDifference < 0 ? "text-danger text-end" : "text-success text-end"
                    }
                  >
                    TK {formatCurrency(budgetDifference)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3 text-center" style={{ maxWidth: "750px", margin: "0 auto" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default ViewCosting;
