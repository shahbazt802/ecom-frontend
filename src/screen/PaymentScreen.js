import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

import { FormContainer } from "../components/FormContainer";

import { savePaymentMethod } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";

const PaymentScreen = () => {
  const location = useLocation();
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();
  if (!shippingAddress.address) {
    history("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("shisk");}
    dispatch(savePaymentMethod({ paymentMethod }));
    history("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutStep step3 />
      <h1></h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'> Select Method </Form.Label>
          <Col>
            <Form.Check type='radio' label='Paypal or Credit Card' id='paypal' name='paymentMethod' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          {" "}
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
