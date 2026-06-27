import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { Link } from 'react-router-dom';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState(""); // ✅ new state for search

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

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this invoice?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      setInvoices(invoices.filter(inv => inv._id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('❌ Failed to delete invoice.');
    }
  };

  // ✅ filter invoices by invoice number
  const filteredInvoices = invoices.filter(inv =>
    inv.invoiceNumber?.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white transition-all duration-300">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300 text-center">
        📄 Saved Invoices
      </h2>

      {/* ✅ Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search by Invoice #"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {filteredInvoices.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {search ? "No invoices match your search." : "No invoices saved yet."}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition hover:scale-[1.01]"
            >
              <div className="mb-4 border-b pb-2 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-purple-600 dark:text-purple-300">
                    Invoice #{invoice.invoiceNumber}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Date: {new Date(invoice.date).toISOString().split('T')[0]} • Due: {new Date(invoice.dueDate).toISOString().split('T')[0]}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Link
                    to={`/invoice/${invoice._id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    title="View invoice"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(invoice._id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                    title="Delete invoice"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-medium">From: <span className="font-normal">{invoice.sender}</span></p>
                <p className="font-medium">To: <span className="font-normal">{invoice.recipient}</span></p>
              </div>

              <table className="w-full table-fixed text-sm border border-gray-200 dark:border-gray-700 border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-700">

  <tr>

    <th className="p-2 text-left border-r border-gray-300 dark:border-gray-600">
      Item
    </th>

    <th className="p-2 text-center border-r border-gray-300 dark:border-gray-600 w-20">
      Qty
    </th>

    <th className="p-2 text-right border-r border-gray-300 dark:border-gray-600 w-32">
      Price
    </th>

    <th className="p-2 text-right w-32">
      Total
    </th>

  </tr>

</thead>
              <tbody>

  {invoice.items.map((item, idx) => (

    <tr
      key={idx}
      className="border-t border-gray-200 dark:border-gray-700"
    >

      <td className="p-2 border-r border-gray-300 dark:border-gray-600">
        {item.name}
      </td>

      <td className="p-2 text-center border-r border-gray-300 dark:border-gray-600">
        {item.quantity}
      </td>

      <td className="p-2 text-right border-r border-gray-300 dark:border-gray-600">
        ₹{item.price.toLocaleString()}
      </td>

      <td className="p-2 text-right">
        ₹{item.total.toLocaleString()}
      </td>

    </tr>

  ))}

</tbody>  
              </table>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">
                  Grand Total: ₹{invoice.grandTotal.toLocaleString()}
                </span>
                <QRCodeCanvas
                  value={`http://localhost:3000/invoice/${invoice._id}`}
                  size={96}
                  includeMargin={true}
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
