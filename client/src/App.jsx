import './layout.scss';
import Navbar from './components/Navbar/Navbar';
import HomePage from './routes/HomePage/HomePage';

function App() {
  return (
    <div className="layout">
      <Navbar/>
      <div className="content">
        <HomePage/>
      </div>
    </div>
  )
}

export default App