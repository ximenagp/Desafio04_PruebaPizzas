import { useNavigate } from "react-router";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import pizza from "../assets/img/pizza.PNG";
import PizzasContext from "../contexts/PizzasContext";
import CarritoContext from "../contexts/CarritoContext";
import "../assets/css/home.css";

export default function Home() {
  const { pizzas } = useContext(PizzasContext);
  const { setCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

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
    <div>
      <div
        className="pizza-background"
        style={{
          backgroundImage: `url(${pizza})`,
        }}
      ></div>
      <Container className="galeria grid-columns-3 pt-5">
        {pizzas.map((pizza) => (
          <Card key={pizza.id} style={{ width: "100%" }}>
            <Card.Img variant="top" src={pizza.img} />
            <Card.Body>
              <Card.Title className="name-pizza">{pizza.name}</Card.Title>
              <Card.Title>Ingredientes:</Card.Title>
              <ul>
                {pizza.ingredients.map((ingredientes, id) => (
                  <li className="listado-pizzas" key={id}>
                    🍕  {ingredientes}
                  </li>
                ))}
              </ul>
              <div className="precio-pizza">${pizza.price}</div>

              <div className="botones">
                <Button
                  variant="primary"
                  onClick={() => navigate(`/pizza/${pizza.id}`)}
                > Ver más 👀 </Button>
                
                <Button
                  variant="danger"
                  onClick={() =>
                    agregarAlCarrito(
                      pizza.id,
                      pizza.price,
                      pizza.name,
                      pizza.img
                    )
                  }
                > Añadir 🛒</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}
