/** @format */

import React from "react";
import products from "../products";
import { useParams, Link } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	Card,
	Form,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
// Components
import { Rating } from "../components/Rating";
import { useState } from "react";
import { useEffect } from "react";
import { Loader } from "../components/Loader";

import { Message } from "../components/Message";

export const ProductScreen = ({ match }) => {
	let history = useNavigate();
	const { id } = useParams();
	// console.log(history);
	// const product = products.find((p) => String(p._id) === id);
	// const [product, setProduct] = useState([]);
	const dispatch = useDispatch();
	const [qty, setQty] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	useEffect(() => {
		// async function fetchProduct() {
		// 	const { data } = await axios.get(`/api/products/${String(id)}`);
		// 	setProduct(data);
		// }
		// fetchProduct();
		// console.log(product);
		dispatch(listProductDetails(String(id)));
	}, []);
	// let product = [];

	const handleAddToCard = () => {
		// console.log(id);
		history(`/cart/${id}?qty=${qty}`);
		// <LinkContainer to='/cart/'></LinkContainer>;
	};
	return (
		<div>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
									color={"#f8e825"}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: ${product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price :</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status :</Col>
										<Col>
											<strong>
												{" "}
												{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col xs='auto' className='my-1'>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										type='button'
										className='btn-block'
										onClick={handleAddToCard}
										disabled={product.countInStock == 0}>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	);
};
