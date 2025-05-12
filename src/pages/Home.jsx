import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home() {
  const [activeTab, setActiveTab] = useState('transfer');
  
  // Declare icon components
  const SendIcon = getIcon('SendHorizonal');
  const QrCodeIcon = getIcon('QrCode');
  const CreditCardIcon = getIcon('CreditCard');
  const LightbulbIcon = getIcon('Lightbulb');
  const PhoneIcon = getIcon('Smartphone');
  
  const tabData = {
    transfer: {
      title: "Send Money",
      icon: SendIcon
    },
    qrcode: {
      title: "Scan & Pay",
      icon: QrCodeIcon
    },
    bills: {
      title: "Pay Bills",
      icon: LightbulbIcon
    },
    recharge: {
      title: "Recharge",
      icon: PhoneIcon
    },
    cards: {
      title: "Cards",
      icon: CreditCardIcon
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl -z-10"></div>
        <div className="absolute -right-10 -top-10 h-40 w-40 bg-accent/20 rounded-full blur-3xl -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-neu bg-surface-50/50 dark:bg-surface-800/50 border border-surface-200/50 dark:border-surface-700/50 rounded-3xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white text-balance">
                Welcome to <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">PayPulse</span>
              </h1>
              <p className="text-surface-600 dark:text-surface-300 text-lg max-w-md">
                Send money, pay bills, or recharge your mobile - all in one place with speed and security.
              </p>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Mobile Payment Illustration" 
                className="w-full md:w-64 h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Quick Access Tabs */}
      <section>
        <div className="grid grid-cols-5 gap-2 md:gap-4 mb-6">
          {Object.entries(tabData).map(([key, { title, icon: Icon }]) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(key);
                toast.info(`${title} feature selected`);
              }}
              className={`relative p-3 md:p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                activeTab === key 
                  ? "bg-primary/10 text-primary dark:bg-primary/20" 
                  : "bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700"
              }`}
            >
              {activeTab === key && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 border-2 border-primary rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon size={20} className="text-current" />
              <span className="text-xs md:text-sm font-medium text-current whitespace-nowrap">{title}</span>
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <MainFeature activeTab={activeTab} />
          </motion.div>
        </AnimatePresence>
      </section>
      
      {/* Recent Transactions */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-white">Recent Activity</h2>
          <button className="text-primary dark:text-primary-light text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {[
            { id: 1, name: "Alex Meyer", amount: "-₹250", type: "sent", date: "Today", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" },
            { id: 2, name: "Electricity Bill", amount: "-₹1,450", type: "bill", date: "Yesterday", image: null },
            { id: 3, name: "Sarah Wilson", amount: "+₹750", type: "received", date: "Mar 15", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" },
          ].map(transaction => (
            <motion.div
              key={transaction.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-surface-800 p-4 rounded-xl flex items-center justify-between shadow-sm border border-surface-100 dark:border-surface-700"
            >
              <div className="flex items-center gap-3">
                {transaction.image ? (
                  <img 
                    src={transaction.image} 
                    alt={transaction.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <LightbulbIcon size={18} className="text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-surface-800 dark:text-white">{transaction.name}</p>
                  <p className="text-xs text-surface-500">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.type === 'received' 
                  ? 'text-green-500' 
                  : 'text-surface-800 dark:text-white'
              }`}>
                {transaction.amount}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;