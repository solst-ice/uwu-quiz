import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The band members
const MEMBERS = ['Yin', 'Yennifur', 'Yuki', 'Yuma', 'Yulia'];

// Quiz questions with answers - each answer is associated with a band member
const QUESTIONS = [
  {
    question: "Which type of exploit would you prefer to use?",
    answers: [
      { text: "Zero-day vulnerabilities with perfectly balanced payload execution", character: "Yin" },
      { text: "Insider exploits through black market connections and paid-off employees", character: "Yennifur" },
      { text: "Unconventional memory corruption techniques that bypass traditional protection", character: "Yuki" },
      { text: "Social engineering attacks that leverage public performances as cover", character: "Yuma" },
      { text: "Low-risk exploits that minimize collateral damage to critical systems", character: "Yulia" }
    ]
  },
  {
    question: "Which historic malware or APT group do you find most impressive?",
    answers: [
      { text: "Equation Group - their methodical, balanced attack frameworks show technical mastery", character: "Yin" },
      { text: "DarkSide Ransomware - monetizing attacks through underground payment networks", character: "Yennifur" },
      { text: "Lazarus Group - unpredictable techniques that constantly evolve and surprise defenders", character: "Yuki" },
      { text: "FIN7 - masterful social engineering campaigns targeting specific victims", character: "Yuma" },
      { text: "Shadow Brokers - exposing vulnerabilities to protect users from government overreach", character: "Yulia" }
    ]
  },
  {
    question: "During a penetration test, your preferred initial access method is:",
    answers: [
      { text: "Custom-coded exploits targeting the perfect balance of risk vs. access", character: "Yin" },
      { text: "Leveraging contacts to obtain insider credentials or physical access", character: "Yennifur" },
      { text: "Unexpected attack vectors that bypass security monitoring entirely", character: "Yuki" },
      { text: "Spear phishing campaigns with convincing personas and communications", character: "Yuma" },
      { text: "Careful reconnaissance to find the least destructive entry point", character: "Yulia" }
    ]
  },
  {
    question: "Your approach to bypassing endpoint detection systems would be:",
    answers: [
      { text: "Writing perfectly balanced custom shellcode that appears as legitimate processes", character: "Yin" },
      { text: "Using rare, expensive malware variants from underground markets", character: "Yennifur" },
      { text: "Creating chaotic, polymorphic code that rapidly mutates to avoid signatures", character: "Yuki" },
      { text: "Manipulating users into disabling security tools through persuasive techniques", character: "Yuma" },
      { text: "Identifying the minimal permissions needed to avoid triggering alerts", character: "Yulia" }
    ]
  },
  {
    question: "Which data exfiltration technique would you most likely implement?",
    answers: [
      { text: "Custom protocols that maintain perfect balance between stealth and bandwidth", character: "Yin" },
      { text: "Transferring data through paid-off insiders and underground couriers", character: "Yennifur" },
      { text: "Unpredictable, constantly changing DNS tunneling algorithms", character: "Yuki" },
      { text: "Hiding data in audio streams during legitimate music performances", character: "Yuma" },
      { text: "Slow, methodical exfiltration designed to avoid triggering security alerts", character: "Yulia" }
    ]
  },
  {
    question: "If dealing with secure authentication systems, you would:",
    answers: [
      { text: "Develop a balanced attack that targets cryptographic implementation flaws", character: "Yin" },
      { text: "Purchase valid credentials from black market sources", character: "Yennifur" },
      { text: "Use unusual side-channel attacks that security teams haven't considered", character: "Yuki" },
      { text: "Manipulate help desk or support staff through social engineering", character: "Yuma" },
      { text: "Look for password reuse across systems to minimize damage to core infrastructure", character: "Yulia" }
    ]
  },
  {
    question: "Your preferred persistence mechanism after gaining access would be:",
    answers: [
      { text: "Perfectly balanced rootkits that hook into the kernel without affecting stability", character: "Yin" },
      { text: "Compromised insiders who maintain access when technical methods are discovered", character: "Yennifur" },
      { text: "Bizarre, rarely-seen persistence techniques in unexpected locations", character: "Yuki" },
      { text: "Malicious browser extensions that victims install through convincing scenarios", character: "Yuma" },
      { text: "Minimal persistence that could be easily removed if needed to protect the system", character: "Yulia" }
    ]
  },
  {
    question: "When analyzing a suspicious file, your approach would be:",
    answers: [
      { text: "Using balanced static and dynamic analysis techniques in a methodical sequence", character: "Yin" },
      { text: "Sending it to contacts with access to specialized private analysis tools", character: "Yennifur" },
      { text: "Unconventional reverse engineering with custom-built analysis environments", character: "Yuki" },
      { text: "Understanding the psychology of the attacker by studying their coding style", character: "Yuma" },
      { text: "Careful analysis in an isolated environment to prevent accidental execution", character: "Yulia" }
    ]
  },
  {
    question: "Your favorite cybersecurity tool is:",
    answers: [
      { text: "Custom-coded frameworks that balance automation and manual control", character: "Yin" },
      { text: "Private zero-day exploit kits available only to those with the right connections", character: "Yennifur" },
      { text: "Glitchy experimental tools that provide unpredictable but brilliant results", character: "Yuki" },
      { text: "Social engineering frameworks that build convincing attack narratives", character: "Yuma" },
      { text: "Defensive tools that identify and mitigate potential risks before exploitation", character: "Yulia" }
    ]
  },
  {
    question: "Your motivation for hacking would most likely be:",
    answers: [
      { text: "Bringing balance to systems by exposing flaws in a controlled manner", character: "Yin" },
      { text: "Financial gain and building a reputation in underground hacking circles", character: "Yennifur" },
      { text: "The thrill of breaking into supposedly 'unhackable' systems", character: "Yuki" },
      { text: "Influencing people and organizations through strategic information control", character: "Yuma" },
      { text: "Protecting vulnerable people from exploitation by discovering and patching threats", character: "Yulia" }
    ]
  }
];

const Quiz = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    Yin: 0,
    Yennifur: 0,
    Yuki: 0,
    Yuma: 0,
    Yulia: 0
  });
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [sparkles, setSparkles] = useState([]);

  // Shuffle function to randomize array elements
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Randomize answers for the current question
  const randomizedAnswers = useMemo(() => {
    return shuffleArray(QUESTIONS[currentQuestionIndex].answers);
  }, [currentQuestionIndex]);

  // Add sparkle effect on button click
  const addSparkle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newSparkle = {
      id: Date.now(),
      style: {
        left: `${e.clientX - rect.left}px`,
        top: `${e.clientY - rect.top}px`,
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
      }
    };
    
    setSparkles(prev => [...prev, newSparkle]);
    
    // Remove sparkle after animation
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1500);
  };

  const handleAnswer = (character) => {
    // Update the score for the selected character
    setScores(prevScores => ({
      ...prevScores,
      [character]: prevScores[character] + 1
    }));

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Calculate percentages and complete the quiz
      const totalPoints = Object.values(scores).reduce((sum, score) => sum + score, 0) + 1; // +1 for the current answer
      const percentages = {};
      
      MEMBERS.forEach(member => {
        const memberScore = member === character ? scores[member] + 1 : scores[member];
        percentages[member] = Math.round((memberScore / totalPoints) * 100);
      });
      
      onComplete(percentages);
    }
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  // Animation variants for questions
  const questionVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    })
  };

  return (
    <div className="quiz-container">
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="question-counter">
        Question {currentQuestionIndex + 1} of {QUESTIONS.length}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQuestionIndex}
          custom={direction}
          variants={questionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="card"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <div className="question">
            {currentQuestion.question}
          </div>

          <div className="answers">
            {randomizedAnswers.map((answer, index) => (
              <motion.button
                key={index}
                className="answer-option"
                onClick={(e) => {
                  addSparkle(e);
                  handleAnswer(answer.character);
                }}
                whileHover={{ scale: 1.03, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                {answer.text}
              </motion.button>
            ))}
          </div>

          {/* Sparkle elements */}
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={sparkle.style}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz; 