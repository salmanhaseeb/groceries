import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/header"
import Checkout from "./pages/checkout"
import Home from "./pages/home"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const App = () => {
  const { isError, message } = useSelector((state) => state.items)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  return (
    <>
      <Router>
        <div className="container py-5">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
