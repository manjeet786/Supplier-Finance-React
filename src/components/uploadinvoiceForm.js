import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./uploadinvoiceForm.css";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

const UploadInvoiceForm = () => {
    const [supplierCode, setSupplierCode] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoiceDate, setInvoiceDate] = useState(new Date());
    const [amount, setamount] = useState('');
    const [currency, setCurrency] = useState('');
    const [file, setFile] = useState(null);
    const [displayCalendar, setDisplayCalendar] = useState(false);
  
    const handleSubmit = async (event) => {
    
      //  event.preventDefault();
      const formData = new FormData();
      formData.append("supplierCode", supplierCode);
      formData.append("invoiceNumber", invoiceNumber);
      formData.append("invoiceDate", invoiceDate);
      formData.append("amount", amount);
      formData.append("currency", currency);
      formData.append("file", file);
      // Here you can handle the form submission and upload the file to the server
      console.log({
        supplierCode,
        invoiceNumber,
        invoiceDate,
        amount,
        currency,
        file,
      });
      try {
        // make axios post request
        const response = await axios({
          method: "post",
          url: "http://localhost:61865/invoices/upload",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          window.location.href = "/view-invoice";
      }
    
      } catch(error) {
        console.log(error)
      }
    
    };
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    return (
      <form onSubmit={handleSubmit} className="upload-invoice-form">
          <h3>Upload Invoice</h3>
        <div className="form-group">
          <label htmlFor="supplier-code">Supplier Code:</label>
          <input
            type="text"
            className="form-control"
            id="supplier-code"
            value={supplierCode}
            onChange={(e) => setSupplierCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="invoice-number">Invoice Number:</label>
          <input
            type="text"
            className="form-control"
            id="invoice-number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="invoice-date">Invoice Date:</label>
          <input
            type="text"
            className="form-control"
            id="invoice-date"
            value={invoiceDate.toLocaleDateString()}
            onClick={() => setDisplayCalendar(true)}
            readOnly
          />
          {displayCalendar && (
            <Calendar
              value={invoiceDate}
              onClickDay={(value) => {
                setInvoiceDate(value);
                setDisplayCalendar(false);
              }}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="invoice-amount">Invoice Amount:</label>
          <input
            type="text"
            className="form-control"
            id="invoice-amount"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
          />
        </div>
        <div className="form-group select">
          <label1 htmlFor="currency">Currency:</label1>
          <select 
            id="currency"
            className="form-control"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EURO">EURO</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="invoice-file">Invoice File:</label>
          <input
            type="file"
            className="form-control-file"
            id="invoice-file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
        <br></br>
        <button
  type="button"
  className="btn btn-primary"
  onClick={() => window.location.href = "/view-invoice"}
>
  View Invoices
</button>
    </form>
  );
};

export default UploadInvoiceForm;
