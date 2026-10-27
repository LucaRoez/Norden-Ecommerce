import './App.css';
import NavBar from './components/layout/NavBar.js';
import Home from './pages/Home.js';

function App() {
  return (
    <>
      <NavBar />
      <main id="main-body" className="bg-surface">
        <Home />
      </main>
      <footer></footer>
    </>
  )
}

export default App
