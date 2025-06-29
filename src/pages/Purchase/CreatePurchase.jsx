import React, { useState, useEffect } from 'react';

const NewPurchase = () => {
    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [cart, setCart] = useState([]);
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().substr(0, 10));
    const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().substr(0, 10));
    const [paidAmount, setPaidAmount] = useState(0);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState(1);
    const [uom, setUom] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [vendorId, setVendorId] = useState('');
    const [warehouseId, setWarehouseId] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productRes, vendorRes, warehouseRes] = await Promise.all([
                fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/products'),
                fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/vendors'),
                fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/warehouses')
            ]);

            if (!productRes.ok || !vendorRes.ok || !warehouseRes.ok) {
                throw new Error('Failed to fetch one or more resources');
            }

            const productData = await productRes.json();
            const vendorData = await vendorRes.json();
            const warehouseData = await warehouseRes.json();

            setProducts(Array.isArray(productData.data) ? productData.data : productData);
            setVendors(Array.isArray(vendorData.data) ? vendorData.data : vendorData);
            setWarehouses(Array.isArray(warehouseData.data) ? warehouseData.data : warehouseData);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addToCart = () => {
        const selectedProduct = products.find(p => p.id === parseInt(selectedProductId));
        const discount = (price * qty) * (discountPercent / 100);
        const lineTotal = (price * qty) - discount;
        const newItem = {
            id: cart.length + 1,
            product_id: selectedProductId,
            desc: selectedProduct?.name,
            price,
            qty,
            uom_id: uom,
            discount,
            vat: 5,
            lineTotal
        };
        setCart([...cart, newItem]);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        if (window.confirm("Are you sure you want to clear all items?")) {
            setCart([]);
        }
    };

    const processPurchase = async () => {
        if (cart.length === 0) {
            alert("Please add at least one product.");
            return;
        }
        const data = {
            warehouse_id: warehouseId,
            vendor_id: vendorId,
            purchase_date: purchaseDate,
            delivery_date: deliveryDate,
            paid_amount: paidAmount,
            purchase_total: netTotal(),
            items: cart
        };
        try {
            const res = await fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to save purchase');
            alert("Purchase saved successfully.");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Failed to save purchase');
        }
    };

    const subtotal = () => cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalDiscount = () => cart.reduce((acc, item) => acc + item.discount, 0);
    const netTotal = () => subtotal() - totalDiscount();
    const dueAmount = () => netTotal() - paidAmount;

    useEffect(() => {
        const selected = products.find(p => p.id === parseInt(selectedProductId));
        if (selected) {
            setPrice(selected.price || '');
            setDiscountPercent(selected.discount || 0);
            setUom(selected.uom_id || '');
        } else {
            setPrice('');
            setDiscountPercent(0);
            setUom('');
        }
    }, [selectedProductId]);

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Purchase Invoice</h2>

            <div className="row mb-3">
                <div className="col-md-4">
                    <label>Warehouse</label>
                    <select className="form-select" value={warehouseId} onChange={e => setWarehouseId(e.target.value)}>
                        <option value=''>Select Warehouse</option>
                        {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                </div>
                <div className="col-md-4">
                    <label>Vendor</label>
                    <select className="form-select" value={vendorId} onChange={e => setVendorId(e.target.value)}>
                        <option value=''>Select Vendor</option>
                        {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                    </select>
                </div>
                <div className="col-md-4">
                    <label>Purchase & Delivery Date</label>
                    <input type="date" className="form-control mb-1" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} />
                    <input type="date" className="form-control" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
                </div>
            </div>

            <div className="table-responsive mb-3">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>UoM</th>
                            <th>Discount%</th>
                            <th>Subtotal</th>
                            <th><button className="btn btn-sm btn-warning" onClick={clearCart}>Clear</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>*</td>
                            <td>
                                <select className="form-select" value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)}>
                                    <option value="">Select Product</option>
                                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </td>
                            <td><input type="text" className="form-control" value={price} onChange={e => setPrice(parseFloat(e.target.value) || 0)} /></td>
                            <td><input type="number" className="form-control" value={qty} onChange={e => setQty(parseInt(e.target.value))} /></td>
                            <td><input type="text" className="form-control" value={uom} onChange={e => setUom(e.target.value)} /></td>
                            <td><input type="text" className="form-control" value={discountPercent} onChange={e => setDiscountPercent(parseFloat(e.target.value) || 0)} /></td>
                            <td></td>
                            <td><button className="btn btn-sm btn-success" onClick={addToCart}>Add</button></td>
                        </tr>
                        {cart.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.id}</td>
                                <td>{item.desc}</td>
                                <td className="text-end">{item.price}</td>
                                <td>{item.qty}</td>
                                <td>{item.uom_id}</td>
                                <td>{item.discount.toFixed(2)}</td>
                                <td className="text-end">{item.lineTotal.toFixed(2)}</td>
                                <td><button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Del</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="row">
                <div className="col-md-4 offset-md-8">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Total UnitPrice:</th>
                                <td className="text-end">{subtotal().toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Total Discount(-):</th>
                                <td className="text-end">{totalDiscount().toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Net Total:</th>
                                <td className="text-end">{netTotal().toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Paid Amount:</th>
                                <td><input type="text" className="form-control text-end" value={paidAmount} onChange={e => setPaidAmount(parseFloat(e.target.value) || "")} /></td>
                            </tr>
                            <tr>
                                <th>Due Amount:</th>
                                <td className="text-end">{dueAmount().toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-end">
                <button className="btn btn-primary me-2" onClick={() => window.print()}><i className="fas fa-print"></i> Print</button>
                <button className="btn btn-success" onClick={processPurchase}><i className="fas fa-check"></i> Process Purchase</button>
            </div>
        </div>
    );
};

export default NewPurchase;
