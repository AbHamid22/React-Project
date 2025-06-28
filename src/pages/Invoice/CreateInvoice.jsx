function CreateInvoice(){
    return(
        <>  
        <>
  <meta charSet="UTF-8" />
  <title>School Invoice</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n        body {\n            font-family: Arial, sans-serif;\n            margin: 20px;\n            background: #f7f7f7;\n        }\n        .container {\n            background: #fff;\n            padding: 20px;\n            border: 2px solid #cceccc;\n            border-radius: 8px;\n            max-width: 900px;\n            margin: auto;\n        }\n        h2 {\n            margin-top: 0;\n        }\n        .btn {\n            background-color: #3cba54;\n            color: white;\n            padding: 8px 14px;\n            border: none;\n            border-radius: 5px;\n            cursor: pointer;\n        }\n        .btn:hover {\n            background-color: #2e9742;\n        }\n        .row {\n            margin: 10px 0;\n        }\n        .table {\n            width: 100%;\n            border-collapse: collapse;\n            margin-top: 20px;\n            background-color: #4CAF50;\n            color: white;\n            text-align: center;\n        }\n        .table td, .table th {\n            padding: 10px;\n        }\n        .input-field, select, input[type="date"], input[type="text"] {\n            padding: 6px;\n            width: 100%;\n            box-sizing: border-box;\n        }\n        .totals {\n            margin-top: 15px;\n        }\n    '
    }}
  />
  <div className="container">
    <h2>School Invoice</h2>
    <button className="btn">Manage Invoice</button>
    <div className="row">
      <strong>Date:</strong> 16 Apr 2025
    </div>
    <div className="row">
      <strong>Student</strong>
      <br />
      <select className="input-field">
        <option>Jahidul Islam</option>
        {/* Add more students as needed */}
      </select>
    </div>
    <div className="row">
      <label>
        Issue Date:{" "}
        <input type="date" className="input-field" defaultValue="2025-04-16" />
      </label>
      <label>
        Due Date:{" "}
        <input type="date" className="input-field" defaultValue="2025-04-16" />
      </label>
    </div>
    <table className="table">
      <tbody>
        <tr>
          <th>SN</th>
          <th>SERVICES</th>
          <th>AMOUNT</th>
          <th>TOTAL</th>
          <th>Clear</th>
          <th>Add</th>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <select className="input-field">
              <option>Admission Fee</option>
              {/* Add more services */}
            </select>
          </td>
          <td>
            <input type="text" className="input-field" placeholder={0} />
          </td>
          <td>0</td>
          <td>
            <button className="btn">X</button>
          </td>
          <td>
            <button className="btn">+</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div className="totals">
      <p>Amount: 0</p>
      <p>Total: 0</p>
    </div>
    <button className="btn">💾 Save Invoice</button>
  </div>
</>

        </>
    );
}
export default CreateInvoice;