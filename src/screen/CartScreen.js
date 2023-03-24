/** @format */

import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import { cartActions } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import { Message } from "../components/Message";
import { removeFromCart } from "../actions/cartActions";

export const CartScreen = () => {
	const location = useLocation();
	const { id } = useParams();
	const history = useNavigate();
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;
	// console.log("qtcy", qty);

	// console.log(id);
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	console.log(cartItems);

	useEffect(() => {
		if (id) {
			dispatch(cartActions(id, qty));
		}
	}, [dispatch, id, qty]);
	const removeCartItem = (id) => {
		dispatch(removeFromCart(id));
	};

	const chekoutHandler = () => {
		history("/login?redirect=shipping");
	};
	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message variant='info'>
						Your Cart is Empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/products/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.pice}</Col>
									<Col md={3}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												dispatch(
													cartActions(item.product, Number(e.target.value))
												)
											}>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={1}>
										<Button
											variant='light'
											type='button'
											onClick={() => removeCartItem(item.product)}>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								{" "}
								SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
							</h2>
							$
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.pice, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								className='btn=block'
								type='button'
								disabled={cartItems.length === 0}
								onClick={chekoutHandler}>
								Proceed to CheckOut
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};
