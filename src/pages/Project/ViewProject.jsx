import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ViewProject() {
  const { id } = useParams(); // get project id from URL param
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projects/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch project");
        }

        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p>Loading project details...</p>;

  if (error) return <p className="text-danger">Error: {error}</p>;

  if (!project) return <p>Project not found.</p>;

  return (
    <div className="container my-4">
      <h2>Project Details</h2>

      <div className="card mb-3" style={{ maxWidth: "720px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={project.photo
                ? `http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/projects/${project.photo}`
                : "/img/placeholder.png"
              }
              alt={project.name}
              className="img-fluid rounded-start"
              style={{ objectFit: "cover", height: "100%" }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{project.name}</h5>

              <p className="card-text">
                <strong>Type:</strong> {project.type?.name || "N/A"}
              </p>

              <p className="card-text">
                <strong>Status:</strong> {project.status?.name || "N/A"}
              </p>

              <p className="card-text">
                <strong>Contractor:</strong> {project.contractor?.name || "N/A"}
              </p>

              <p className="card-text">
                <strong>Start Date:</strong> {project.start_date || "N/A"}
              </p>

              <p className="card-text">
                <strong>End Date:</strong> {project.end_date || "N/A"}
              </p>

              {/* Add more fields if needed */}
            </div>
          </div>
        </div>
      </div>

      <Link to="/all-project" className="btn btn-secondary">
        &laquo; Back to Projects
      </Link>
    </div>
  );
}

export default ViewProject;
