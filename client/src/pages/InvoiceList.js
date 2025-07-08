// src/pages/InvoiceList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/invoices/all');
        setInvoices(res.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white transition-all duration-300">
      <h2 className="text-3xl font-bold mb-8 text-purple-700 dark:text-purple-300 text-center">
        📄 Saved Invoices
      </h2>

      {invoices.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No invoices saved yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {invoices.map((invoice) => (
            <div
              key={invoice._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition hover:scale-[1.01]"
            >
              <div className="mb-4 border-b pb-2">
                <h3 className="text-xl font-semibold mb-1 text-purple-600 dark:text-purple-300">
                  Invoice #{invoice.invoiceNumber}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Date: {invoice.date} • Due: {invoice.dueDate}
                </p>
              </div>

              <div className="mb-4">
                <p><strong>Sender:</strong> {invoice.sender}</p>
                <p><strong>Recipient:</strong> {invoice.recipient}</p>
              </div>

              <table className="w-full table-auto text-sm border">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-left">Qty</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">₹{item.price}</td>
                      <td className="p-2">₹{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">
                  Grand Total: ₹{invoice.grandTotal}
                </span>
                <QRCodeCanvas
                  value={`Invoice #${invoice.invoiceNumber} | Total: ₹${invoice.grandTotal}`}
                  size={64}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
