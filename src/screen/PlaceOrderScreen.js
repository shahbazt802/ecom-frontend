import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Form, Button, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

import { FormContainer } from "../components/FormContainer";

import { saveShippingAddress } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  console.log("cart", cart);
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.pice * item.qty, 0).toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 10 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  const placeOrder = () => {
    console.log("place order");
  };

  return (
    <div>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping:</strong>
                {cart.shippingAddressFromStorage.address},{cart.shippingAddressFromStorage.city},{cart.shippingAddressFromStorage.postalCode},{cart.shippingAddressFromStorage.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Item</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant='info'>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty}X ${item.pice}=${(item.qty * item.pice).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrder()}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
