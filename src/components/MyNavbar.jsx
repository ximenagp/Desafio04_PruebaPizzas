import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../assets/css/my_navbar.css";
import CarritoContext from "../contexts/CarritoContext";
import { useContext } from "react";

export default function Mynavbar() {
  const { carrito } = useContext(CarritoContext);
  const totalPrice = carrito.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <Navbar bg="info" variant="dark">
      <Container className="mynavbar">
        <div>
          <Link className="links icono-navbar" to="/">
            🍕Pizzeria Mamma Mia!{" "}
          </Link>
        </div>
        <Navbar.Collapse className="justify-content-end">
          <Link className="icono-navbar" to="/carrito">
            🛒{" "}
          </Link>
          <div className="links">$ {totalPrice}</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
