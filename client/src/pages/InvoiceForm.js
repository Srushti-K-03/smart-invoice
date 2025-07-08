import React, { useState, useRef } from 'react';
import axios from 'axios';
import InvoiceForm from '../components/InvoiceForm';
import PrintableInvoice from '../components/PrintableInvoice';
import { useReactToPrint } from 'react-to-print';

const InvoiceFormPage = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('001');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState({ name: '', quantity: '', price: '' });

  const grandTotal = items.reduce((acc, item) => acc + item.total, 0);

  const printRef = useRef();

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
    const invoiceData = {
      invoiceNumber,
      date,
      dueDate,
      sender,
      recipient,
      items,
      grandTotal,
    };

    try {
      await axios.post('http://localhost:5000/api/invoices/save', invoiceData);
      alert('✅ Invoice saved successfully!');
    } catch (error) {
      alert('❌ Failed to save invoice!');
      console.error(error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Invoice-${invoiceNumber}`,
  });

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-10 bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-6">
        🧾 Create New Invoice
      </h2>

      {/* ✅ User input form */}
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
      />

      {/* ✅ Hidden printable version */}
      <div style={{ display: 'none' }}>
        <PrintableInvoice
          ref={printRef}
          invoiceNumber={invoiceNumber}
          date={date}
          dueDate={dueDate}
          sender={sender}
          recipient={recipient}
          items={items}
          grandTotal={grandTotal}
        />
      </div>

      {/* ✅ Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          💾 Save Invoice
        </button>

        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          🖨️ Download / Print PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceFormPage;
