import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';


// Components
import Login from './components/pages/Login';
import Splash from './components/pages/Splash';
import FactorsList from './components/pages/factor/FactorsList';
import NotFound from './components/pages/NotFound';
import Services from './components/pages/services/Services';
import Customers from './components/pages/customer/Customers';
import Navbar from './components/shared/Navbar';


function App() {
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [splash, setSplash] = useState(false)
  const [defaultMoadi, setDefaultMoadi] = useState('')


  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoginSuccess(true)
    }

    setTimeout(() => {
      setSplash(false)
    }, 3000);

  }, [loginSuccess])

  return (
    <>
      {
        splash ? <Splash />
          : (
            loginSuccess
              ?
              <>
                <Navbar setDefaultMoadi={setDefaultMoadi} />
                <div id='content'>
                  <Routes>
                    <Route path='/' element={<FactorsList defaultMoadi={defaultMoadi} />} />
                    <Route path='/services' element={<Services />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/404' element={<NotFound />} />
                    <Route path='*' element={<Navigate to="/404" />} />
                  </Routes>
                </div>
              </>
              : <Login setLoginSuccess={setLoginSuccess} />
          )
      }
    </>
  )
}

export default App