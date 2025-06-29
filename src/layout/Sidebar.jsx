{/* <a class=import React from 'react' */ }
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <nav className="navbar navbar-light navbar-vertical navbar-expand-xl">
        <div className="d-flex align-items-center">
          <div className="toggle-icon-wrapper">
            <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Toggle Navigation"><span className="navbar-toggle-icon"><span className="toggle-line" /></span></button>
          </div><a className="navbar-brand" href="#">
            <div className="d-flex align-items-center py-3"><img className="me-2 navbar-brand rounded-circle rounded-logo" src="assets/img/real_estate.png" alt width={70} /><span className="font-sans-serif">REC&M</span>
            </div>
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
          <div className="navbar-vertical-content scrollbar">
            <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav">

              <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown-indicator" href="#dashboard" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-home" /></span><span className="nav-link-text ps-1">Dashboard</span>
                  </div>
                </a>
                <ul className="nav collapse" id="dashboard">
                  <li className="nav-item"><NavLink className="nav-link active" to="/">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Home</span>
                    </div>
                  </NavLink>
                  </li>

                  <li className="nav-item"><NavLink className="nav-link active" to="/reports">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Reports</span>
                    </div>
                  </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown-indicator" href="#purchase" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="purchase">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fa fa-cart-plus" /></span><span className="nav-link-text ps-1">Purchase Product</span>
                  </div>
                </a>
                <ul className="nav collapse" id="purchase">

                  <li className="nav-item"><NavLink className="nav-link" to="/all-purchase">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">All Purchase List</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>

                  <li className="nav-item"><NavLink className="nav-link active" to="/create-purchase">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1"> Create New Purchase</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown-indicator" href="#project" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="project">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fa fa-tasks" /></span><span className="nav-link-text ps-1">Project Management</span>
                  </div>
                </a>
                <ul className="nav collapse" id="project">
                  <li className="nav-item"><NavLink className="nav-link active" to="/all-project">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">All Projects</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>
                  <li className="nav-item"><NavLink className="nav-link" to="/create-project">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create New Project</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>

                </ul>
              </li>

              <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown-indicator" href="#property" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="property">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fa fa-project-diagram" /></span><span className="nav-link-text ps-1">Property</span>
                  </div>
                </a>
                <ul className="nav collapse" id="property">
                  <li className="nav-item"><NavLink className="nav-link active" to="/all-property">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">All Property List</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>
                  <li className="nav-item"><NavLink className="nav-link" to="/create-property">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Add New Property</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>

                </ul>
              </li>

              <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown-indicator" href="#customer" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="customer">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-money-bill-alt" /></span><span className="nav-link-text ps-1">Customer</span>
                  </div>
                </a>
                <ul className="nav collapse" id="customer">
                  <li className="nav-item"><NavLink className="nav-link active" to="/all-customer">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Customer List</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>
                  <li className="nav-item"><NavLink className="nav-link" to="/create-customer">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create  Customer</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>

                </ul>
              </li>


              <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown-indicator" href="#invoice" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-money-bill-alt" /></span><span className="nav-link-text ps-1">Invoice Management</span>
                  </div>
                </a>
                <ul className="nav collapse" id="invoice">
                  <li className="nav-item"><NavLink className="nav-link active" to="/create-invoice">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Invoice</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>
                  <li className="nav-item"><NavLink className="nav-link" to="/manage-invoice">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Invoice</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>

                </ul>
              </li>


              <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown-indicator" href="#payment" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-money-check-alt" /></span><span className="nav-link-text ps-1">MR Management</span>
                  </div>
                </a>
                <ul className="nav collapse" id="payment">
                  <li className="nav-item"><NavLink className="nav-link active" to="/create-mr">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Payment</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>
                  <li className="nav-item"><NavLink className="nav-link" to="/manage-mr">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Payment</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>

                </ul>
              </li>
               <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown-indicator" href="#vendor" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="vendor">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-money-bill-alt" /></span><span className="nav-link-text ps-1">Vendor</span>
                  </div>
                </a>
                <ul className="nav collapse" id="vendor">
                  <li className="nav-item"><NavLink className="nav-link active" to="/all-vendor">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Vendor List</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>
                  <li className="nav-item"><NavLink className="nav-link" to="/create-vendor">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create  Vendor</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>

                </ul>
              </li>
               <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown-indicator" href="#person" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="person">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-money-bill-alt" /></span><span className="nav-link-text ps-1">Project Person</span>
                  </div>
                </a>
                <ul className="nav collapse" id="person">
                  <li className="nav-item"><NavLink className="nav-link active" to="/all-person">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">ProjectPerson List</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>
                  <li className="nav-item"><NavLink className="nav-link" to="/create-person">
                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create  ProjectPerson</span>
                    </div>
                  </NavLink>
                    {/* more inner pages*/}
                  </li>

                </ul>
              </li>

              <li className="nav-item">
                {/* parent pages*/}<a className="nav-link dropdown" href="#logout" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
                  <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-sign-out-alt" /></span><span className="nav-link-text ps-1">Logout</span>
                  </div>
                </a>
              </li>

            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
export default Sidebar