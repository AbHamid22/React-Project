import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const API = 'http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api';

const CreateInvoice = () => {
  const [properties, setProperties] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [company, setCompany] = useState(null);
  const [cart, setCart] = useState([]);
  const [maxInvoiceId, setMaxInvoiceId] = useState(0);

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const [dueDate, setDueDate] = useState(new Date().toISOString().substr(0, 10));
  const [remark, setRemark] = useState('');
  const [status, setStatus] = useState('Unpaid');

  const [form, setForm] = useState({ property_id: '', project_id: '', amount: 0, discount: 0 });

  const today = new Date().toLocaleDateString();

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.subtotal, 0), [cart]);
  const netTotal = subtotal;

  const availableProperties = useMemo(() =>
    properties.filter(p => !cart.find(c => c.property_id === p.id)), [properties, cart]);

  const isInCart = (id) => cart.some(i => i.property_id === id);

  useEffect(() => {
    const fetchData = async () => {
      const [res1, res2, res3] = await Promise.all([
        fetch(`${API}/properties`).then(r => r.json()),
        fetch(`${API}/customers`).then(r => r.json()),
        fetch(`${API}/companys/1`).then(r => r.json()),
      ]);
      setProperties(res1.data);
      setCustomers(res2.data);
      setCompany(res3);

      const invoiceRes = await fetch(`${API}/invoices`).then(r => r.json());
      const invoiceIds = invoiceRes.data?.map(i => i.id) || [];
      setMaxInvoiceId(invoiceIds.length ? Math.max(...invoiceIds) : 0);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selected = properties.find(p => p.id === form.property_id);
    if (selected) {
      setForm(prevForm => ({
        ...prevForm,
        project_id: selected.project_id || '',
        amount: selected.price || 0
      }));
    }
  }, [form.property_id, properties]);

  useEffect(() => {
    const selected = customers.find(c => c.id == selectedCustomerId);
    setSelectedCustomer(selected);
  }, [selectedCustomerId]);

  const addToCart = () => {
    if (!form.property_id || !form.project_id || !form.amount) {
      alert('Fill all fields');
      return;
    }
    if (isInCart(form.property_id)) {
      alert('Property already added');
      return;
    }
    const desc = properties.find(p => p.id === form.property_id)?.title || '';
    setCart([...cart, {
      id: Date.now(),
      desc,
      property_id: form.property_id,
      project_id: form.project_id,
      amount: form.amount,
      discount: form.discount,
      subtotal: form.amount - form.discount
    }]);
    setForm({ property_id: '', project_id: '', amount: 0, discount: 0 });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearAll = () => setCart([]);

  const saveInvoice = async () => {
    if (!selectedCustomerId || !cart.length) {
      alert('Select customer and add at least one item');
      return;
    }
    const payload = {
      customer_id: selectedCustomerId,
      issue_date: issueDate,
      due_date: dueDate,
      total_amount: netTotal,
      remark,
      status,
      items: cart
    };
    const res = await fetch(`${API}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Invoice Successfully saved');
      window.location.reload();
    } else {
      console.error(data);
      alert('Error saving invoice');
    }
  };

  const printInvoice = () => window.print();

  return (
    <div className="container py-4 invoice">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/manage-invoice" className="btn btn-sm btn-primary">
          <i className="bi bi-card-list"></i> All Invoice List
        </Link>
      </div>

      <div className="card-body">
        <h1 className="mb-4 text-center text-info fw-bold" style={{ fontSize: '3rem' }}>Invoice</h1>

        {company && (
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <img
                src={`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/${company.logo}`}
                width="80"
                alt="logo"
                className="mb-2"
              />
              <h4>{company.name}</h4>
              <p className="text-muted">
                {company.street_address}, {company.area}, {company.city}
              </p>
            </div>
            <div className="text-end">
              <p><strong>Invoice ID:</strong> {maxInvoiceId + 1}</p>
              <p><strong>Date:</strong> {today}</p>
            </div>
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Customer</label>
            <select className="form-control" value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
              <option value="">Select Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {selectedCustomer && (
              <div className="mt-2">
                <strong>Type:</strong> {selectedCustomer.type || 'N/A'}<br />
                <strong>Phone:</strong> {selectedCustomer.phone || 'N/A'}<br />
                <strong>Email:</strong> {selectedCustomer.email || 'N/A'}
              </div>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Issue Date</label>
            <input type="date" className="form-control" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Due Date</label>
            <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
        </div>

        {availableProperties.length > 0 ? (
          <div className="alert alert-info mb-3">
            <i className="fas fa-info-circle"></i> Only properties not yet invoiced are available.
          </div>
        ) : (
          <div className="alert alert-warning mb-3">
            <i className="fas fa-exclamation-triangle"></i> No available properties.
          </div>
        )}

        <div className="table-responsive mb-3">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>Project ID</th>
                <th>Amount</th>
                <th>Discount</th>
                <th>Subtotal</th>
                <th><button className="btn btn-sm btn-danger" onClick={clearAll}>Clear All</button></th>
              </tr>
              <tr>
                <td></td>
                <td>
                  <select
                    className="form-control form-control-sm"
                    value={form.property_id}
                    onChange={(e) => setForm({ ...form, property_id: parseInt(e.target.value) })}>
                    <option value="">Available Properties</option>
                    {availableProperties.map(prop => (
                      <option key={prop.id} value={prop.id} disabled={isInCart(prop.id)}>{prop.title}</option>
                    ))}
                  </select>
                </td>
                <td><input className="form-control form-control-sm" value={form.project_id} onChange={(e) => setForm({ ...form, project_id: e.target.value })} /></td>
                <td><input type="number" className="form-control form-control-sm" value={form.amount} onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })} /></td>
                <td><input type="number" className="form-control form-control-sm" value={form.discount} onChange={(e) => setForm({ ...form, discount: parseFloat(e.target.value) || 0 })} /></td>
                <td></td>
                <td><button className="btn btn-sm btn-success" onClick={addToCart}>Add</button></td>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.desc}</td>
                  <td>{item.project_id}</td>
                  <td>{item.amount}</td>
                  <td>{item.discount}</td>
                  <td>{item.subtotal.toFixed(2)}</td>
                  <td><button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Del</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Remarks</label>
            <textarea className="form-control" value={remark} onChange={(e) => setRemark(e.target.value)} rows="4" placeholder="Write any notes..."></textarea>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Payment Status</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Unpaid</option>
              <option>Paid</option>
              <option>Partial</option>
            </select>
          </div>
          <div className="col-md-3">
            <div className="border rounded shadow-sm p-3 bg-light">
              <table className="table table-borderless m-0">
                <tbody>
                  <tr>
                    <th>Subtotal:</th>
                    <td className="text-end">{subtotal.toFixed(2)}</td>
                  </tr>
                  <tr className="border-top">
                    <th>Total:</th>
                    <td className="text-end fw-bold text-success">{netTotal.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button className="btn btn-success me-2" onClick={printInvoice}>
            <i className="fa fa-print"></i> Print
          </button>
          <button className="btn btn-primary me-3" onClick={saveInvoice}>
            <i className="far fa-credit-card"></i> Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
