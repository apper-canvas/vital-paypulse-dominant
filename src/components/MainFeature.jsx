import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature({ activeTab }) {
  // Declare all icon components
  const SendIcon = getIcon('SendHorizonal');
  const SearchIcon = getIcon('Search');
  const QrCodeIcon = getIcon('QrCode');
  const CreditCardIcon = getIcon('CreditCard');
  const LightbulbIcon = getIcon('Lightbulb');
  const PhoneIcon = getIcon('Smartphone');
  const UserIcon = getIcon('User');
  const CheckIcon = getIcon('Check');
  const PlusIcon = getIcon('Plus');
  const InfoIcon = getIcon('Info');
  const CircleDollarSignIcon = getIcon('CircleDollarSign');
  const CopyIcon = getIcon('Copy');
  const ClockIcon = getIcon('Clock');
  const RefreshCwIcon = getIcon('RefreshCw');
  const StarIcon = getIcon('Star');
  const ChevronRightIcon = getIcon('ChevronRight');
  
  // States for money transfer
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // States for QR code
  const [qrValue, setQrValue] = useState('');
  const [qrAmount, setQrAmount] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);

  // States for bill payments
  const [billCategory, setBillCategory] = useState('');
  const [billProvider, setBillProvider] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [billAmount, setBillAmount] = useState('');

  // States for mobile recharge
  const [mobileNumber, setMobileNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [rechargeType, setRechargeType] = useState('prepaid');

  // States for cards
  const [activeCard, setActiveCard] = useState(0);

  // Reset states when tab changes
  useEffect(() => {
    setAmount('');
    setRecipient('');
    setNote('');
    setQrValue('');
    setQrAmount('');
    setQrGenerated(false);
    setBillCategory('');
    setBillProvider('');
    setBillNumber('');
    setBillAmount('');
    setMobileNumber('');
    setOperator('');
    setRechargeAmount('');
    setShowReceipt(false);
  }, [activeTab]);

  // Handle money transfer submission
  const handleTransferSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || !recipient) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionId(Math.random().toString(36).substring(2, 10).toUpperCase());
      setShowReceipt(true);
      
      toast.success(`₹${amount} sent successfully to ${recipient}`);
    }, 1500);
  };

  // Handle QR code generation
  const handleQrGenerate = (e) => {
    e.preventDefault();
    
    if (!qrAmount) {
      toast.error("Please enter an amount");
      return;
    }
    
    if (isNaN(qrAmount) || parseFloat(qrAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setQrValue(`PAYPULSE:${Math.random().toString(36).substring(2, 15)}:${qrAmount}`);
    setQrGenerated(true);
    toast.success("QR code generated successfully");
  };

  // Handle bill payment
  const handleBillPayment = (e) => {
    e.preventDefault();
    
    if (!billCategory || !billProvider || !billNumber || !billAmount) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isNaN(billAmount) || parseFloat(billAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionId(Math.random().toString(36).substring(2, 10).toUpperCase());
      setShowReceipt(true);
      
      toast.success(`Bill payment of ₹${billAmount} successful`);
    }, 1500);
  };

  // Handle mobile recharge
  const handleMobileRecharge = (e) => {
    e.preventDefault();
    
    if (!mobileNumber || !operator || !rechargeAmount) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    
    if (isNaN(rechargeAmount) || parseFloat(rechargeAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionId(Math.random().toString(36).substring(2, 10).toUpperCase());
      setShowReceipt(true);
      
      toast.success(`Recharge of ₹${rechargeAmount} successful for ${mobileNumber}`);
    }, 1500);
  };

  // Reset form after transaction
  const handleNewTransaction = () => {
    setAmount('');
    setRecipient('');
    setNote('');
    setQrValue('');
    setQrAmount('');
    setQrGenerated(false);
    setBillCategory('');
    setBillProvider('');
    setBillNumber('');
    setBillAmount('');
    setMobileNumber('');
    setOperator('');
    setRechargeAmount('');
    setShowReceipt(false);
  };

  // Helper to format the date for the receipt
  const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Demo card data for the cards tab
  const cards = [
    {
      id: 1,
      type: "debit",
      bank: "Axis Bank",
      number: "**** **** **** 4567",
      expiry: "12/26",
      color: "bg-gradient-to-r from-blue-500 to-purple-600"
    },
    {
      id: 2,
      type: "credit",
      bank: "HDFC Bank",
      number: "**** **** **** 8901",
      expiry: "08/25",
      color: "bg-gradient-to-r from-emerald-500 to-teal-600"
    }
  ];

  // Receipt UI component
  const TransactionReceipt = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
          <CheckIcon size={32} className="text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-surface-800 dark:text-white">Payment Successful</h3>
        <p className="text-surface-500 dark:text-surface-400 text-sm">Transaction ID: {transactionId}</p>
      </div>
      
      <div className="space-y-4 border-t border-b border-surface-200 dark:border-surface-700 py-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-surface-600 dark:text-surface-400">Amount</span>
          <span className="font-semibold text-surface-800 dark:text-white">₹{activeTab === 'bills' ? billAmount : activeTab === 'recharge' ? rechargeAmount : amount}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-surface-600 dark:text-surface-400">To</span>
          <span className="font-semibold text-surface-800 dark:text-white">
            {activeTab === 'bills' ? `${billProvider} (${billNumber})` : 
             activeTab === 'recharge' ? `${mobileNumber} (${operator})` : 
             recipient}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-surface-600 dark:text-surface-400">Date & Time</span>
          <span className="text-surface-800 dark:text-white text-sm">{getFormattedDate()}</span>
        </div>
        
        {note && (
          <div className="flex justify-between items-center">
            <span className="text-surface-600 dark:text-surface-400">Note</span>
            <span className="text-surface-800 dark:text-white">{note}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={handleNewTransaction}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          <RefreshCwIcon size={16} />
          <span>New Transaction</span>
        </button>
      </div>
    </motion.div>
  );

  // Money Transfer UI
  const MoneyTransferUI = () => (
    showReceipt ? <TransactionReceipt /> : (
      <motion.form 
        onSubmit={handleTransferSubmit}
        className="space-y-5 max-w-md mx-auto"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Amount (₹)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CircleDollarSignIcon size={18} className="text-surface-400 dark:text-surface-500" />
            </div>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Pay To (Mobile/UPI ID)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon size={18} className="text-surface-400 dark:text-surface-500" />
            </div>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter mobile no. or UPI ID"
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Add a Note (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's this payment for?"
            className="input-field resize-none h-20"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isProcessing}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <RefreshCwIcon size={18} className="animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <SendIcon size={18} />
              <span>Send Money</span>
            </>
          )}
        </motion.button>
        
        <div className="pt-2">
          <p className="text-xs text-center text-surface-500 dark:text-surface-400 flex items-center justify-center gap-1">
            <InfoIcon size={14} />
            <span>Secure and instant payments via UPI</span>
          </p>
        </div>
      </motion.form>
    )
  );

  // QR Code UI
  const QrCodeUI = () => (
    <div className="max-w-md mx-auto">
      {qrGenerated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="bg-white p-4 rounded-xl shadow-soft">
            <div className="w-64 h-64 bg-white flex items-center justify-center border-2 border-surface-200 rounded-lg overflow-hidden">
              {/* Simulated QR code with CSS grid */}
              <div className="w-48 h-48 grid grid-cols-10 gap-1 relative">
                {Array(100).fill().map((_, i) => (
                  <div 
                    key={i} 
                    className={`bg-surface-900 ${
                      Math.random() > 0.7 ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white p-1 rounded">
                    <div className="w-full h-full bg-primary rounded flex items-center justify-center">
                      <p className="text-xs font-bold text-white">PP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-surface-800 dark:text-white">₹{qrAmount}</p>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Share this QR code to receive payment
            </p>
          </div>
          
          <div className="flex gap-3 w-full">
            <button 
              onClick={() => {
                toast.info("QR code copied to clipboard");
              }}
              className="btn btn-outline flex-1 flex items-center justify-center gap-2"
            >
              <CopyIcon size={16} />
              <span>Share</span>
            </button>
            
            <button
              onClick={() => setQrGenerated(false)}
              className="btn btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <RefreshCwIcon size={16} />
              <span>New QR</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form 
          onSubmit={handleQrGenerate}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
              Amount to Receive (₹)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CircleDollarSignIcon size={18} className="text-surface-400 dark:text-surface-500" />
              </div>
              <input
                type="text"
                value={qrAmount}
                onChange={(e) => setQrAmount(e.target.value)}
                placeholder="Enter amount"
                className="input-field pl-10"
                required
              />
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <QrCodeIcon size={18} />
            <span>Generate QR Code</span>
          </motion.button>
          
          <div className="pt-2">
            <p className="text-xs text-center text-surface-500 dark:text-surface-400 flex items-center justify-center gap-1">
              <InfoIcon size={14} />
              <span>Others can scan this QR to pay you</span>
            </p>
          </div>
        </motion.form>
      )}
    </div>
  );

  // Bill Payment UI
  const BillPaymentUI = () => (
    showReceipt ? <TransactionReceipt /> : (
      <motion.form 
        onSubmit={handleBillPayment}
        className="space-y-5 max-w-md mx-auto"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Bill Category
          </label>
          <select
            value={billCategory}
            onChange={(e) => setBillCategory(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select Category</option>
            <option value="electricity">Electricity</option>
            <option value="water">Water</option>
            <option value="gas">Gas</option>
            <option value="broadband">Broadband</option>
            <option value="dth">DTH</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Biller / Provider
          </label>
          <select
            value={billProvider}
            onChange={(e) => setBillProvider(e.target.value)}
            className="input-field"
            required
            disabled={!billCategory}
          >
            <option value="">Select Provider</option>
            {billCategory === 'electricity' && (
              <>
                <option value="Tata Power">Tata Power</option>
                <option value="Adani Electricity">Adani Electricity</option>
                <option value="BESCOM">BESCOM</option>
              </>
            )}
            {billCategory === 'water' && (
              <>
                <option value="Municipal Water">Municipal Water</option>
                <option value="Delhi Jal Board">Delhi Jal Board</option>
              </>
            )}
            {billCategory === 'gas' && (
              <>
                <option value="Indraprastha Gas">Indraprastha Gas</option>
                <option value="Mahanagar Gas">Mahanagar Gas</option>
              </>
            )}
            {billCategory === 'broadband' && (
              <>
                <option value="Airtel">Airtel</option>
                <option value="Jio">Jio</option>
                <option value="BSNL">BSNL</option>
              </>
            )}
            {billCategory === 'dth' && (
              <>
                <option value="Tata Play">Tata Play</option>
                <option value="Airtel DTH">Airtel DTH</option>
                <option value="Dish TV">Dish TV</option>
              </>
            )}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Consumer Number / Subscriber ID
          </label>
          <input
            type="text"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            placeholder="Enter your consumer number"
            className="input-field"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Amount (₹)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CircleDollarSignIcon size={18} className="text-surface-400 dark:text-surface-500" />
            </div>
            <input
              type="text"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isProcessing}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <RefreshCwIcon size={18} className="animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <LightbulbIcon size={18} />
              <span>Pay Bill</span>
            </>
          )}
        </motion.button>
      </motion.form>
    )
  );

  // Mobile Recharge UI
  const MobileRechargeUI = () => (
    showReceipt ? <TransactionReceipt /> : (
      <motion.form 
        onSubmit={handleMobileRecharge}
        className="space-y-5 max-w-md mx-auto"
      >
        <div className="flex gap-3 mb-2">
          <button
            type="button"
            onClick={() => setRechargeType('prepaid')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              rechargeType === 'prepaid'
                ? 'bg-primary text-white'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
            }`}
          >
            Prepaid
          </button>
          <button
            type="button"
            onClick={() => setRechargeType('postpaid')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              rechargeType === 'postpaid'
                ? 'bg-primary text-white'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
            }`}
          >
            Postpaid
          </button>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon size={18} className="text-surface-400 dark:text-surface-500" />
            </div>
            <input
              type="tel"
              maxLength="10"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 10-digit mobile number"
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Operator
          </label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select Operator</option>
            <option value="Jio">Jio</option>
            <option value="Airtel">Airtel</option>
            <option value="Vi">Vi</option>
            <option value="BSNL">BSNL</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Amount (₹)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CircleDollarSignIcon size={18} className="text-surface-400 dark:text-surface-500" />
            </div>
            <input
              type="text"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        {operator && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-surface-700 dark:text-surface-300">
              Recommended Plans
            </p>
            <div className="space-y-2">
              {[
                { amount: "239", validity: "28 days", data: "1.5GB/day" },
                { amount: "479", validity: "56 days", data: "1.5GB/day" },
                { amount: "719", validity: "84 days", data: "2GB/day" }
              ].map((plan, index) => (
                <div 
                  key={index}
                  onClick={() => setRechargeAmount(plan.amount)}
                  className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 cursor-pointer hover:border-primary dark:hover:border-primary"
                >
                  <div>
                    <p className="font-medium text-surface-800 dark:text-white">₹{plan.amount}</p>
                    <p className="text-xs text-surface-500">{plan.validity} • {plan.data}</p>
                  </div>
                  <ChevronRightIcon size={18} className="text-surface-400" />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isProcessing}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <RefreshCwIcon size={18} className="animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <PhoneIcon size={18} />
              <span>{rechargeType === 'prepaid' ? 'Recharge Now' : 'Pay Bill'}</span>
            </>
          )}
        </motion.button>
      </motion.form>
    )
  );

  // Cards UI
  const CardsUI = () => (
    <div className="max-w-md mx-auto">
      <div className="relative pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className={`${cards[activeCard].color} p-5 rounded-2xl shadow-lg text-white`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs opacity-80">
                    {cards[activeCard].type === 'credit' ? 'Credit Card' : 'Debit Card'}
                  </p>
                  <p className="font-semibold">{cards[activeCard].bank}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CreditCardIcon size={24} className="text-white" />
                </div>
              </div>
              
              <p className="text-lg font-mono mb-4">{cards[activeCard].number}</p>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs opacity-80">Valid Till</p>
                  <p className="font-mono">{cards[activeCard].expiry}</p>
                </div>
                <div className="w-10 h-10">
                  {cards[activeCard].type === 'credit' ? (
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path d="M45 35c0 2.209-1.791 4-4 4H7c-2.209 0-4-1.791-4-4V13c0-2.209 1.791-4 4-4h34c2.209 0 4 1.791 4 4v22z" fill="#1565C0"/>
                      <path d="M45 29H3v6c0 2.209 1.791 4 4 4h34c2.209 0 4-1.791 4-4v-6z" fill="#1565C0"/>
                      <path d="M3 23h42v6H3z" fill="#1565C0"/>
                      <path d="M15.186 19l-2.112-5H10.38L12.94 20h2.354zm17.1-5h-2.056L27.5 20h1.854L30.6 17h3.7l.69 3h2.03l-2.426-6h-2.308zm.288 1.65l1.1 2.85h-2.406l1.1-2.85h.206zM15.4 29h3.4v-1.714h-5V33h1.6v-4zm15.288-1.714H34.4V33h-1.6v-4h-1.342l-1.716 2.286L28.112 29h-1.426V33h1.6v-2.714L29.8 31.97h.574l1.716-1.684V33h1.598v-5.714z" fill="#FFF"/>
                      <path d="M24 29h-3.5v.857h2.428V31h-2.428v.857H23.5L25 33h2l-1.8-1.714c.77-.286 1.3-.857 1.3-1.429 0-.857-.9-2.143-2.5-2.143v1.286z" fill="#FFF"/>
                      <path d="M22.274 20v-4.143c0-1.103-.826-1.857-2.066-1.857-1.034 0-1.652.286-2.274.857.308-.571 0-1.857-1.446-1.857-.826 0-1.446.286-1.86.857V14h-1.24v6h1.24v-3.313c0-.669.414-1.245 1.034-1.245s1.034.401 1.034 1.245V20h1.24v-3.313c0-.669.414-1.245 1.033-1.245.62 0 1.033.401 1.033 1.245V20h1.272z" fill="#FFF"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path d="M45 35c0 2.209-1.791 4-4 4H7c-2.209 0-4-1.791-4-4V13c0-2.209 1.791-4 4-4h34c2.209 0 4 1.791 4 4v22z" fill="#1565C0"/>
                      <path d="M45 35c0 2.209-1.791 4-4 4H7c-2.209 0-4-1.791-4-4V13c0-2.209 1.791-4 4-4h34c2.209 0 4 1.791 4 4v22z" fill="#1565C0"/>
                      <path d="M15.95 28.95v-3.93h2.06l.37 1.33.35-1.33h2.12v3.93h-1.33v-2.9l-.55 2.9h-1.12l-.58-2.9v2.9h-1.32zm6.55 0v-3.93h4.13v.97h-2.72v.57h2.66v.89h-2.66v.56h2.72v.94h-4.13zm5.85 0l1.25-1.96-1.25-1.96h1.5l.67 1.05.65-1.05h1.48l-1.25 1.96 1.25 1.96h-1.5l-.65-1.06-.67 1.06h-1.48zm-17.495-8.897l.43-3.007h3.028l-.415 3.007h-3.043zm.194 1.3h3.035l-.38 2.704H10.65l.399-2.703zm.643-5.607h3.02l-.402 3h-3.023l.405-3zm11.201 3l.5-3h3.026l-.473 3h-3.053zm-4.683-3l-.492 3h-3.003l.475-3h3.02zm4.312 4.3h3.059l-.458 2.704h-3.08l.479-2.703zm-1.173 2.704h-3.05l.485-2.703h3.047l-.482 2.703z" fill="#FFF"/>
                      <path d="M18.7 31.3v3h-1.134v-2.334l-.446 2.334h-.966l-.448-2.316V34.3h-1.14v-3h1.673l.398 1.65.396-1.65h1.667zm3.752 2.026h-1.542V34.3h-1.09v-3h2.632v.773h-1.542v.455h1.542v.798zm2.46.153c.336.26.608.391.966.391.36 0 .546-.14.546-.317 0-.154-.097-.245-.426-.317-.742-.17-1.625-.372-1.625-1.283 0-.748.664-1.253 1.636-1.253.664 0 1.207.163 1.572.513l-.537.707c-.28-.212-.573-.331-.976-.331-.308 0-.47.12-.47.3 0 .145.122.25.45.317.743.154 1.6.35 1.6 1.274 0 .748-.608 1.278-1.703 1.278-.736 0-1.353-.221-1.77-.562l.536-.717zm6.528-2.18h-1.063V34.3h-1.09v-3h3.244v.798h-1.09zm1.636 0V34.3h-1.09v-3h1.09v1zm1.344 0h-1.09v.984h1.09v.82h-1.09V34.3h-1.09v-3h2.632v.798h-1.452zm1.825 1.09c0 .91.682 1.01.988 1.01.306 0 .458-.043.458-.043v.797s-.324.072-.7.072c-.765 0-1.835-.432-1.835-1.815 0-1.15.737-1.815 1.717-1.815.608 0 1.095.211 1.437.562l-.536.708c-.25-.212-.537-.363-.9-.363-.372 0-.628.27-.628.887z" fill="#FFF"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                activeCard === index ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
              }`}
              aria-label={`Switch to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between bg-white dark:bg-surface-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <StarIcon size={18} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-surface-800 dark:text-white">Rewards Balance</p>
              <p className="text-sm text-surface-500">1,245 points</p>
            </div>
          </div>
          <ChevronRightIcon size={20} className="text-surface-400 self-center" />
        </div>
        
        <div className="flex justify-between bg-white dark:bg-surface-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <ClockIcon size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-surface-800 dark:text-white">EMI Options</p>
              <p className="text-sm text-surface-500">Convert to EMI</p>
            </div>
          </div>
          <ChevronRightIcon size={20} className="text-surface-400 self-center" />
        </div>
        
        <div className="flex justify-between bg-white dark:bg-surface-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <CreditCardIcon size={18} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-medium text-surface-800 dark:text-white">Card Settings</p>
              <p className="text-sm text-surface-500">Manage your cards</p>
            </div>
          </div>
          <ChevronRightIcon size={20} className="text-surface-400 self-center" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6">
      {activeTab === 'transfer' && <MoneyTransferUI />}
      {activeTab === 'qrcode' && <QrCodeUI />}
      {activeTab === 'bills' && <BillPaymentUI />}
      {activeTab === 'recharge' && <MobileRechargeUI />}
      {activeTab === 'cards' && <CardsUI />}
    </div>
  );
}

export default MainFeature;