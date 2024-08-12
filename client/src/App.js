import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Main from './main';
import AboutUs from './AboutUs';
import Gallery from './Gallery';
import OrderOnline from './OrderOnline';
import ContactUs from './ContactUs';
import BlogNews from './BlogNews';
import BlogPost from './BlogPost';
import FAQ from './FAQ';
import LoginSignup from './Login';
import ProfileManagement from './ProfileManagement';
import CakeEntry from './AddCake';
import Navbar from './Navbar';
import { createContext, useState } from 'react';
import UserDashboard from './usersDashboard';
import ShopDashboard from './ShopDashboard';
import ReceptionistDashboard from './ReceprionistDashboard';
import BakerDashboard from './BakerDashboard';
export const AppContext=createContext()

function App() {
  const [user,setUser]=useState(null)
  const [text,setText]=useState('')
  return (
    <div className="App">
    <AppContext.Provider value={{user,setUser,text,setText}}>
      <Router>
      
      <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/about-us' element={<AboutUs/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/order/:cakeId' element={<OrderOnline/>}/>
          <Route path='/contact-us' element={<ContactUs/>}/>
          <Route path='/blog' element={<BlogNews/>}/>
          <Route path='/blog-post' element={<BlogPost/>}/>
          <Route path='/faq' element={<FAQ/>}/>
          <Route path='/auth' element={<LoginSignup/>}/>
          <Route path='/profile-management' element={<ProfileManagement/>}/>
          <Route path='/add-cake' element={<CakeEntry/>}/>
          <Route path='user-dashboard' element={<UserDashboard/>}/>
          <Route path='/shop-dashboard' element={<ShopDashboard/>}/>
          <Route path='/reception-dashboard' element={<ReceptionistDashboard/>}/>
          <Route path='/baker-dashboard' element={<BakerDashboard/>}/>
        </Routes>
      </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
