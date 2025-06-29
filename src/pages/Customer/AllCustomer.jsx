import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/customers')
            .then(response => response.json())
            .then(data => {
                setCustomers(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Customer List</h4>
                <Link className="btn btn-primary" to="/customers/create">
                    <i className="fa fa-plus-circle"></i> New Customer
                </Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Type</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">Loading...</td>
                                    </tr>
                                ) : customers.length > 0 ? (
                                    customers.map(customer => (
                                        <tr key={customer.id}>
                                            <td>{customer.id}</td>
                                            <td>
                                                <img
                                                    src={`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/customers/${customer.photo}`}
                                                    alt={customer.name}
                                                    className="customer-photo"
                                                />
                                            </td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone}</td>
                                            <td>
                                                <span className={`badge bg-${customer.type === 'corporate' ? 'info' : 'secondary'}`}>
                                                    {customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="btn-group" role="group">
                                                    <Link to={`/customers/${customer.id}`} className="btn btn-sm btn-outline-primary">
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                    <Link to={`/customers/${customer.id}/edit`} className="btn btn-sm btn-outline-success">
                                                        <i className="fa fa-edit"></i>
                                                    </Link>
                                                    {/* For delete, you can use a function with fetch or Axios */}
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(customer.id)}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No customers found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>
                {`
                .customer-photo {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 2px solid #ddd;
                }
                `}
            </style>
        </div>
    );

    function handleDelete(id) {
        if (window.confirm("Are you sure to delete this customer?")) {
            fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/customers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    // Add Authorization header if needed
                }
            })
                .then(response => {
                    if (response.ok) {
                        setCustomers(prev => prev.filter(c => c.id !== id));
                    } else {
                        alert('Failed to delete the customer.');
                    }
                });
        }
    }
};

export default AllCustomer;
