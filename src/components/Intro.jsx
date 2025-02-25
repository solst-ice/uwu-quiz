import React from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onStart }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: '100%' }}
    >
      <motion.h2 variants={itemVariants} className="question">
        Welcome to the UwU-Underground Quiz!
      </motion.h2>
      
      <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p>Find out which member of the legendary hacker band UwU-Underground matches your personality!</p>
        <p>Answer 10 questions about exploits, malware, APTs, and hacking tactics to discover your digital soulmate!</p>
      </motion.div>
      
      <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div className="band-members" style={{ marginBottom: '2rem', width: '100%', maxWidth: '500px' }}>
          <h3 style={{ textAlign: 'center' }}>Meet the Band:</h3>
          <ul style={{ listStyleType: 'none', padding: '0 10px', margin: '0 auto' }}>
            <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>☯️</span> 
              <div>
                <strong>Yin</strong> - Band leader and Techie - Always coding up something crazy
              </div>
            </li>
            <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🐾</span> 
              <div>
                <strong>Yennifur</strong> - Fixer - The gangster you don't want to cross
              </div>
            </li>
            <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>❄️</span> 
              <div>
                <strong>Yuki</strong> - Netrunner - Think Ed from Cowboy Bebop
              </div>
            </li>
            <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🎧</span> 
              <div>
                <strong>Yuma</strong> - Rocker girl - Always performing or has headphones on
              </div>
            </li>
            <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>⚕️</span> 
              <div>
                <strong>Yulia</strong> - Medtec - The protective guardian of the group
              </div>
            </li>
          </ul>
        </div>
        
        <motion.button 
          className="uwu-button"
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Quiz ✧･ﾟ
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Intro; 