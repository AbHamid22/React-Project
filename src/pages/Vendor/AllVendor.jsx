import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllVendor = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/vendors')
            .then(response => response.json())
            .then(data => {
                setVendors(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching vendors:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vendor?')) {
            try {
                const response = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/vendors/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                });

                if (response.ok) {
                    setVendors(prev => prev.filter(vendor => vendor.id !== id));
                } else {
                    alert('Failed to delete the vendor.');
                }
            } catch (err) {
                console.error('Delete error:', err);
            }
        }
    };

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Vendor List</h4>
                <Link className="btn btn-primary" to="/vendors/create">New Vendor</Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-body table-responsive">
                    <table className="table table-hover text-nowrap">
                        <thead className="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" className="text-center text-muted">Loading...</td></tr>
                            ) : vendors.length > 0 ? (
                                vendors.map(vendor => (
                                    <tr key={vendor.id}>
                                        <td>{vendor.id}</td>
                                        <td>
                                            <img
                                                src={`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/${vendor.photo}`}
                                                alt={vendor.name}
                                                width="100"
                                            />
                                        </td>
                                        <td>{vendor.name}</td>
                                        <td>{vendor.mobile}</td>
                                        <td>{vendor.email}</td>
                                        <td>{vendor.address}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <Link className="btn btn-primary btn-sm" to={`/vendors/${vendor.id}`}>View</Link>
                                                <Link className="btn btn-success btn-sm" to={`/vendors/${vendor.id}/edit`}>Edit</Link>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(vendor.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="7" className="text-center text-muted">No vendors found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllVendor;
