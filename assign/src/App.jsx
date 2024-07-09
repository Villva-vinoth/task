
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './component/Nav/Nav'
import TaskOne from './component/Task1/TaskOne'
import './App.css'
import TaskTwo from './component/Task2/TaskTwo'
import { useState } from 'react'
import TaskTransaction from './component/Task2/TaskTransaction'
function App() {

  const [invoiceId,setInvoiceNum]= useState('')

  return (
    <>
      <BrowserRouter>

        <div className='admin-main'>
          <div className='admin-cont-1'>
            <Nav />
          </div>
          <div className='admin-cont-2'>

            <Routes>
              <Route path='/' element={<TaskOne />} />
              <Route path='/task2' element={<TaskTwo setInvoiceNum={setInvoiceNum} invoiceId={invoiceId} />} />
              <Route path='/task-transaction' element={<TaskTransaction setInvoiceNum={setInvoiceNum} invoiceId={invoiceId} />} />


            </Routes>

          </div>
        </div>
      </BrowserRouter>


    </>
  )
}
export default App



