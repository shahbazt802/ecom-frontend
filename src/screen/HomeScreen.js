/** @format */

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import products from "../products";
import { Product } from "../components/Product";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
// component
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

export const HomeScreen = () => {
	// const [products, setProducts] = useState([]);
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { error, loading, products } = productList;

	useEffect(() => {
		// async function fetchProducts() {
		// 	const { data } = await axios.get("/api/products/");
		// 	setProducts(data);
		// }
		// fetchProducts();
		// console.log(products);
		dispatch(listProducts());
	}, []);
	// const products = [];

	// const products = [];
	return (
		<div>
			<h1>Product List</h1>
			{loading ? (
				// <h1>Loading....</h1>
				<Loader />
			) : error ? (
				// <h1>{error}</h1>
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<h3>{product.brand}</h3>
							<h2>{product.countInStock}</h2>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</div>
	);
};
