import React, { useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';

function WithdrawModal({ isOpen, onClose, onWithdraw, balance }) {
  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (parseFloat(amount) > balance) {
      setError('Insufficient funds');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setIsLoading(true);
    try {
      await onWithdraw(parseFloat(amount), bankDetails);
      setAmount('');
      setBankDetails({
        accountName: '',
        accountNumber: '',
        bankName: ''
      });
      onClose();
    } catch (error) {
      setError(error.message || 'Withdrawal failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Withdraw Funds</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="withdraw-amount" className="text-sm font-medium">
                Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₦</span>
                <input
                  id="withdraw-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-8 p-2 text-sm"
                  placeholder="0.00"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Available balance: ₦{balance.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="bankName" className="text-sm font-medium">
                Bank Name
              </label>
              <input
                id="bankName"
                name="bankName"
                type="text"
                value={bankDetails.bankName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                placeholder="Enter bank name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="accountNumber" className="text-sm font-medium">
                Account Number
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                value={bankDetails.accountNumber}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                placeholder="Enter account number"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="accountName" className="text-sm font-medium">
                Account Name
              </label>
              <input
                id="accountName"
                name="accountName"
                type="text"
                value={bankDetails.accountName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                placeholder="Enter account name"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (
                <>
                  <FiArrowDown className="h-4 w-4" />
                  Withdraw
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WithdrawModal;