import React from 'react';

const PrintableInvoice = React.forwardRef(({ invoiceNumber, date, dueDate, sender, recipient, items, grandTotal }, ref) => {
  return (
    <div ref={ref} className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Invoice #{invoiceNumber}</h1>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Due Date:</strong> {dueDate}</p>
      <p><strong>Sender:</strong> {sender}</p>
      <p><strong>Recipient:</strong> {recipient}</p>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">Item</th>
            <th className="border px-2 py-1 text-left">Qty</th>
            <th className="border px-2 py-1 text-left">Price</th>
            <th className="border px-2 py-1 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1">₹{item.price}</td>
              <td className="border px-2 py-1">₹{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-4 text-right text-xl font-bold">Grand Total: ₹{grandTotal}</h2>
    </div>
  );
});

export default PrintableInvoice;
