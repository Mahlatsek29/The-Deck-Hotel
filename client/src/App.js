import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Reordered the imports
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import BookingScreen from './screens/BookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import About from './screens/About';
import Welcome from './screens/Welcome';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar /> 
        <Routes>
        <Route path='/' element={<Welcome/>}/>
          <Route path="/home" element={<HomeScreen />} />
          <Route path='/book/:roomid/:fromdate/:todate' element={<BookingScreen />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} /> 
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/about' element={<About/>}/>
          <Route path='/admin' element={<AdminScreen />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
