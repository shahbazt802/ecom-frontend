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
						<Route path='/products/:id' element={<ProductScreen />} />
						<Route path='/cart/:id?' element={<CartScreen />} />
						{/* <HomeScreen /> */}
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
