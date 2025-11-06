import {BrowserRouter ,Routes , Route} from 'react-router-dom';
import Navbar from "./Frontend/Navbar/Navbar.jsx"
import Home from "./Home.jsx"
import Analytics from './Frontend/Analytics/Analytics.jsx';
import Profile from './Frontend/Profile/Profile.jsx';
import LogIn from './Frontend/Register/LogIn.jsx';
import { CookiesProvider } from "react-cookie";
const App =()=>
{
 
  return(
      <>

      
      <BrowserRouter>
      <CookiesProvider>
        <div className="nav">
          <Navbar />
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics  />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/logIn" element={<LogIn />} />      */}
        </Routes>
        </CookiesProvider>
      </BrowserRouter>
    

      </>
      )
}
export default App;