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
import CreateRoutine from './pages/Routine/CreateRoutine'
import ManageRoutine from './pages/Routine/ManageRoutine'
import CreateTeacher from './pages/Teacher/CreateTeacher'
import ManageTeacher from './pages/Teacher/ManageTeacher'
import CreateResult from './pages/Result/CreateResult'
import ManageResult from './pages/Result/ManageResult'
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

          <Route path="all-property" element={<AllProperty />} />
          <Route path="create-property" element={<CreateProperty />} />
          <Route path="propertys/:id" element={<ViewProperty />} />
          <Route path="propertys/:id/edit" element={<EditProperty />} />


          <Route path="create-invoice" element={<CreateInvoice />} />
          <Route path="manage-invoice" element={<ManageInvoice />} />

          <Route path="create-mr" element={<CreateMR />} />
          <Route path="manage-mr" element={<ManageMR />} />

          <Route path="create-routine" element={<CreateRoutine />} />
          <Route path="manage-routine" element={<ManageRoutine />} />

          <Route path="create-teacher" element={<CreateTeacher />} />
          <Route path="manage-teacher" element={<ManageTeacher />} />

          <Route path="create-result" element={<CreateResult />} />
          <Route path="manage-result" element={<ManageResult />} />

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