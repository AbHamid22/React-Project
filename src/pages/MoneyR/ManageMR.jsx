function ManageMR(){
    return(
   
        <>
        <meta charSet="UTF-8" />
        <title>Money Receipt Form</title>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n    body {\n      font-family: Arial, sans-serif;\n      margin: 30px;\n      background: #f9f9f9;\n    }\n    .container {\n      background: #fff;\n      padding: 20px;\n      border: 1px solid #ddd;\n      border-radius: 8px;\n      max-width: 1000px;\n      margin: auto;\n    }\n    h2, h3 {\n      text-align: center;\n    }\n    .btn {\n      padding: 8px 14px;\n      border: none;\n      border-radius: 5px;\n      color: white;\n      cursor: pointer;\n    }\n    .btn-green {\n      background-color: #28a745;\n    }\n    .btn-blue {\n      background-color: #007bff;\n    }\n    .btn-red {\n      background-color: #dc3545;\n    }\n    .table {\n      width: 100%;\n      border-collapse: collapse;\n      margin-top: 20px;\n      background: #fefefe;\n    }\n    .table th, .table td {\n      padding: 10px;\n      border: 1px solid #ccc;\n    }\n    .info-section {\n      text-align: center;\n      margin-top: 10px;\n    }\n    .info-section p {\n      margin: 5px 0;\n    }\n    .form-row {\n      margin-top: 20px;\n      display: flex;\n      justify-content: space-between;\n      flex-wrap: wrap;\n      gap: 10px;\n    }\n    label {\n      display: inline-block;\n      margin-right: 10px;\n    }\n    input[type="text"], select {\n      padding: 6px;\n      width: 200px;\n    }\n    .total-text {\n      text-align: right;\n      margin-top: 15px;\n      font-weight: bold;\n    }\n  '
          }}
        />
        <div className="container">
          <h2>Payment Management</h2>
          <button className="btn btn-green">Manage Money Receipt</button>
          <div className="info-section">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/graduation-cap.png"
              alt="School Logo"
              width={50}
            />
            <br />
            <strong>International Green School</strong>
            <p>123 Badda Road, City Dhaka, Bangladesh</p>
            <p>
              <strong>Phone:</strong> 123456789
            </p>
            <p>
              <strong>Email:</strong> intgreenschool@gmail.com
            </p>
            <h3>Money Receipt Form</h3>
          </div>
          <div className="form-row">
            <label>
              Receipt No: <strong>MR-49</strong>
            </label>
            <label>
              Received From:
              <select>
                <option>Jahidul Islam</option>
              </select>
            </label>
            <label>
              Date: <strong>16-Apr-2025</strong>
            </label>
            <label>
              Payment Method: <strong>Cash</strong>
            </label>
          </div>
          <table className="table" id="servicesTable">
            <thead>
              <tr>
                <th>Services</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="serviceRows">{/* Dynamic rows go here */}</tbody>
          </table>
          {/* <button className="btn btn-blue" onclick="addRow()">
            + Add Row
          </button> */}
          <button className="btn btn-blue" style={{ marginTop: 20 }}>
            Save Money Receipt
          </button>
          <div className="total-text" id="grandTotal">
            Total: 0
          </div>
        </div>
      </>
    );
    
    
}
export default ManageMR;