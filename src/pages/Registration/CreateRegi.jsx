import { NavLink } from "react-router-dom";

function CreateRegi(){
    return(
        <>  
   
   <>
  <meta charSet="UTF-8" />
  <title>Student Registration</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n    body {\n      font-family: Arial, sans-serif;\n      background-color: #f5f7fa;\n      margin: 0;\n      padding: 20px;\n    }\n    .container {\n      max-width: 900px;\n      margin: auto;\n      background: #fff;\n      padding: 30px;\n      border-radius: 8px;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n    }\n    .header {\n      background-color: #28a745;\n      color: white;\n      padding: 10px 20px;\n      border-radius: 5px;\n      display: inline-block;\n      margin-bottom: 20px;\n    }\n    h2 {\n      margin-bottom: 20px;\n    }\n    .form-group {\n      display: flex;\n      margin-bottom: 15px;\n      align-items: center;\n    }\n    .form-group label {\n      width: 150px;\n      font-weight: bold;\n    }\n    .form-group input,\n    .form-group select,\n    .form-group textarea {\n      flex: 1;\n      padding: 10px;\n      border: 1px solid #ccc;\n      border-radius: 5px;\n    }\n    .form-group input[type="file"] {\n      padding: 3px;\n    }\n    .submit-btn {\n      margin-top: 20px;\n    }\n    .submit-btn button {\n      padding: 10px 20px;\n      background-color: #007bff;\n      color: white;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n    }\n    .submit-btn button:hover {\n      background-color: #0056b3;\n    }\n  '
    }}
  />
  <div className="container">
    <NavLink className="btn btn-primary"  to="/manage-regi">Manage Student</NavLink>
    <h2>Student</h2>
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div className="form-group">
        <label htmlFor="father">Fathers Name</label>
        <input type="text" id="father" name="father" />
      </div>
      <div className="form-group">
        <label htmlFor="mother">Mothers Name</label>
        <input type="text" id="mother" name="mother" />
      </div>
      <div className="form-group">
        <label htmlFor="batch">Academy Batch</label>
        <select id="batch" name="batch">
          <option value="Batch1">Batch1</option>
          <option value="Batch2">Batch2</option>
          <option value="Batch3">Batch3</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dob">Dob</label>
        <input type="date" id="dob" name="dob" />
      </div>
      <div className="form-group">
        <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" name="photo" />
      </div>
      <div className="form-group">
        <label htmlFor="contact">Contact No</label>
        <input type="text" id="contact" name="contact" />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea id="address" name="address" rows={3} defaultValue={""} />
      </div>
      <div className="submit-btn">
        <button type="submit">Save</button>
      </div>
    </form>
  </div>
</>

        </>
    );
}
export default CreateRegi;