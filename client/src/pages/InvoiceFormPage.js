// client/src/pages/InvoiceFormPage.js
import React, { useState } from 'react';
import axios from 'axios';
import InvoiceForm from '../components/InvoiceForm';

const InvoiceFormPage = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState({ name: '', quantity: '', price: '' });

  const [invoiceId, setInvoiceId] = useState(''); // ✅ ADD THIS
  const [qrUrl, setQrUrl] = useState('');

  const grandTotal = items.reduce((acc, item) => acc + item.total, 0);

  const handleAddItem = () => {
    if (!itemInput.name || !itemInput.quantity || !itemInput.price) return;
    const newItem = {
      ...itemInput,
      quantity: parseInt(itemInput.quantity),
      price: parseFloat(itemInput.price),
      total: parseInt(itemInput.quantity) * parseFloat(itemInput.price),
    };
    setItems([...items, newItem]);
    setItemInput({ name: '', quantity: '', price: '' });
  };

  const handleSave = async () => {
    const invoice = {
      invoiceNumber,
      date,
      dueDate,
      sender,
      recipient,
      items,
      grandTotal,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/invoices/save', invoice);
      const saved = res.data;
const savedId = saved.invoiceId || saved._id || saved.id;

setInvoiceId(savedId); // ✅ Save ID safely
setQrUrl(`http://192.168.2.100:3000/invoice/${savedId}`);



      alert('✅ Invoice saved successfully!');
    } catch (error) {
      alert('❌ Failed to save invoice!');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-10 bg-white dark:bg-gray-800 text-black dark:text-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-lg border border-gray-200 dark:border-transparent rounded-2xl">
      <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-6">
        🧾 Create New Invoice
      </h2>

      <InvoiceForm
        invoiceNumber={invoiceNumber}
        setInvoiceNumber={setInvoiceNumber}
        date={date}
        setDate={setDate}
        dueDate={dueDate}
        setDueDate={setDueDate}
        sender={sender}
        setSender={setSender}
        recipient={recipient}
        setRecipient={setRecipient}
        itemInput={itemInput}
        setItemInput={setItemInput}
        handleAddItem={handleAddItem}
        items={items}
        grandTotal={grandTotal}
        invoiceId={invoiceId} // ✅ pass invoiceId
        qrUrl={qrUrl}         // ✅ pass qrUrl
      />

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          💾 Save Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceFormPage;
