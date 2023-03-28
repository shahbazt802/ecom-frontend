import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constant/userConstant";

const ProfileScreen = () => {
  const [name, setName] = useState("");

  const [condirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== condirmPassword) {
      setMessage("Password does'nt match");
    } else {
      //   console.log("updating....");
      dispatch(
        updateUserProfile({
          id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>
              Name
              <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Label>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>
              Email Address
              <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Label>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>
              Password
              <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Label>
          </Form.Group>
          <Form.Group controlId='confirmpassword'>
            <Form.Label>
              Confirm Password
              <Form.Control type='password' placeholder='Confirm Password' value={condirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
              {message.length !== 0 ? <p>{message}</p> : null}
            </Form.Label>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2> My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
