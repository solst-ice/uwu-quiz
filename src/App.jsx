import { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import Quiz from './components/Quiz'
import Intro from './components/Intro'
import Results from './components/Results'

function App() {
  const [currentPage, setCurrentPage] = useState('intro')
  const [results, setResults] = useState(null)

  // Function to handle navigation between pages
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  // Function to handle quiz completion
  const handleQuizComplete = (quizResults) => {
    setResults(quizResults)
    navigateTo('results')
  }

  return (
    <motion.div 
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="app-header">
        <h1>Which UwU-Underground Member Are You?</h1>
        <div className="uwu-subtitle">Hack your way to your digital soulmate~</div>
      </header>

      {currentPage === 'intro' && (
        <Intro onStart={() => navigateTo('quiz')} />
      )}

      {currentPage === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} />
      )}

      {currentPage === 'results' && (
        <Results 
          results={results} 
          onRetry={() => navigateTo('intro')} 
        />
      )}

      <footer className="app-footer">
        <p>UwU-Underground Fan Quiz - Hack the planet with kawaii energy!</p>
      </footer>
    </motion.div>
  )
}

export default App
