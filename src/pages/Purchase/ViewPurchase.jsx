import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewPurchase = () => {
    const { id } = useParams(); // get purchase id from URL
    const purchaseId = id;

    const [data, setData] = useState({
        purchase: null,
        vendor: null,
        items: [],
        company: null,
    });

    useEffect(() => {
        if (!purchaseId) return; // safety check

        const fetchData = async () => {
            try {
                const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/purchases/${purchaseId}`);
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error('Fetch failed:', error);
            }
        };

        fetchData();
    }, [purchaseId]);

    if (!purchaseId) return <p>Invalid purchase ID</p>;
    if (!data.purchase || !data.vendor || !data.company) return <p>Loading...</p>;

    const { purchase, vendor, items, company } = data;

    const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    const discount = subtotal * 0.05;
    const vat = 0;
    const total = subtotal - discount + vat;
    const due = total - purchase.paid_amount;


    return (
        <div className="container my-4">
            <div className="card shadow-sm mb-4 d-print-none">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Purchase Invoice #{purchase.id}</h5>
                    <button className="btn btn-warning btn-sm" onClick={() => window.print()}>
                        <i className="fas fa-print me-1"></i> Print Invoice
                    </button>
                </div>
            </div>

            <div className="card shadow-lg mx-auto" style={{ maxWidth: '900px' }}>
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <img
                            src={`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/${company.logo}`}
                            width="100"
                            alt="Company Logo"
                        />
                        <div className="text-end">
                            <h4 className="fw-bold mb-1">{company.name}</h4>
                            <p className="mb-0">{company.street_address}, {company.area}, {company.city}</p>
                            <p className="mb-0">📧 {company.email}</p>
                            <p className="mb-0">🌐 {company.website}</p>
                        </div>
                    </div>


                    <hr />

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <h6 className="text-muted text-uppercase fw-semibold">Vendor Information</h6>
                            <p className="fw-semibold mb-1">{vendor.name}</p>
                            <p className="mb-1">{vendor.address}</p>
                            <p className="mb-1">📧 <a href={`mailto:${vendor.email}`}>{vendor.email}</a></p>
                            <p>📞 <a href={`tel:+880${vendor.mobile}`}>+880 {vendor.mobile}</a></p>
                            <strong>Photo:</strong><br />
                            {vendor.photo ? (
                                <img src={`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/${vendor.photo}`} width="80" alt="Vendor" className="mt-2 border rounded" />
                            ) : 'No Photo'}
                        </div>
                        <div className="col-md-6 text-end">
                            <table className="table table-sm table-borderless">
                                <tbody>
                                    <tr>
                                        <th className="text-muted">Purchase No:</th>
                                        <td>{purchase.id}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-muted">Date:</th>
                                        <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-muted">Delivery Date:</th>
                                        <td>{new Date(purchase.delivery_date).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h6 className="text-uppercase fw-semibold text-center mb-3">Products</h6>

                    <div className="table-responsive">
                        <table className="table table-bordered align-middle">
                            <thead className="table-success text-white">
                                <tr>
                                    <th>SL</th>
                                    <th>Product ID</th>
                                    <th className="text-center">Qty</th>
                                    <th className="text-end">Price</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 ? items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.product_id}</td>
                                        <td className="text-center">{item.qty}</td>
                                        <td className="text-end">{item.price.toFixed(2)}</td>
                                        <td className="text-end">{(item.qty * item.price).toFixed(2)}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center text-danger">No Products Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="card bg-light border-0 mt-4">
                        <div className="card-body p-3">
                            <h6 className="text-end text-uppercase fw-semibold">Purchase Summary</h6>
                            <table className="table table-sm table-borderless text-end mb-0">
                                <tbody>
                                    <tr>
                                        <th>Subtotal:</th>
                                        <td>{subtotal.toFixed(2)} BDT</td>
                                    </tr>
                                    <tr>
                                        <th>Discount (5%):</th>
                                        <td className="text-danger">-{discount.toFixed(2)} BDT</td>
                                    </tr>
                                    <tr>
                                        <th>VAT:</th>
                                        <td className="text-info">{vat.toFixed(2)} BDT</td>
                                    </tr>

                                    <tr className="border-top">
                                        <th className="fw-bold">Total:</th>
                                        <td className="fw-bold">{total.toFixed(2)} BDT</td>
                                    </tr>
                                    <tr>
                                        <th className="fw-bold">Paid:</th>
                                        <td className="fw-bold">{purchase.paid_amount.toFixed(2)} BDT</td>
                                    </tr>
                                    <tr>
                                        <th className="fw-bold text-danger">Due:</th>
                                        <td className="fw-bold text-danger">{due.toFixed(2)} BDT</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="card-footer bg-white text-center">
                    <small className="text-muted">This invoice is system-generated and fully dynamic.</small>
                </div>
            </div>
        </div>
    );
};

export default ViewPurchase;
