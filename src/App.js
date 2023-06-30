import Navbar from "./components/MyNavbar";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PizzasContext from "./contexts/PizzasContext";
import CarritoContext from "./contexts/CarritoContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./views/Home";
import Pizza from "./views/Pizza";
import Carrito from "./views/Carrito";


export default function App() {

  const endpoint = "./pizzas.json";

  const [pizzas, setPizzas] = useState([])
  const sharedPizzasContextState = { pizzas, setPizzas }

  const [carrito, setCarrito] = useState([])
  const sharedCarritoContextState = { carrito, setCarrito }

  const getPizzas = async () => {
    const response = await fetch(endpoint)
    let data = await response.json()
    setPizzas(data)
  }

  useEffect(() => {
    getPizzas()
  }, [])

  return (
    <div className="App">      
      <CarritoContext.Provider value={sharedCarritoContextState}>
      <PizzasContext.Provider value={sharedPizzasContextState}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </Router>                
      </PizzasContext.Provider>  
      </CarritoContext.Provider>     
    </div>
  );
}


