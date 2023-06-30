import { useParams } from "react-router-dom";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import PizzasContext from "../contexts/PizzasContext";
import CarritoContext from "../contexts/CarritoContext";
import "../assets/css/pizza.css";

export default function Pizza() {
  const { id } = useParams();
  const { pizzas } = useContext(PizzasContext);
  const { setCarrito } = useContext(CarritoContext);
  const pizza = pizzas.filter((pizza) => pizza.id === id);

  const agregarAlCarrito = (id, price, name, img) => {
    setCarrito((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id);
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { id, quantity: 1, price, img, name }];
      }
    });
  };

  return (
    <>
      {pizza.length > 0 ? (
        <Container className="detalle-pizza">
          <div>
            <img
              className="img-pizza-seleccionada"
              src={pizza[0].img}
              alt="imagen de referencia pizza"/>
          </div>
          <div className="info-pizza">
            <div className="name-pizza">
              <p>{pizza[0].name}</p>
            </div>
            <div> {pizza[0].desc}</div>
            <div className="titulo-ingredientes"> Ingredientes:</div>

            <ul className="listado-ingredientes">
              {pizza[0].ingredients.map((ingredient, i) => (
                <li key={i}>🍕 {ingredient}</li>
              ))}
            </ul>
            <div className="boton-y-precio">
              <div className="precio">Precio: $ {pizza[0].price}</div>
              <Button
                variant="danger"
                onClick={() =>
                  agregarAlCarrito(
                    pizza[0].id,
                    pizza[0].price,
                    pizza[0].name,
                    pizza[0].img
                  )
                }
              >
                Añadir🛒
              </Button>
            </div>
          </div>
        </Container>
      ) : (
        <div></div>
      )}
    </>
  );
}
