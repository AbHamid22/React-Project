import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageInvoice = () => {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const res = await fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/invoices');
      if (!res.ok) {
        console.error(`Failed to fetch invoices. Status: ${res.status} ${res.statusText}`);
        return;
      }
      const result = await res.json();
      setInvoices(result.data);
    } catch (error) {
      console.error('Failed to fetch invoices', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;
    try {
      const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/invoices/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
          'Accept': 'application/json',
        },
      });
      if (res.ok) {
        alert('Invoice deleted successfully');
        fetchInvoices(); // refresh list
      } else {
        alert('Failed to delete invoice');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Manage Invoices</h3>
        <Link to="/create-invoice" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> New Invoice
        </Link>
      </div>

      <div className="row g-4">
        {invoices.length === 0 && (
          <p className="text-center">No invoices found.</p>
        )}
        {invoices.map((invoice) => (
          <div key={invoice.id} className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-2">Invoice #{invoice.id}</h5>
                <ul className="list-unstyled small text-muted mb-3">
                  <li>
                    <strong className="text-dark mb-1">Customer:</strong>{' '}
                    {invoice.customer?.name || `ID ${invoice.customer_id}`}
                  </li>
                  <li>
                    <strong className="text-dark mb-1">Total:</strong> TK {Number(invoice.total_amount).toFixed(2)}
                  </li>
                  <li>
                    <strong className="text-dark mb-1">Status:</strong>{' '}
                    <span className={`badge bg-${invoice.status === 'Paid' ? 'success' : invoice.status === 'Unpaid' ? 'warning' : 'secondary'}`}>
                      {invoice.status ? invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) : 'N/A'}
                    </span>
                  </li>
                  <li>
                    <strong className="text-dark mb-1">Issue Date:</strong> {formatDate(invoice.issue_date)}
                  </li>
                  <li>
                    <strong className="text-dark mb-1">Due Date:</strong> {formatDate(invoice.due_date)}
                  </li>
                </ul>
              </div>

              <div className="card-footer bg-light border-0 d-flex justify-content-between">
                <Link to={`/invoices/${invoice.id}`} className="btn btn-info btn-sm rounded-pill">
                  <i className="bi bi-eye"></i> View
                </Link>
                {/* <Link to={`/invoices/edit/${invoice.id}`} className="btn btn-success btn-sm rounded-pill">
                  <i className="bi bi-pencil"></i> Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm rounded-pill"
                  onClick={() => handleDelete(invoice.id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: You can add pagination controls here later */}
    </div>
  );
};

export default ManageInvoice;
