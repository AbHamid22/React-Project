import React, { useState, useEffect } from "react";

const ViewInvoice = ({ invoice, customer, company, items }) => {
  if (!invoice || !customer || !company) return <p>Loading...</p>;

  let subtotal = 0;
  let totalDiscount = 0;

  const formatCurrency = (num) =>
    Number(num).toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .invoice-box {
          max-width: 900px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          background: #fff;
          box-shadow: 0 0 10px rgba(0,0,0,.15);
          font-size: 14px;
        }
        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .invoice-header img {
          max-height: 60px;
        }
        .invoice-header .company-details {
          text-align: right;
        }
        .invoice-details,
        .customer-details {
          margin-bottom: 30px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        thead th {
          background-color: #198754;
          color: white;
          font-weight: 600;
          padding: 8px;
          border: 1px solid #ddd;
        }
        tbody td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .summary-table td,
        .summary-table th {
          padding: 8px;
          border: 1px solid #ddd;
        }
        @media print {
          .no-print {
            display: none;
          }
          .invoice-box {
            box-shadow: none;
            border: none;
          }
        }
        .text-end {
          text-align: right;
        }
        .fw-bold {
          font-weight: 700;
        }
        .text-muted {
          color: #6c757d;
        }
        .text-uppercase {
          text-transform: uppercase;
        }
        .text-center {
          text-align: center;
        }
      `}</style>

      <div className="text-end no-print mb-3">
        <button className="btn btn-sm btn-primary" onClick={() => window.print()}>
          <i className="fas fa-print me-1"></i> Print Invoice
        </button>
      </div>

      <div className="invoice-box">
        <div className="invoice-header">
          <div>
            <img src="/assets/images/hami-logo.png" alt="Company Logo" />
          </div>
          <div className="company-details">
            <h4 className="fw-bold mb-0">{company.name}</h4>
            <p className="mb-0">
              {company.street_address}, {company.area}, {company.city}
            </p>
          </div>
        </div>

        <div
          className="row invoice-details"
          style={{ display: "flex", justifyContent: "space-between", marginBottom: 30 }}
        >
          <div className="customer-details" style={{ maxWidth: "48%" }}>
            <h6 className="text-uppercase text-muted fw-semibold">Customer</h6>
            <p className="mb-1 fw-semibold">{customer.name}</p>
            <p className="mb-1">
              📧{" "}
              <a href={`mailto:${customer.email}`}>
                {customer.email}
              </a>
            </p>
            <p>
              📞{" "}
              <a href={`tel:+880${customer.phone}`}>
                +880 {customer.phone}
              </a>
            </p>

            <strong>Photo:</strong>
            <div style={{ marginTop: 8 }}>
              {customer.photo ? (
                <img
                  src={`/img/customers/${customer.photo}`}
                  alt="Customer Photo"
                  width={80}
                  style={{ border: "1px solid #ccc", borderRadius: 4 }}
                />
              ) : (
                "No Photo"
              )}
            </div>
          </div>

          <div className="text-md-end" style={{ maxWidth: "48%", textAlign: "right" }}>
            <table style={{ border: "none" }}>
              <tbody>
                <tr>
                  <th style={{ paddingRight: 15, textAlign: "left" }}>Invoice #</th>
                  <td>{invoice.id}</td>
                </tr>
                <tr>
                  <th style={{ paddingRight: 15, textAlign: "left" }}>Date</th>
                  <td>{formatDate(invoice.created_at)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h6 className="text-uppercase text-center fw-bold mb-3">Property Details</h6>

        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Property</th>
              <th className="text-end">Project Name</th>
              <th className="text-end">Amount</th>
              <th className="text-end">Discount</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
                  No Property Found
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const propertyName = item.property?.title || "Property not found!";
                const projectName = item.project?.name || "N/A";
                const amount = Number(item.amount || 0);
                const discount = Number(item.discount || 0);
                subtotal += amount;
                totalDiscount += discount;

                return (
                  <tr key={item.id || index}>
                    <td>{index + 1}</td>
                    <td>{propertyName}</td>
                    <td className="text-end">{projectName}</td>
                    <td className="text-end">{formatCurrency(amount)}</td>
                    <td className="text-end">{formatCurrency(discount)}</td>
                    <td className="text-end">{formatCurrency(amount - discount)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="row mt-4" style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "40%" }}>
            <table className="summary-table">
              <tbody>
                <tr>
                  <th>Subtotal</th>
                  <td className="text-end">{formatCurrency(subtotal)} BDT</td>
                </tr>
                <tr>
                  <th>Total Discount</th>
                  <td className="text-end" style={{ color: "red" }}>
                    -{formatCurrency(totalDiscount)} BDT
                  </td>
                </tr>
                <tr>
                  <th className="fw-bold">Total</th>
                  <td className="fw-bold text-end">{formatCurrency(subtotal - totalDiscount)} BDT</td>
                </tr>
                <tr>
                  <th className="text-success fw-bold">To Be Paid</th>
                  <td
                    className="fw-bold text-success text-end"
                    style={{ fontSize: "1.25rem" }}
                  >
                    {formatCurrency(subtotal - totalDiscount)} BDT
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 no-print">
        <a href="/moneyreceipts/create" className="btn btn-success">
          <i className="bi bi-plus-circle"></i> Create Money Receipt
        </a>
      </div>
    </>
  );
};

const InvoiceContainer = ({ invoiceId }) => {
  const [invoice, setInvoice] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [company, setCompany] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInvoiceData() {
      try {
        const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/invoices/2`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        // Adapt this if your API structure differs
        setInvoice(data || data);
        setCustomer(data.data || (data.invoice && data.invoice.customer) || null);
        setCompany(data.company || { name: "My Company", street_address: "", area: "", city: "" }); // fallback
        setItems(data.items || (data.invoice && data.invoice.items) || []);

        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching data");
        setLoading(false);
      }
    }
    fetchInvoiceData();
  }, [invoiceId]);

  if (loading) return <p>Loading invoice data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return <ViewInvoice invoice={invoice} customer={customer} company={company} items={items} />;
};

export default InvoiceContainer;
