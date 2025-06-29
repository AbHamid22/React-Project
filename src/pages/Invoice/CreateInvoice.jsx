// React component version of the Laravel Blade view
import React, { useEffect, useState } from "react";

const CreateInvoice = () => {
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    issue_date: new Date().toISOString().slice(0, 10),
    due_date: new Date().toISOString().slice(0, 10),
    remark: "",
    status: "Unpaid",
  });

  useEffect(() => {
    fetch("http://hamid.intelsofts.com/api/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));

    fetch("http://hamid.intelsofts.com/api/properties/available")
      .then(res => res.json())
      .then(data => setProperties(data));
  }, []);

  const handleAdd = () => {
    if (!selectedProperty || !selectedProperty.project_id || !selectedProperty.price) {
      alert("Please select valid property info.");
      return;
    }

    if (cart.find(item => item.property_id === selectedProperty.id)) {
      alert("Property already added.");
      return;
    }

    const item = {
      id: cart.length + 1,
      desc: selectedProperty.title,
      property_id: selectedProperty.id,
      project_id: selectedProperty.project_id,
      amount: parseFloat(selectedProperty.price),
      discount: 0,
      subtotal: parseFloat(selectedProperty.price),
    };

    setCart([...cart, item]);
  };

  const handleDelete = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleSubmit = async () => {
    if (!selectedCustomer || cart.length === 0) {
      alert("Customer and at least one property required.");
      return;
    }

    const invoiceData = {
      customer_id: selectedCustomer.id,
      ...form,
      total_amount: cart.reduce((acc, i) => acc + i.subtotal, 0),
      items: cart,
    };

    try {
      const res = await fetch("http://hamid.intelsofts.com/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Invoice created!");
        setCart([]);
      } else {
        alert("Failed to save invoice");
        console.error(result);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3 text-center">Create Invoice</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>Customer</label>
          <select className="form-select" onChange={e => {
            const id = e.target.value;
            setSelectedCustomer(customers.find(c => c.id == id));
          }}>
            <option value="">Select Customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="col-md-3">
          <label>Issue Date</label>
          <input type="date" className="form-control" value={form.issue_date} onChange={e => setForm({...form, issue_date: e.target.value})} />
        </div>

        <div className="col-md-3">
          <label>Due Date</label>
          <input type="date" className="form-control" value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})} />
        </div>

        <div className="col-md-2">
          <label>Status</label>
          <select className="form-select" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label>Remarks</label>
        <textarea className="form-control" value={form.remark} onChange={e => setForm({...form, remark: e.target.value})}></textarea>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Select Property</label>
          <select className="form-select" onChange={e => {
            const property = properties.find(p => p.id == e.target.value);
            setSelectedProperty(property);
          }}>
            <option value="">Available Properties</option>
            {properties.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </div>
        <div className="col-md-2 align-self-end">
          <button className="btn btn-success w-100" onClick={handleAdd}>Add</button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Property</th>
            <th>Project</th>
            <th>Amount</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.desc}</td>
              <td>{item.project_id}</td>
              <td>{item.amount}</td>
              <td>{item.discount}</td>
              <td>{item.subtotal}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end">
        <h5>Total: {cart.reduce((acc, i) => acc + i.subtotal, 0).toFixed(2)} BDT</h5>
        <button className="btn btn-primary me-2" onClick={handleSubmit}>Save Invoice</button>
      </div>
    </div>
  );
};

export default CreateInvoice;
