import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = 'http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/moneyreceipts';

const ManageMR = () => {
  const [moneyReceipts, setMoneyReceipts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchReceipts = async (page = 1) => {
    try {
      const res = await fetch(`${API}?page=${page}`);
      if (!res.ok) {
        console.error('Failed to fetch receipts', res.status);
        return;
      }
      const data = await res.json();
      setMoneyReceipts(data.data || []);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this receipt?')) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        alert('Receipt deleted successfully.');
        fetchReceipts(currentPage);
      } else {
        alert('Failed to delete receipt.');
      }
    } catch (error) {
      alert('Network error');
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderPagination = () => (
    <div className="d-flex justify-content-center mt-4">
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <button className="page-link" onClick={() => fetchReceipts(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(lastPage)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
              <button className="page-link" onClick={() => fetchReceipts(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === lastPage && 'disabled'}`}>
            <button className="page-link" onClick={() => fetchReceipts(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">MoneyReceipt History</h3>
        <Link to="/create-mr" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Create New MR
        </Link>
      </div>

      <div className="row g-4">
        {moneyReceipts.length === 0 && (
          <p className="text-center">No receipts found.</p>
        )}
        {moneyReceipts.map((receipt) => (
          <div key={receipt.id} className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-2">Receipt #{receipt.id}</h5>
                <ul className="list-unstyled small text-muted mb-3">
                  <li><strong className="text-dark">Customer:</strong> {receipt.customer?.name || 'N/A'}</li>
                  <li><strong className="text-dark">Email:</strong> {receipt.customer?.email || 'N/A'}</li>
                  <li><strong className="text-dark">Phone:</strong> {receipt.customer?.phone || 'N/A'}</li>
                  <li><strong className="text-dark">Remark:</strong> {receipt.remark || 'N/A'}</li>
                  <li><strong className="text-dark">Total:</strong> TK {parseFloat(receipt.total_amount).toLocaleString()}</li>
                  <li><strong className="text-dark">Discount:</strong> TK {parseFloat(receipt.discount || 0).toFixed(2)}</li>
                  <li><strong className="text-dark">VAT:</strong> TK {parseFloat(receipt.vat || 0).toFixed(2)}</li>
                  <li><strong className="text-dark">Paid:</strong> TK {parseFloat(receipt.paid_amount || 0).toLocaleString()}</li>
                  <li><strong className="text-dark">Method:</strong> {receipt.payment_method || 'N/A'}</li>
                  <li><strong className="text-dark">Created:</strong> {formatDate(receipt.created_at)}</li>
                </ul>
              </div>
              <div className="card-footer bg-light border-0 d-flex justify-content-between">
                <Link to={`/moneyreceipts/${receipt.id}`} className="btn btn-info btn-sm rounded-pill">
                  <i className="bi bi-eye"></i> View
                </Link>
                {/* <Link to={`/moneyreceipts/${receipt.id}/edit`} className="btn btn-success btn-sm rounded-pill">
                  <i className="bi bi-pencil"></i> Edit
                </Link> */}
                {/* <button
                  className="btn btn-danger btn-sm rounded-pill"
                  onClick={() => handleDelete(receipt.id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {lastPage > 1 && renderPagination()}
    </div>
  );
};

export default ManageMR;
