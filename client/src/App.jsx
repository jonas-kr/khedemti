import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import JobsPage from './pages/JobsPage'
import JobPages from './pages/JobPage'


import Login from './pages/Emoployers/Login'
import Register from './pages/Emoployers/Register'
import CreateJob from './pages/Emoployers/CreateJob'
import Dashboard from './pages/Emoployers/Dashboard'
import UpdateJob from './pages/Emoployers/UpdateJob'
import UpdateProfile from './pages/Emoployers/UpdateProfile'
import Profile from './pages/Emoployers/Profile'


import RegisterWrk from './pages/Workers/Register'
import LoginWrk from './pages/Workers/Login'
import DashboardWrk from './pages/Workers/Dashboard'
import UpdateProfileWrk from './pages/Workers/UpdateProfile'
import ProfileWrk from './pages/Workers/Profile'

import Contact from './pages/Contact'
import SearchPage from './pages/SearchPage'
import About from './pages/About'
import AuthRoutes from './routes/AuthRoutes'
import GuestRouteC from './routes/GuestRouteC'
import GuestRouteW from './routes/GuestRouteW'
import AuthRoutesC from './routes/AuthRoutesC'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<Home />} />
          <Route path='jobs' element={<JobsPage />} />
          <Route path='jobs/:id' element={<JobPages />} />
          <Route element={<GuestRouteC />}>
            <Route element={<GuestRouteW />}>
              <Route path='register' element={<RegisterWrk />} />
              <Route path='login' element={<LoginWrk />} />
            </Route>
          </Route>

          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='emp/:id' element={<Profile />} />
          <Route path='wrkr/:id' element={<ProfileWrk />} />
          <Route path="/search" element={<SearchPage/>}/>

          <Route element={<AuthRoutesC />}>
            <Route path='jobs/update' element={<UpdateJob />} />
          </Route>

          <Route path='/emp'  >
            <Route element={<AuthRoutesC />}>
              <Route path='create' element={<CreateJob />} />
              <Route path='dash' element={<Dashboard />} />
              <Route path='update' element={<UpdateProfile />} />
            </Route>
            <Route element={<GuestRouteW />}>
              <Route element={<GuestRouteC />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
              </Route>
            </Route>
          </Route>


          <Route path='/wrk'  >
            <Route element={<AuthRoutes />}>
              <Route path='dash' element={<DashboardWrk />} />
              <Route path='update' element={<UpdateProfileWrk />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
