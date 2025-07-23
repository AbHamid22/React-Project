import React from 'react'

import { HashRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import NoPage from './pages/NoPage'
import Test from './pages/Test'
import ManageRegi from './pages/Registration/ManageRegi'
import CreateInvoice from './pages/Invoice/CreateInvoice'
import ManageInvoice from './pages/Invoice/ManageInvoice'
import CreateMR from './pages/MoneyR/CreateMR'
import ManageMR from './pages/MoneyR/ManageMR'
import Home from './pages/Dashboard/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import CreateClass from './pages/Classs/CreateClass'
import ManageClass from './pages/Classs/ManageClass'
import CreateSubject from './pages/Subject/CreateSubject'
import ManageSubject from './pages/Subject/ManageSubject'
import CreateService from './pages/Servicee/CreateService'
import ManageService from './pages/Servicee/ManageService'
import CreateStudent from './pages/Registration/CreateStudent'
import StudentEdit from './pages/Registration/StudentEdit'
import StudentView from './pages/Registration/StudentView'
import StudentCreate from './pages/Registration/StudentCreate'

import CreatePurchase from './pages/Purchase/CreatePurchase'
import AllPurchase from './pages/Purchase/AllPurchase'
import ViewPurchase from './pages/Purchase/ViewPurchase'
import EditPurchase from './pages/Purchase/EditPurchase'

import AllProject from './pages/Project/AllProject'
import CreateProject from './pages/Project/CreateProject'
import ViewProject from './pages/Project/ViewProject'
import EditProject from './pages/Project/EditProject'

import AllProperty from './pages/Property/AllProperty'
import CreateProperty from './pages/Property/CreateProperty'
import ViewProperty from './pages/Property/ViewProperty'
import EditProperty from './pages/Property/EditProperty'
import AllCustomer from './pages/Customer/AllCustomer'
import CreateCustomer from './pages/Customer/CreateCustomer'
import AllVendor from './pages/Vendor/AllVendor'
import CreateVendor from './pages/Vendor/CreateVendor'
import AllPerson from './pages/ProjectPerson/AllPerson'
import CreatePerson from './pages/ProjectPerson/CreatePerson'
import ViewInvoice from './pages/Invoice/ViewInvoice'
import ViewMR from './pages/MoneyR/ViewMR'
import AllProgressive from './pages/ProjectProgressive/AllProgressive'
import ViewProgressive from './pages/ProjectProgressive/ViewProgressive'
import AllCosting from './pages/ProjectCosting/AllCosting'
import ViewCosting from './pages/ProjectCosting/ViewCosting'




const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="test" element={<Test />} />

          {/* studend regi   */}
          <Route path="create-student" element={<CreateStudent />} />

          <Route path="all-purchase" element={<AllPurchase />} />
          <Route path="create-purchase" element={<CreatePurchase />} />
          <Route path="purchases/:id" element={<ViewPurchase />} />
          <Route path="purchases/:id/edit" element={<EditPurchase />} />

          <Route path="student-edit" element={<StudentEdit />} />
          <Route path="manageregi" element={<ManageRegi />} />
          <Route path="student-view" element={<StudentView />} />
          <Route path="student-create" element={<StudentCreate />} />


          <Route path="all-project" element={<AllProject />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="projects/:id" element={<ViewProject />} />
          <Route path="projects/:id/edit" element={<EditProject />} />

           <Route path="all-progressive" element={<AllProgressive />} />
           <Route path="progresse/:id" element={<ViewProgressive />} />

             <Route path="all-p-costing" element={<AllCosting />} />
           <Route path="projectcostings/:id" element={<ViewCosting />} />

          <Route path="all-property" element={<AllProperty />} />
          <Route path="create-property" element={<CreateProperty />} />
          <Route path="propertys/:id" element={<ViewProperty />} />
          <Route path="propertys/:id/edit" element={<EditProperty />} />


          <Route path="create-invoice" element={<CreateInvoice />} />
          <Route path="manage-invoice" element={<ManageInvoice />} />
           <Route path="invoices/:id" element={<ViewInvoice />} />

          <Route path="create-mr" element={<CreateMR />} />
          <Route path="manage-mr" element={<ManageMR />} />
           <Route path="moneyreceipts/:id" element={<ViewMR />} />

          <Route path="all-customer" element={<AllCustomer />} />
          <Route path="create-customer" element={<CreateCustomer />} />

          <Route path="all-vendor" element={<AllVendor />} />
          <Route path="create-vendor" element={<CreateVendor />} />

          <Route path="all-person" element={<AllPerson />} />
          <Route path="create-person" element={<CreatePerson />} />

          <Route path="create-class" element={<CreateClass />} />
          <Route path="manage-class" element={<ManageClass />} />


          <Route path="create-subject" element={<CreateSubject />} />
          <Route path="manage-subject" element={<ManageSubject />} />

          <Route path="create-service" element={<CreateService />} />
          <Route path="manage-service" element={<ManageService />} />
          <Route path="*" element={<NoPage />} />

        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App 