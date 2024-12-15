import Home from './pages/Home';
import  { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <>
      <Home />
      <Toaster />
    </>
  )
}

export default App
