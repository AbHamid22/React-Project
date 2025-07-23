import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewMR = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatCurrency = (num) =>
    Number(num ?? 0).toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

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

  const receiptData = receipt.moneyreceipt || {};
  const customer = receipt.customer || {};
  const company = receipt.company || {};
  const items = receipt.items || [];

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
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
        .invoice-header img { max-height: 60px; }
        .company-details { text-align: right; }
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
        .summary-table th { background: #f5f5f5; }
        @media print {
          .no-print { display: none; }
          .invoice-box { box-shadow: none; border: none; }
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
        {/* Header */}
        <div className="invoice-header">
          <div>
            <img
              src="http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/assets/images/hami-logo.png"
              alt="Company Logo"
            />
          </div>
          <div className="company-details">
            <h4 className="fw-bold mb-0">{company.name || "N/A"}</h4>
            <p className="mb-0">
              {company.street_address || ""}, {company.area || ""}, {company.city || ""}
            </p>
          </div>
        </div>

        {/* Customer + Receipt Info */}
        <div className="details-row">
          <div style={{ maxWidth: "48%" }}>
            <h6 className="text-uppercase text-muted fw-semibold">Customer</h6>
            <p className="mb-1 fw-semibold">{customer.name || "N/A"}</p>
            <p className="mb-1">
              📧 <a href={`mailto:${customer.email || ""}`}>{customer.email || "N/A"}</a>
            </p>
            <p>
              📞 <a href={`tel:+880${customer.phone || ""}`}>+880 {customer.phone || "N/A"}</a>
            </p>
            <strong>Photo:</strong>
            <div style={{ marginTop: 8 }}>
              {customer.photo ? (
                <img
                  src={`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/customers/${customer.photo}`}
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
                  <td>{receiptData.id || "N/A"}</td>
                </tr>
                <tr>
                  <th style={{ paddingRight: 15, textAlign: "left" }}>Date</th>
                  <td>{formatDate(receiptData.created_at)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Items Table */}
        {items.length > 0 && (
          <>
            <h6 className="text-uppercase fw-bold mb-2 mt-4">Item Details</h6>
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Property</th>
                  <th className="text-end">Amount</th>
                  <th className="text-end">Discount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.project?.name || "N/A"}</td>
                    <td>{item.property?.title || "N/A"}</td>
                    <td className="text-end">TK {formatCurrency(item.amount)}</td>
                    <td className="text-end text-danger">-TK {formatCurrency(item.discount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Summary Section */}
        <h6 className="text-uppercase text-center fw-bold mb-3 mt-4">Money Receipt Summary</h6>
        <table className="summary-table">
          <tbody>
            <tr>
              <th>Total Amount</th>
              <td className="text-end">TK {formatCurrency(receiptData.total_amount)}</td>
            </tr>
            <tr>
              <th>Discount</th>
              <td className="text-end text-danger">-TK {formatCurrency(receiptData.discount)}</td>
            </tr>
            <tr>
              <th>VAT</th>
              <td className="text-end">TK {formatCurrency(receiptData.vat)}</td>
            </tr>
          
            <tr>
              <th className="fw-bold">Paid</th>
              <td className="text-end fw-bold text-success" style={{ fontSize: "1.2rem" }}>
                TK {formatCurrency(receiptData.paid_amount)}
              </td>
            </tr>
            <tr>
              <th className="fw-bold text-danger">Due Amount</th>
              <td className="text-end fw-bold text-danger">
                TK {formatCurrency((receiptData.total_amount - receiptData.paid_amount))}
              </td>
            </tr>

              <tr>
              <th className="fw-bold">To Be Paid</th>
              <td className="text-end fw-bold">TK {formatCurrency((receiptData.total_amount - receiptData.paid_amount))}</td>
            </tr>


            <tr>
              <th>Payment Method</th>
              <td className="text-end">{receiptData.payment_method || "N/A"}</td>
            </tr>
            <tr>
              <th>Remark</th>
              <td className="text-end">{receiptData.remark || "N/A"}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </>
  );
};

export default ViewMR;
