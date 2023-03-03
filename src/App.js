import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import ClientRegistrationForm from './components/clientregistrationForm'
import { BrowserRouter as Router} from "react-router-dom";
import SupplierRegistrationForm from './components/supplierregistrationForm'
import LoginForm from './components/login'
import { Routes ,Route } from 'react-router-dom';
import UploadInvoiceForm from './components/uploadinvoiceForm';
import ViewInvoiceForm from './components/viewinvoiceForm';


function App() {
  return (
    <div className="App">
       <Header/>
    

       <Router>
      <Routes>
        <Route path ="/" element={<ClientRegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path ="/supplier" element={<SupplierRegistrationForm />} />
        <Route path ="/upload-invoice" element={<UploadInvoiceForm />} />
        <Route path ="/view-invoice" element={<ViewInvoiceForm />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
