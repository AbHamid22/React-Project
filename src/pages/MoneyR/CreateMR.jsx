import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

const ImgBase = "http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img";
const base_url = "http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api";

const today = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function MoneyReceipt({ invoice_id: initialInvoiceId = "" }) {
  const [company, setCompany] = useState({});
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [invoiceId, setInvoiceId] = useState(initialInvoiceId);
  const [invoice, setInvoice] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState("select");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [form, setForm] = useState({
    property_id: "select",
    project_id: "",
    amount: 0,
    discount: 0,
  });
  const [cart, setCart] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [nextReceiptNo, setNextReceiptNo] = useState("Loading...");

  // Computed: selectedCustomer
  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === Number(selectedCustomerId)),
    [customers, selectedCustomerId]
  );

  // Computed: lineTotal for form inputs
  const lineTotal = useMemo(() => {
    const amt = Number(form.amount) || 0;
    const disc = Number(form.discount) || 0;
    return Math.max(0, amt - disc);
  }, [form.amount, form.discount]);

  // Computed totals from cart
  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.amount, 0), [cart]);
  const totalDiscount = useMemo(() => cart.reduce((sum, i) => sum + i.discount, 0), [cart]);
  const total = useMemo(() => subtotal - totalDiscount, [subtotal, totalDiscount]);

  const dueAmountText = useMemo(() => {
    const due = paidAmount - total;
    return due >= 0 ? `Extra Paid: ${due.toFixed(2)}` : Math.abs(due).toFixed(2);
  }, [paidAmount, total]);

  // Fetch initial data: company, customers, properties, nextReceiptNo
  useEffect(() => {
    async function fetchData() {
      try {
        const [companyRes, customersRes, propertiesRes, nextNoRes] = await Promise.all([
          fetch(`${base_url}/companys/1`),
          fetch(`${base_url}/customers`),
          fetch(`${base_url}/properties`),
          fetch(`${base_url}/moneyreceipts/next-no`),
        ]);
        const companyData = await companyRes.json();
        const customersData = await customersRes.json();
        const propertiesData = await propertiesRes.json();
        const nextNoData = await nextNoRes.json();

        setCompany(companyData);
        setCustomers(customersData.data);
        setProperties(propertiesData.data);
        setNextReceiptNo(nextNoData.next_receipt_no);
      } catch (error) {
        alert("Error loading initial data.");
      }
    }
    fetchData();
  }, []);

  // Load invoice and receipt details if invoiceId is set
  useEffect(() => {
    if (invoiceId) {
      loadReceipt();
    }
  }, [invoiceId]);

  async function loadReceipt() {
    try {
      const res = await fetch(`${base_url}/invoices/${invoiceId}`);
      if (!res.ok) throw new Error("Invoice not found");
      const data = await res.json();
      setInvoice(data.invoice || {});
      setSelectedCustomerId(data.invoice.customer_id?.toString() || "select");
      setPaymentMethod(data.invoice.payment_method || "Cash");
      setPaidAmount(parseFloat(data.invoice.paid_amount || 0));

      // Map items to cart format
      const newCart = (data.items || []).map((i) => ({
        id: Date.now() + Math.random(),
        desc: i.property?.title || "N/A",
        project: i.project?.name || "N/A",
        project_id: i.project_id,
        property_id: i.property_id,
        discount: parseFloat(i.discount),
        amount: parseFloat(i.amount),
        lineTotal: parseFloat(i.amount) - parseFloat(i.discount),
      }));
      setCart(newCart);
    } catch (err) {
      alert("Not Found This ID. Please check the invoice List.");
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleNumberInputChange(e) {
    const { name, value } = e.target;
    const numberValue = Number(value);
    setForm((prev) => ({ ...prev, [name]: numberValue }));
  }

  function addToCart() {
    const { property_id, project_id, amount, discount } = form;

    if (
      property_id === "select" ||
      !project_id.trim() ||
      amount <= 0 ||
      discount < 0 ||
      discount > amount
    ) {
      alert("Please fill out valid item details.");
      return;
    }

    const propertyTitle = properties.find((p) => p.id === Number(property_id))?.title || "N/A";

    setCart((prev) => [
      ...prev,
      {
        id: Date.now(),
        desc: propertyTitle,
        project: project_id,
        project_id,
        property_id,
        amount,
        discount,
        lineTotal: Math.max(0, amount - discount),
      },
    ]);

    setForm({ property_id: "select", project_id: "", amount: 0, discount: 0 });
  }

  function clearCart() {
    if (window.confirm("Are you sure to clear all items?")) setCart([]);
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateDueAmount(e) {
    setPaidAmount(Number(e.target.value));
  }

  async function createMoneyReceipt() {
    if (cart.length === 0) return alert("Please add at least one item");
    if (selectedCustomerId === "select") return alert("Please select a customer");
    if (!window.confirm("Are you sure you want to save this money receipt?")) return;



    const payload = {
      customer_id: Number(selectedCustomerId),
      payment_method: paymentMethod,
      receipt_date: today,
      total_amount: total,
      paid_amount: paidAmount,
      remark: "",  // can be empty string or null if your backend accepts
      discount: 0,
      vat: 0,
      items: cart.map(item => ({
        property_id: Number(item.property_id),
        project_id: item.project_id || null,
        amount: item.amount,
        discount: item.discount,
      })),
    };


    try {
      const res = await fetch(`${base_url}/moneyreceipts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Laravel validation errors:", data.errors || data);
        alert("Error: " + (data.message || "Failed to save receipt"));
        return;
      }
      alert("Money Receipt saved successfully!");
      setCart([]);
    } catch (e) {
      alert("Error creating receipt: " + e.message);
    }

  }

  function printReceipt() {
    window.print();
  }

  return (
    <div className="receipt-container">
      <div className="receipt-details">
        <Link to="/manage-mr" className="btn btn-success mb-3">
          <i className="fas fa-arrow-up"></i> See List of Money Receipts
        </Link>

        <div className="text-center mb-3">
          <img
            src={`${ImgBase}/${company.logo}`}
            alt={company.name}
            style={{ maxHeight: "80px" }}
          />
          <h4>{company.name}</h4>
          <h5>{company.area}</h5>
          <h6>{company.city}</h6>
          <p>{company.street_address}</p>
          <p>{company.website}</p>
          <p>
            Phone: {company.mobile} | Email: {company.email}
          </p>
          <h3>Money Receipt</h3>
        </div>

        <table>
          <tbody>
            <tr>
              <td colSpan={2} style={{ textAlign: "center", paddingBottom: "10px" }}>
                <form
                  className="d-inline-flex align-items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    loadReceipt();
                  }}
                >
                  <label htmlFor="invoice_id" className="form-label me-2 mb-0">
                    <strong>Invoice ID:</strong>
                  </label>
                  <input
                    type="text"
                    value={invoiceId}
                    onChange={(e) => setInvoiceId(e.target.value)}
                    id="invoice_id"
                    className="form-control form-control-sm me-2"
                    style={{ width: "80px" }}
                  />
                  <button type="button" className="btn btn-sm btn-primary" onClick={loadReceipt}>
                    Go
                  </button>
                </form>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Receipt No:</strong> {nextReceiptNo}
              </td>
              <td>
                <strong>Date:</strong> {today}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Invoice No:</strong> {invoice.id || "-"}
              </td>
              <td>
                <strong>Issue Date:</strong> {invoice.issue_date || "-"}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <strong>Due Date:</strong> {invoice.due_date || "-"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Received From:</strong>
                <h3>Customer</h3>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="form-control"
                >
                  <option value="select">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                {selectedCustomer && (
                  <div id="customer-info" style={{ marginTop: "10px" }}>
                    <strong>Type:</strong> {selectedCustomer.type || "N/A"}
                    <br />
                    <strong>Phone:</strong> {selectedCustomer.phone || "N/A"}
                    <br />
                    <strong>Email:</strong> {selectedCustomer.email || "N/A"}
                    <br />
                  </div>
                )}
              </td>
              <td>
                <strong>Payment Method:</strong>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-control"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Check">Check</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Project Name</th>
            <th>Amount</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th>
              <button onClick={clearCart} className="btn btn-sm btn-danger">
                Clear All
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select
                name="property_id"
                value={form.property_id}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="select">Select Property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.title}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                name="project_id"
                value={form.project_id}
                onChange={handleInputChange}
                className="form-control form-control-sm"
                placeholder="Project"
              />
            </td>
            <td>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleNumberInputChange}
                className="form-control form-control-sm"
                placeholder="Amount"
              />
            </td>
            <td>
              <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleNumberInputChange}
                className="form-control form-control-sm"
                placeholder="Discount"
              />
            </td>
            <td>{lineTotal.toFixed(2)}</td>
            <td>
              <button onClick={addToCart} className="btn btn-sm btn-primary">
                Add
              </button>
            </td>
          </tr>

          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.desc}</td>
              <td>{item.project}</td>
              <td>{item.amount.toFixed(2)}</td>
              <td>{item.discount.toFixed(2)}</td>
              <td>{item.lineTotal.toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(item.id)} className="btn-delete">
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        <table>
          <tbody>
            <tr>
              <td>Subtotal:</td>
              <td style={{ textAlign: "right" }}>
                <strong>{subtotal.toFixed(2)}</strong>
              </td>
            </tr>
            <tr>
              <td>Total Discount:</td>
              <td style={{ textAlign: "right" }}>
                <strong>{totalDiscount.toFixed(2)}</strong>
              </td>
            </tr>
            <tr>
              <td>Total:</td>
              <td style={{ textAlign: "right" }}>
                <strong>{total.toFixed(2)}</strong>
              </td>
            </tr>
            <tr>
              <td>Paid Amount:</td>
              <td>
                <input
                  type="number"
                  value={paidAmount}
                  onChange={updateDueAmount}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>Due Amount:</td>
              <td style={{ textAlign: "right" }}>
                <strong>{dueAmountText}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="footer">
        <div className="signature">
          <div className="signature-line">Authorized Signature</div>
        </div>
      </div>

      <div className="fixed-action-buttons">
        <button className="btn btn-success" onClick={printReceipt}>
          <i className="fa fa-print"></i> Print MR
        </button>
        <button className="btn btn-primary" onClick={createMoneyReceipt}>
          <i className="far fa-credit-card"></i> Save MR
        </button>
      </div>

      {/* Scoped styles (can be moved to a CSS module or external stylesheet) */}
      <style>{`
        .receipt-container {
          max-width: 1000px;
          margin: 20px auto;
          background: #fff;
          padding: 15px 30px 60px 30px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          color: #333;
          position: relative;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        .receipt-details table,
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        .receipt-details td,
        .items-table th,
        .items-table td {
          padding: 6px 8px;
          border: 1px solid #ddd;
        }
        .items-table th {
          background: #f9f9f9;
          text-align: left;
        }
        .total {
          width: 350px;
          margin-left: auto;
          margin-bottom: 20px;
        }
        .signature {
          text-align: center;
          margin-top: 50px;
        }
        .signature-line {
          border-top: 1px solid #000;
          width: 200px;
          margin: auto;
          padding-top: 5px;
          font-size: 13px;
        }
        .btn-delete {
          background: #e74c3c;
          color: #fff;
          border: none;
          padding: 4px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
        .text-center p {
          margin: 2px 0;
        }
        .form-control {
          font-size: 13px;
          height: 30px;
        }
        .form-control-sm {
          font-size: 13px;
          height: 28px;
        }
        .btn-success {
          font-size: 14px;
          padding: 6px 12px;
        }
        .btn-primary {
          font-size: 14px;
          padding: 6px 12px;
        }
        .fixed-action-buttons {
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          gap: 5px;
          justify-content: flex-end;
          align-items: flex-end;
        }
        .fixed-action-buttons button {
          padding: 10px 20px;
          font-size: 14px;
          border-radius: 5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        @media print {
          .fixed-action-buttons,
          .btn,
          .form-control,
          select,
          input {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
