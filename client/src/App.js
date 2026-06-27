// client/src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import InvoiceFormPage from './pages/InvoiceFormPage';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage'; 

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-300">
          Smart Invoice
        </h1>
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Create Invoice
          </Link>
          <Link
            to="/invoices"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Invoices
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-full border border-gray-700 dark:border-yellow-400 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-yellow-300 text-sm transition"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<InvoiceFormPage />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoice/:id" element={<InvoiceDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;