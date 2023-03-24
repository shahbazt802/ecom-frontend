/** @format */

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { login } from "../actions/userActions";
import { FormContainer } from "../components/FormContainer";
export const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useNavigate();
	const redirect = location.search ? location.search.split("=")[1] : "/";

	const userLogin = useSelector((state) => state.userLogin);
	const { error, loading, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			history(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	return (
		<FormContainer>
			<h1>Sign in</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>
						Email Address
						<Form.Control
							type='email'
							placeholder='Enter Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}></Form.Control>
					</Form.Label>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>
						Password
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}></Form.Control>
					</Form.Label>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					New Customer?
					<Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};
