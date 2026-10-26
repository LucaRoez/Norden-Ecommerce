import { useState } from 'react';
import './App.css';
import Hero from './pages/Hero.jsx';
import NavBar from './components/layout/NavBar.jsx';

function App() {
  return (
    <>
      <NavBar />
      <main id="main-body" className="bg-surface">
        <Hero />
      </main>
      <footer></footer>
    </>
  )
}

export default App
