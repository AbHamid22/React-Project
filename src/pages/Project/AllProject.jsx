import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function AllProject() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch projects");
            }

            // const data = await res.json();
            // setProjects(data.projects); 
            const json = await res.json();
            console.log(json);
            setProjects(json.data);
        } catch (err) {
            console.error("Error:", err.message);
        }
    };

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="mb-0">All Project List</h1>
                <a href="/create-project" className="btn btn-success">
                    <i className="fas fa-plus"></i> New Project
                </a>
            </div>

            {projects.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Contractor</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, index) => (
                                <tr key={project.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={project.photo ? `http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/projects/${project.photo}` : "/img/placeholder.png"}
                                            alt={project.name}
                                            className="project-img-thumb"
                                        />
                                    </td>
                                    <td>{project.name}</td>
                                    <td>
                                        {/* <span className="badge badge-info"> */}
                                        {project.type?.name || project.type_id}
                                        {/* </span> */}
                                    </td>
                                    <td>
                                        {/* <span className={`badge ${project.status?.name?.toLowerCase() === "completed"
                                                ? "badge-success"
                                                : "badge-warning"
                                            }`}> */}
                                        {project.status?.name || "N/A"}
                                        {/* </span> */}
                                    </td>
                                    <td>{project.start_date}</td>
                                    <td>{project.end_date}</td>
                                    <td>{project.contractor?.name || "N/A"}</td>
                                    <td>
                                        <div className="btn-group btn-group-sm" role="group">
                                            <Link to={`/projects/${project.id}`} className="btn btn-outline-primary" title="View">
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                            <Link to={`/projects/${project.id}/edit`} className="btn btn-outline-success" title="Edit">
                                                <i className="fas fa-edit"></i>
                                            </Link>

                                            <button
                                                className="btn btn-outline-danger"
                                                title="Delete"
                                                onClick={() => handleDelete(project.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-muted">Please Wait. Loading....</p>
            )}
        </div>
    );
}

const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
        try {
            await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projects/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.reload(); // Optional: refresh to update list
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }
};

export default AllProject;
