  import {BrowserRouter,Route,Routes} from "react-router-dom";
  import {Home} from "./pages/Home";
  import {About} from "./pages/About";
  import {Contact} from "./pages/Contact";
  import {Services} from "./pages/Services";
  import {Login} from "./pages/Login";
  import {Register} from "./pages/Register";
  import { Error } from "./pages/Error";
  import {Logout} from "./pages/Logout";
  import {Navbar} from "./components/Navbar";
  import {Footer} from "./components/Footer";
  import {AdminLayout} from "./components/layouts/Admin-Layout";
  import { AdminUsers } from "./pages/Admin-Users";
  import { AdminContacts } from "./pages/Admin-Contacts";
  import {AdminUpdate} from "./pages/Admin_update";
  import Payment_sucess from "./pages/Payment_sucess";
//browser router help us to navigate through different page by diff url to diff page 
  const App=()=>{
  return (
       <>
          <BrowserRouter>
                <Navbar/>
                <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/about" element={<About/>}/>
                      <Route path="/contact" element={<Contact/>}/>
                      <Route path="/services" element={<Services/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/logout" element={<Logout/>}/>
                      <Route path="*" element={<Error/>}/>
                      <Route path="/paymentsuccess" element={<Payment_sucess/>}/>
                      {/* mern nested routes for admin --by using outlet in admin page*/}
                      <Route path="/admin" element={<AdminLayout/>}>
                          <Route path="users" element={<AdminUsers/>}/>
                          <Route path="contacts" element={<AdminContacts/>}/>
                          <Route path="users/:id/edit" element={<AdminUpdate/>}/>
                      </Route>
                </Routes>  
                <Footer/>             
          </BrowserRouter>
       </>
  );
};
export default App;