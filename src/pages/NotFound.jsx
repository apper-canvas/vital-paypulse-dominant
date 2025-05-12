import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const navigate = useNavigate();
  
  // Declare icon components
  const HomeIcon = getIcon('Home');
  const AlertCircleIcon = getIcon('AlertCircle');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto mb-4"
        >
          <AlertCircleIcon size={48} className="text-surface-400 dark:text-surface-500" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-800 dark:text-white">404</h1>
        <p className="text-xl md:text-2xl text-surface-600 dark:text-surface-300 mb-2">Page Not Found</p>
        <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="btn btn-primary flex items-center gap-2"
      >
        <HomeIcon size={18} />
        <span>Go to Home</span>
      </motion.button>
    </motion.div>
  );
}

export default NotFound;