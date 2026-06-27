import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/invoices/${id}`);
        if (!res.data) {
          throw new Error('Invoice data is empty');
        }
        setInvoice(res.data);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.response?.data?.error || err.message);
        navigate('/invoices'); // Redirect if error
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id, navigate]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
  <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white transition-all duration-300">

    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">

      {/* Header */}

      <div className="mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">

        <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-2">
          Invoice #{invoice.invoiceNumber}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Date: {new Date(invoice.date).toISOString().split("T")[0]}
          {" • "}
          Due: {new Date(invoice.dueDate).toISOString().split("T")[0]}
        </p>

      </div>

      {/* Sender */}

      <div className="mb-6 space-y-2 text-lg">

        <p className="font-medium">
          From:
          <span className="font-normal ml-1">
            {invoice.sender}
          </span>
        </p>

        <p className="font-medium">
          To:
          <span className="font-normal ml-1">
            {invoice.recipient}
          </span>
        </p>

      </div>

      {/* Table */}

      <table className="w-full table-auto text-sm border border-gray-200 dark:border-gray-700">

        <thead className="bg-gray-100 dark:bg-gray-700">

          <tr>
            <th className="p-3 text-left border-r border-gray-300 dark:border-gray-600">
  Item
</th>

<th className="p-3 text-left border-r border-gray-300 dark:border-gray-600">
  Qty
</th>

<th className="p-3 text-left border-r border-gray-300 dark:border-gray-600">
  Price
</th>

<th className="p-3 text-left">
  Total
</th>
          </tr>

        </thead>

        <tbody>

          {invoice.items.map((item, idx) => (

            <tr
              key={idx}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >

             <td className="p-3 border-r border-gray-300 dark:border-gray-600">
  {item.name}
</td>

<td className="p-3 border-r border-gray-300 dark:border-gray-600">
  {item.quantity}
</td>

<td className="p-3 border-r border-gray-300 dark:border-gray-600">
  ₹{item.price.toLocaleString()}
</td>

<td className="p-3">
  ₹{item.total.toLocaleString()}
</td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Total */}

      <div className="mt-4 flex justify-end border-t border-gray-300 dark:border-gray-700 pt-5">

        <div className="text-right">
  <p className="text-gray-500 dark:text-gray-400 text-sm">
    Grand Total
  </p>

  <h2 className="text-4xl font-bold text-purple-600 dark:text-purple-300">
    ₹{invoice.grandTotal.toLocaleString()}
  </h2>
</div>

      </div>

    </div>

  </div>
);
};

export default InvoiceDetailsPage;