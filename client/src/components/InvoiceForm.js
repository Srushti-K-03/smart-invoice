import React from 'react';
// import { QRCodeSVG } from 'qrcode.react';


const InvoiceForm = ({
  invoiceNumber,
  setInvoiceNumber,
  date,
  setDate,
  dueDate,
  setDueDate,
  sender,
  setSender,
  recipient,
  setRecipient,
  itemInput,
  setItemInput,
  handleAddItem,
  items,
  grandTotal,
  invoiceId,
  qrUrl,
}) => {
  return (
    <div>
      {/* Invoice Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Invoice #</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Sender & Recipient */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Items</h3>

        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-4 mb-2 text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded"
          >
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            <div>₹{item.price}</div>
            <div className="font-semibold">₹{item.total}</div>
          </div>
        ))}

        {/* Item Input */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <input
            type="text"
            placeholder="Item name"
            value={itemInput.name}
            onChange={(e) =>
              setItemInput({ ...itemInput, name: e.target.value })
            }
            className="px-3 py-2 border rounded dark:bg-gray-700"
          />
          <input
            type="number"
            placeholder="Qty"
            value={itemInput.quantity}
            onChange={(e) =>
              setItemInput({ ...itemInput, quantity: e.target.value })
            }
            className="px-3 py-2 border rounded dark:bg-gray-700"
          />
          <input
            type="number"
            placeholder="Price"
            value={itemInput.price}
            onChange={(e) =>
              setItemInput({ ...itemInput, price: e.target.value })
            }
            className="px-3 py-2 border rounded dark:bg-gray-700"
          />
          <button
            onClick={handleAddItem}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Item
          </button>
        </div>
      </div>

      {/* Grand Total */}
      <div className="mt-6 text-right">
        <p className="text-lg font-bold">
          Grand Total: ₹{grandTotal.toLocaleString()}
        </p>
      </div>

      {/* ✅ QR Code Section
    {qrUrl && (
  <div className="mt-10 flex justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
      <p className="text-sm text-gray-800 font-semibold mb-2">
        Scan to view invoice online
      </p>

      <QRCodeSVG
        value={qrUrl}
        size={160}
        bgColor="#ffffff"
        fgColor="#000000"
        includeMargin={true}
      />

      <p className="text-xs text-gray-700 mt-4 break-words">{qrUrl}</p>
    </div>
  </div>
)} */}




    </div>
  );
};

export default InvoiceForm;
