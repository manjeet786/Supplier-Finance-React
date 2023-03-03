import React, { useState, useEffect } from "react";
import axios from "axios";
import "./invoicetable.css";


function ViewInvoiceForm() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:61865/invoices/all")
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const downloadFile = (invoiceNumber) => {
      console.log("Value of InvoiceNumber"+invoiceNumber)
    axios({
      url: `http://localhost:61865/invoices/${invoiceNumber}/file`,
      method: "GET",
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice_${invoiceNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  };
  

  return (
    <div>
      <h2>All Invoices</h2>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Supplier Code</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Invoice Amount</th>
            <th>Currency</th>
            <th>Invoice Status</th>
            <th>Download Invoice</th>
           
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceNumber}>
                 <td>{invoice.supplierCode}</td>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.invoiceDate}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.currency}</td>
              <td>{invoice.invoiceStatus}</td>
              <td>
                <button onClick={() => downloadFile(invoice.invoiceNumber)}>
                  Download
                </button>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewInvoiceForm;
