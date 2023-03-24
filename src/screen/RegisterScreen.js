/** @format */

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

import { FormContainer } from "../components/FormContainer";
import { register } from "../actions/userActions";

export const RegisterScreen = () => {
	const [name, setName] = useState("");

	const [condirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useNavigate();
	const redirect = location.search ? location.search.split("=")[1] : "/";

	const userRegister = useSelector((state) => state.userRegister);
	const { error, loading, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			history(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== condirmPassword) {
			setMessage("Password does'nt match");
		} else {
			dispatch(register(name, email, password));
		}
	};
	return (
		<FormContainer>
			<h1>Sign in</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>
						Name
						<Form.Control
							type='name'
							placeholder='Enter Name'
							value={name}
							onChange={(e) => setName(e.target.value)}></Form.Control>
					</Form.Label>
				</Form.Group>
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
				<Form.Group controlId='confirmpassword'>
					<Form.Label>
						Confirm Password
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							value={condirmPassword}
							onChange={(e) =>
								setConfirmPassword(e.target.value)
							}></Form.Control>
						{message.length !== 0 ? <p>{message}</p> : null}
					</Form.Label>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Sign Up
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Have an Account?
					<Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};
