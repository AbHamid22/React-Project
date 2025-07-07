import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewMR = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to format currency safely
  const formatCurrency = (num) =>
    Number(num ?? 0).toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Helper to format date safely
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await fetch(
          `http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/moneyreceipts/${id}`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setReceipt(data);
        setCustomer(data.customer);
        setCompany(data.company);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // fallback empty objects to avoid crashes
  const safeReceipt = receipt || {};
  const safeCustomer = customer || {};
  const safeCompany = company || {};

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
        .details-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          border: 1px solid #ddd;
        }
        .summary-table th {
          background: #f5f5f5;
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
        .text-end { text-align: right; }
        .fw-bold { font-weight: 700; }
        .text-muted { color: #6c757d; }
        .text-uppercase { text-transform: uppercase; }
        .text-center { text-align: center; }
      `}</style>

      <div className="text-end no-print mb-3">
        <button className="btn btn-sm btn-primary" onClick={() => window.print()}>
          <i className="fas fa-print me-1"></i> Print Receipt
        </button>
      </div>

      <div className="invoice-box">
        <div className="invoice-header">
          <div>
            <img
              src="http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/assets/images/hami-logo.png"
              alt="Company Logo"
            />
          </div>
          <div className="company-details">
            <h4 className="fw-bold mb-0">{safeCompany.name || "N/A"}</h4>
            <p className="mb-0">
              {safeCompany.street_address || ""}, {safeCompany.area || ""}, {safeCompany.city || ""}
            </p>
          </div>
        </div>

        <div className="details-row">
          <div style={{ maxWidth: "48%" }}>
            <h6 className="text-uppercase text-muted fw-semibold">Customer</h6>
            <p className="mb-1 fw-semibold">{safeCustomer.name || "N/A"}</p>
            <p className="mb-1">
              📧 <a href={`mailto:${safeCustomer.email || ""}`}>{safeCustomer.email || "N/A"}</a>
            </p>
            <p>
              📞 <a href={`tel:+880${safeCustomer.phone || ""}`}>+880 {safeCustomer.phone || "N/A"}</a>
            </p>
            <strong>Photo:</strong>
            <div style={{ marginTop: 8 }}>
              {safeCustomer.photo ? (
                <img
                  src={`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/customers/${safeCustomer.photo}`}
                  alt="Customer"
                  width={80}
                  style={{ border: "1px solid #ccc", borderRadius: 4 }}
                />
              ) : (
                "No Photo"
              )}
            </div>
          </div>

          <div style={{ maxWidth: "48%", textAlign: "right" }}>
            <table style={{ border: "none" }}>
              <tbody>
                <tr>
                  <th style={{ paddingRight: 15, textAlign: "left" }}>Receipt #</th>
                  <td>{safeReceipt.id || "N/A"}</td>
                </tr>
                <tr>
                  <th style={{ paddingRight: 15, textAlign: "left" }}>Date</th>
                  <td>{safeReceipt.created_at ? formatDate(safeReceipt.created_at) : "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h6 className="text-uppercase text-center fw-bold mb-3">Money Receipt Summary</h6>

        <table className="summary-table">
          <tbody>
            <tr>
              <th>Total Amount</th>
              <td className="text-end">TK {formatCurrency(safeReceipt.total_amount)}</td>
            </tr>
            <tr>
              <th>Discount</th>
              <td className="text-end text-danger">-TK {formatCurrency(safeReceipt.discount)}</td>
            </tr>
            <tr>
              <th>VAT</th>
              <td className="text-end">TK {formatCurrency(safeReceipt.vat)}</td>
            </tr>
            <tr>
              <th className="fw-bold">Paid</th>
              <td className="text-end fw-bold text-success" style={{ fontSize: "1.2rem" }}>
                TK {formatCurrency(safeReceipt.paid_amount)}
              </td>
            </tr>
            <tr>
              <th>Payment Method</th>
              <td className="text-end">{safeReceipt.payment_method || "N/A"}</td>
            </tr>
            <tr>
              <th>Remark</th>
              <td className="text-end">{safeReceipt.remark || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewMR;
