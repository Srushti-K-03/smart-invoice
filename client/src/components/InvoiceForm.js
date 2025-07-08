import React from 'react';

const InvoiceForm = ({
  invoiceNumber, setInvoiceNumber,
  date, setDate,
  dueDate, setDueDate,
  sender, setSender,
  recipient, setRecipient,
  itemInput, setItemInput,
  handleAddItem, items, grandTotal
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} placeholder="Invoice #" className="input-style" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-style" />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input-style" />
        <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} placeholder="Sender" className="input-style" />
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient" className="input-style" />
      </div>

      <div className="flex gap-2 mb-4">
        <input type="text" value={itemInput.name} onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })} placeholder="Item" className="input-style" />
        <input type="number" value={itemInput.quantity} onChange={(e) => setItemInput({ ...itemInput, quantity: e.target.value })} placeholder="Qty" className="input-style" />
        <input type="number" value={itemInput.price} onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })} placeholder="Price" className="input-style" />
        <button onClick={handleAddItem} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
      </div>

      {items.length > 0 && (
        <table className="w-full table-auto mb-6 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-left">Qty</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">₹{item.price}</td>
                <td className="px-4 py-2">₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="text-2xl font-semibold mb-4">Grand Total: ₹{grandTotal}</h2>
    </div>
  );
};

export default InvoiceForm;
