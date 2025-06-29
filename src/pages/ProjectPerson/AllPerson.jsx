import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllPerson = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projectpersons')
            .then(res => res.json())
            .then(data => {
                setAssignments(data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading project assignments:', err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this assignment?")) return;

        try {
            const response = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projectpersons/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });

            if (response.ok) {
                setAssignments(prev => prev.filter(p => p.id !== id));
            } else {
                alert('Failed to delete assignment.');
            }
        } catch (err) {
            console.error('Error deleting assignment:', err);
        }
    };

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Project Assignments</h4>
                <Link to="/projectpersons/create" className="btn btn-primary">
                    <i className="fa fa-plus"></i> New Assignment
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle text-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#ID</th>
                                    <th>Project</th>
                                    <th>Site Supervisor</th>
                                    <th>Assigned On</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="7" className="text-center text-muted">Loading...</td></tr>
                                ) : assignments.length > 0 ? (
                                    assignments.map((assignment) => (
                                        <tr key={assignment.id}>
                                            <td>{assignment.id}</td>
                                            <td>{assignment.project?.name || 'N/A'}</td>
                                            <td>{assignment.person?.name || 'N/A'}</td>
                                            <td>{assignment.assign_at}</td>
                                            <td>{formatDate(assignment.created_at)}</td>
                                            <td>{formatDate(assignment.updated_at)}</td>
                                            <td className="text-center">
                                                <div className="btn-group">
                                                    <Link to={`/projectpersons/${assignment.id}`} className="btn btn-sm btn-outline-primary" title="View">
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                    <Link to={`/projectpersons/${assignment.id}/edit`} className="btn btn-sm btn-outline-success" title="Edit">
                                                        <i className="fa fa-edit"></i>
                                                    </Link>
                                                    <button onClick={() => handleDelete(assignment.id)} className="btn btn-sm btn-outline-danger" title="Delete">
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="7" className="text-center text-muted">No project assignments found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>
                {`
                .table thead th {
                    background-color: #f8f9fa;
                    text-transform: uppercase;
                    font-size: 13px;
                }
                .table td, .table th {
                    vertical-align: middle;
                }
                `}
            </style>
        </div>
    );
};

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
};

export default AllPerson;
