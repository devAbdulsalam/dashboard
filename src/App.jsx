import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProtectedRoutes from './hooks/ProtectedRoutes';
import Layout from './Layout';
import DashboardLayout from './DashboardLayout';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductGrid from './pages/ProductGrid';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Dashboard from './pages/Dashboard';
import ForgetPassword from './pages/ForgetPassword';
import SiteSetting from './pages/SiteSetting';
import Category from './pages/Category';
import Coupon from './pages/Coupon';
import Order from './pages/Order';
import OrderDetails from './pages/Order';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions';
import Transaction from './pages/Transaction';
import CustomersList from './pages/CustomersList';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import NotFound from './NotFound';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/forgot" element={<ForgetPassword />}></Route>
					{/* <Route element={<ProtectedRoutes />}> */}
					<Route exact path="/" element={<DashboardLayout />}>
						<Route path="/" element={<Dashboard />}></Route>
						<Route path="/products" element={<Product />}></Route>
						<Route path="/product-grid" element={<ProductGrid />}></Route>
						<Route path="/add-product" element={<AddProduct />}></Route>
						<Route path="/products/:id" element={<EditProduct />}></Route>
						<Route path="/category" element={<Category />}></Route>
						<Route path="/coupon" element={<Coupon />}></Route>
						<Route path="/profile" element={<Profile />}></Route>
						<Route path="/orders" element={<Order />}></Route>
						<Route path="/orders/id" element={<OrderDetails />}></Route>
						<Route path="/customers" element={<CustomersList />}></Route>
						<Route path="/transactions" element={<Transactions />}></Route>
						<Route path="/transactions/id" element={<Transaction />}></Route>
						<Route path="/site-settings" element={<SiteSetting />}></Route>
						<Route path="/reviews" element={<Reviews />}></Route>
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;