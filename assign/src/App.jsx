
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './component/Nav/Nav'
import TaskOne from './component/Task1/TaskOne'
import './App.css'
function App() {
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
              <Route path='/task2' element={''} />

            </Routes>

          </div>
        </div>
      </BrowserRouter>


    </>
  )
}
export default App



