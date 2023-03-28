/** @format */
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Rouuter
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Screens
import { HomeScreen } from "./screen/HomeScreen";
import { ProductScreen } from "./screen/ProductScreen";

import { CartScreen } from "./screen/CartScreen";
import { LoginScreen } from "./screen/LoginScreen";

import { RegisterScreen } from "./screen/RegisterScreen";

import ProfileScreen from "./screen/ProfileScreen";
import Shipping_Screen from "./screen/Shipping_Screen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3'>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/shipping' element={<Shipping_Screen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            {/* <HomeScreen /> */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
