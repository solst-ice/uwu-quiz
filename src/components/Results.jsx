import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Character descriptions with cyberpunk roles and personalities
const CHARACTER_INFO = {
  Yin: {
    role: "Band leader and Techie",
    description: "You're the balance keeper who holds everything together. Like Yin, you're logical, innovative, and always coding up something crazy. Your technical skills are unmatched, and you approach problems with a methodical mindset while maintaining harmony in chaotic situations.",
    catchphrase: "Every system has a pattern - find the balance and you control the code.",
    emoji: "☯️"
  },
  Yennifur: {
    role: "Fixer and underground connection",
    description: "You're the go-to person when things need to get done. Like Yennifur, you're resourceful, street-smart, and way more gangster than people expect. You have connections everywhere and can procure anything from black market tech to information—for the right price.",
    catchphrase: "I know a guy who knows a guy. Consider it handled.",
    emoji: "🐾"
  },
  Yuki: {
    role: "Netrunner and digital ghost",
    description: "You dive into the digital realm with unmatched flair. Like Yuki, you're eccentric, brilliant, and unpredictable like Ed from Cowboy Bebop. You navigate the NET with natural intuition, leaving no trace while extracting exactly what you need from the most secure systems.",
    catchphrase: "In and out, quick and clean - they'll never know I was there!",
    emoji: "❄️"
  },
  Yuma: {
    role: "Rocker girl and social engineer",
    description: "You command attention whenever you enter a room. Like Yuma, you're charismatic, always with headphones on, and have a musical soul that resonates with others. Your performances aren't just entertainment—they're the perfect cover for gathering intel and influencing the right people.",
    catchphrase: "Life's a stage, and everyone's dancing to my rhythm whether they know it or not.",
    emoji: "🎧"
  },
  Yulia: {
    role: "Medtec and team protector",
    description: "You're the guardian angel watching over everyone. Like Yulia, you're compassionate, vigilant, and always prepared for emergencies. Your medical expertise patches up the team after dangerous runs, and your protective instincts keep everyone alive in the first place.",
    catchphrase: "I'll keep you alive long enough to make bad decisions another day.",
    emoji: "⚕️"
  }
};

const Results = ({ results, onRetry }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [chartData, setChartData] = useState([]);

  // Find the character with the highest score
  const topCharacter = Object.keys(results || {}).reduce((a, b) => 
    (results[a] > results[b] ? a : b), '');

  // Prepare data for chart
  useEffect(() => {
    if (results) {
      const data = Object.keys(results).map(name => ({
        name,
        value: results[name],
        fill: name === topCharacter ? 'var(--primary-color)' : 'var(--secondary-color)'
      }));
      setChartData(data);
      
      // Show description after a short delay for animation
      setTimeout(() => {
        setShowDescription(true);
      }, 1000);
    }
  }, [results, topCharacter]);

  // Custom bar chart tooltip that's mobile friendly
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '8px',
          border: '2px solid var(--primary-color)',
          fontSize: 'clamp(0.8rem, 3vw, 1rem)'
        }}>
          <p style={{ margin: '0 0 5px 0' }}><strong>{payload[0].payload.name}</strong></p>
          <p style={{ margin: 0 }}>{`Similarity: ${payload[0].value}%`}</p>
        </div>
      );
    }

    return null;
  };

  if (!results || !topCharacter) {
    return <div>Loading results...</div>;
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="result-header"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2>Quiz Results</h2>
        <p>Based on your answers, you are most like...</p>
      </motion.div>

      <motion.div 
        className="result-character"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="character-emoji">{CHARACTER_INFO[topCharacter].emoji}</div>
        <div className="character-name">{topCharacter}</div>
        <div className="character-role">{CHARACTER_INFO[topCharacter].role}</div>
      </motion.div>

      <motion.div 
        className="chart-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 15, left: 0, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={70} 
              tick={{ fontSize: 12 }} 
              stroke="var(--dark-color)" 
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[0, 10, 10, 0]} label={{ 
              position: 'right',
              formatter: (value) => `${value}%`,
              fontSize: 12
            }} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {showDescription && (
        <motion.div 
          className="character-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '15px',
            border: '2px dashed var(--primary-color)'
          }}
        >
          <p>{CHARACTER_INFO[topCharacter].description}</p>
          <p style={{ fontStyle: 'italic', color: 'var(--secondary-color)' }}>
            "{CHARACTER_INFO[topCharacter].catchphrase}"
          </p>
        </motion.div>
      )}

      <motion.div 
        style={{ textAlign: 'center', marginTop: '2rem', width: '100%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.button 
          className="uwu-button"
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Take Quiz Again (◕‿◕✿)
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Results; 