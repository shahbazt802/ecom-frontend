import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

import { FormContainer } from "../components/FormContainer";

import { saveShippingAddress } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";

const Shipping_Screen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setcity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const location = useLocation();
  const history = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("shisk");}
    dispatch(saveShippingAddress({ address, city, country, postalCode }));
    history("/payment");
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>
            Address
            <Form.Control required type='text' placeholder='Enter Address' value={address ? address : ""} onChange={(e) => setAddress(e.target.value)}></Form.Control>
          </Form.Label>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>
            City
            <Form.Control required type='text' placeholder='Enter City' value={city ? city : ""} onChange={(e) => setcity(e.target.value)}></Form.Control>
          </Form.Label>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>
            Postal Code
            <Form.Control required type='text' placeholder='Enter PostalCode' value={postalCode ? postalCode : ""} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
          </Form.Label>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>
            Country
            <Form.Control required type='text' placeholder='Enter Country' value={country ? country : ""} onChange={(e) => setCountry(e.target.value)}></Form.Control>
          </Form.Label>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Countinue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping_Screen;
