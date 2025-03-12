import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

// Import icons from react-icons
import { FiDollarSign, FiCreditCard, FiUser, FiLogOut } from 'react-icons/fi';
import { useFetchUserDetails } from '../lib/models/auth/hooks';
import PaymentComponent from '../components/PaymentComponent';
import { useFetchUserBalance } from '../lib/models/wallet/hooks';

function DashboardPage() {
  const navigate = useNavigate();
  const [userr  , setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fundAmount, setFundAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('transactions');

  const {data: userdetails, isPending } = useFetchUserDetails();
    const user = userdetails?.result

  const {data: userBalance, isPending: isPendingBalance, refetch: refetchUserBalance } = useFetchUserBalance();
  const user_balance = userBalance?.balance;

  useEffect(() => {
    refetchUserBalance();
    if (user) {
        setBalance(user_balance);
      }

  }, [user_balance]);


    console.log("This is our user balance : ", userBalance?.balance)


  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }


  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleFundWallet = async (e) => {
    e.preventDefault();
    setIsLoading(true);

  };

  if (!user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">WalletHub</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.email}</span>
            <button
              className="rounded-full p-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <FiLogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Wallet Balance</h3>
              <FiDollarSign className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">#{balance.toFixed(2)}</div>
              <p className="text-xs text-gray-500">Available for transactions</p>
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700 md:col-span-2">
            <div>
              <h3 className="text-lg font-bold">Fund Your Wallet</h3>
              <p className="text-sm text-gray-500">Add money to your wallet balance</p>
            </div>
            <form onSubmit={handleFundWallet} className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="flex-1 space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">Amount</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    id="amount"
                    placeholder="0.00"
                    type="number"
                    min="1"
                    step="0.01"
                    className="w-full rounded-md border border-gray-300 pl-8 p-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-end">

                 <PaymentComponent amount={fundAmount} />
              </div>
            </form>

          </div>
        </div>

        <div className="mt-6">
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'transactions'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('transactions')}
              >
                Transaction History
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
            </div>
          </div>

          {activeTab === 'transactions' && (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Recent Transactions</h3>
                  <p className="text-sm text-gray-500">Your recent wallet activities</p>
                </div>
                {transactions.length === 0 ? (
                  <p className="text-center text-gray-500">No transactions yet</p>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`rounded-full p-2 ${tx.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <FiCreditCard className={`h-4 w-4 ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          <div>
                            <p className="font-medium">{tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</p>
                            <p className="text-sm text-gray-500">{new Date(tx.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className={`font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Profile Information</h3>
                  <p className="text-sm text-gray-500">Your personal details</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-blue-100 p-6">
                      <FiUser className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xl font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Account Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Status</p>
                        <p className="text-green-600">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;