import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Chart from "chart.js/auto";

const API_URL = "http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/progresses";

const radius = 52;
const circumference = 2 * Math.PI * radius;

const ViewProgressive = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState({});
  const circleRef = useRef(null);

  const progressChartInstance = useRef(null);
  const timelineChartInstance = useRef(null);

  // Fetch progress data by ID
  const fetchProgress = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch progress");
      const data = await res.json();
      setProgress(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Draw charts (doughnut + line)
  const drawCharts = () => {
    const percent = parseFloat(progress.percent) || 0;

    // Destroy existing charts if any
    if (progressChartInstance.current) {
      progressChartInstance.current.destroy();
    }
    if (timelineChartInstance.current) {
      timelineChartInstance.current.destroy();
    }

    const ctx1 = document.getElementById("progressChart");
    if (ctx1) {
      progressChartInstance.current = new Chart(ctx1, {
        type: "doughnut",
        data: {
          labels: ["Completed", "Remaining"],
          datasets: [
            {
              data: [percent, 100 - percent],
              backgroundColor: ["#28a745", "#e9ecef"],
              borderWidth: 0,
              cutout: "70%",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
          },
        },
      });
    }

    const ctx2 = document.getElementById("timelineChart");
    if (ctx2) {
      timelineChartInstance.current = new Chart(ctx2, {
        type: "line",
        data: {
          labels: ["Start", "25%", "50%", "75%", "100%"],
          datasets: [
            {
              label: "Progress Plan",
              data: [0, 25, 50, 75, 100],
              borderColor: "#667eea",
              backgroundColor: "rgba(102,126,234,0.1)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Current",
              data: [
                0,
                Math.min(25, percent),
                Math.min(50, percent),
                Math.min(75, percent),
                percent,
              ],
              borderColor: "#28a745",
              backgroundColor: "rgba(40,167,69,0.1)",
              fill: false,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => `${value}%`,
              },
            },
          },
        },
      });
    }
  };

  // Update SVG progress ring when progress.percent changes
  useEffect(() => {
    if (!circleRef.current || progress.percent === undefined) return;

    const percent = parseFloat(progress.percent);
    const offset = circumference - (percent / 100) * circumference;
    circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
    circleRef.current.style.strokeDashoffset = offset;
  }, [progress.percent]);

  // Fetch data on mount and redraw charts on progress update
  useEffect(() => {
    fetchProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (progress.percent !== undefined) drawCharts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // Date formatting helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Metric cards array (memoized)
  const metricCards = useMemo(
    () => [
      {
        label: "Completion Rate",
        value: `${progress.percent ?? "0"}%`,
        icon: "fas fa-percentage",
        className: "",
      },
      {
        label: "Current Status",
        value: progress.status?.name ?? "N/A",
        icon: "fas fa-flag",
        className: "success",
      },
      {
        label: "Expected Completion",
        value: progress.expected_completion_date ?? "N/A",
        icon: "fas fa-calendar",
        className: "warning",
      },
      {
        label: "Last Updated",
        value: formatDate(progress.updated_at),
        icon: "fas fa-clock",
        className: "info",
      },
    ],
    [progress]
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">
          <i className="fas fa-chart-line text-primary me-2"></i>Progress Analytics
        </h1>
        <Link className="btn btn-success" to="/all-progress">
          <i className="fas fa-arrow-left"></i> Back to Progress List
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="row mb-4">
        {metricCards.map((card, index) => (
          <div key={index} className="col-md-3">
            <div className={`metric-card ${card.className}`}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-0">{card.value}</h3>
                  <small>{card.label}</small>
                </div>
                <i className={`fa-2x opacity-75 ${card.icon}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        {/* Left side charts */}
        <div className="col-lg-8">
          <div className="chart-card">
            <h5 className="chart-title">
              <i className="fas fa-chart-pie me-2 text-primary"></i>Progress Overview
            </h5>
            <div className="chart-container">
              <canvas id="progressChart"></canvas>
            </div>
          </div>

          <div className="chart-card">
            <h5 className="chart-title">
              <i className="fas fa-chart-line me-2 text-success"></i>Progress Timeline
            </h5>
            <div className="chart-container">
              <canvas id="timelineChart"></canvas>
            </div>
          </div>
        </div>

        {/* Right side project details */}
        <div className="col-lg-4">
          <div className="chart-card">
            <h5 className="chart-title">
              <i className="fas fa-info-circle me-2 text-info"></i>Project Details
            </h5>
            <div className="mb-3">
              <strong>Module:</strong> {progress.module?.name ?? "N/A"}
            </div>
            <div className="mb-3">
              <strong>Project:</strong> {progress.project?.name ?? progress.project_id}
            </div>
            <div className="mb-3">
              <strong>Status:</strong>{" "}
              <span
                className={`status-badge status-${
                  (progress.status?.name?.toLowerCase() || "pending").replace(/\s/g, "-")
                }`}
              >
                {progress.status?.name ?? "N/A"}
              </span>
            </div>
            <div className="mb-3">
              <strong>Updated By:</strong> {progress.updated_by}
            </div>
            <div className="mb-3">
              <strong>Review:</strong> {progress.review}
            </div>
            <div className="mb-3">
              <strong>Remarks:</strong> {progress.remarks}
            </div>
          </div>

          <div className="chart-card">
            <h5 className="chart-title">
              <i className="fas fa-history me-2 text-warning"></i>Project Timeline
            </h5>
            <div className="timeline">
              <div className="timeline-item completed">
                <strong>Project Started</strong>
                <br />
                <small className="text-muted">{formatDate(progress.project?.start_date)}</small>
              </div>
              <div
                className={`timeline-item ${
                  progress.percent >= 50 ? "completed" : "pending"
                }`}
              >
                <strong>50% Milestone</strong>
                <br />
                <small className="text-muted">
                  {progress.percent >= 50 ? "Completed" : "Pending"}
                </small>
              </div>
              <div
                className={`timeline-item ${
                  progress.percent >= 75 ? "completed" : "pending"
                }`}
              >
                <strong>75% Milestone</strong>
                <br />
                <small className="text-muted">
                  {progress.percent >= 75 ? "Completed" : "Pending"}
                </small>
              </div>
              <div
                className={`timeline-item ${
                  progress.percent === 100 ? "completed" : "pending"
                }`}
              >
                <strong>Project Completion</strong>
                <br />
                <small className="text-muted">
                  {progress.percent === 100
                    ? "Completed"
                    : `Expected: ${progress.expected_completion_date}`}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Ring and Bar */}
      <div className="chart-card mt-4">
        <h5 className="chart-title">
          <i className="fas fa-tasks me-2 text-primary"></i>Current Progress
        </h5>
        <div className="row align-items-center">
          <div className="col-md-8">
            <div
              className="progress"
              style={{ height: 40, borderRadius: 20 }}
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progress.percent}
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                style={{ width: `${progress.percent ?? 0}%`, borderRadius: 20 }}
              >
                <strong>{progress.percent ?? 0}% Complete</strong>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="d-flex justify-content-center align-items-center position-relative">
              <svg className="progress-ring" width="120" height="120">
                <circle
                  className="progress-ring-circle-bg"
                  stroke="#e9ecef"
                  strokeWidth="8"
                  fill="transparent"
                  r={radius}
                  cx="60"
                  cy="60"
                />
                <circle
                  ref={circleRef}
                  className="progress-ring-circle"
                  stroke="#28a745"
                  strokeWidth="8"
                  fill="transparent"
                  r={radius}
                  cx="60"
                  cy="60"
                  style={{
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset: circumference,
                    transition: "stroke-dashoffset 0.6s",
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                />
              </svg>
              <div
                className="position-absolute d-flex align-items-center justify-content-center"
                style={{ width: 120, height: 120 }}
              >
                <div className="text-center">
                  <h4 className="mb-0">{progress.percent ?? 0}%</h4>
                  <small className="text-muted">Complete</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProgressive;
