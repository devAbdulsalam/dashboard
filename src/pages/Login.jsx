import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LocalStorage } from '../hooks/LocalStorage';
const Login = () => {
	const { user, setUser } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			return toast.error('error.message');
		}
		try {
			setIsLoading(true);
			const data = { email, password };
			console.log(data);
			axios
				.post(`${apiUrl}/management/login`, data)
				.then((res) => {
					if (res.data) {
						toast.success('Logged in successfully');
					}
					setUser({ ...res.data.user, token: res.data.token });
					LocalStorage.set('user', { ...res.data.user, token: res.data.token });
					console.log(user);
					// LocalStorage.set('token', user.token);
					if (rememberMe) {
						LocalStorage.set('rememberMe', 'true');
						LocalStorage.set('username', user);
					} else {
						LocalStorage.remove('rememberMe');
						LocalStorage.remove('username');
					}
				})
				.catch((error) => {
					console.log(error);
					toast.error(error.message);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};
	const backgroundImageUrl = 'url(assets/img/bg/login-bg.jpg)';
	const bgImage = {
		backgroundImage: backgroundImageUrl,
	};
	return (
		<>
			<div className="tp-main-wrapper h-screen">
				<div className="container mx-auto my-auto h-full flex items-center justify-center">
					<div className="pt-[120px] pb-[120px]">
						<div className="grid grid-cols-12 shadow-lg bg-white overflow-hidden rounded-md ">
							<div className="col-span-4 lg:col-span-6 relative h-full hidden lg:block">
								<div
									style={bgImage}
									className="data-bg absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat"
								></div>
							</div>
							<div className="col-span-12 lg:col-span-6 md:w-[500px] mx-auto my-auto  pt-[50px] py-[60px] px-5 md:px-[60px]">
								<div className="text-center">
									<h4 className="text-[24px] mb-1">Login Now.</h4>
								</div>
								<div className="">
									<form onSubmit={handleSubmit}>
										<div className="mb-5">
											<p className="mb-0 text-base text-black">
												Email <span className="text-red">*</span>
											</p>
											<input
												className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
												type="email"
												placeholder="Enter Your Email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
										<div className="mb-5">
											<p className="mb-0 text-base text-black">
												Password <span className="text-red">*</span>
											</p>
											<input
												className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
												type="password"
												placeholder="Password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<div className="flex items-center justify-between">
											<div className="tp-checkbox flex items-start space-x-2 mb-3">
												<input
													id="product-1"
													type="checkbox"
													checked={rememberMe}
													onChange={() => setRememberMe(!rememberMe)}
												/>
												<label htmlFor="product-1" className="text-tiny">
													Remember Me
												</label>
											</div>
										</div>
										<button
											type="submit"
											className="tp-btn h-[49px] w-full justify-center"
										>
											Sign In
										</button>
										<div className="mb-4">
											<a
												href="/forgot"
												className="text-tiny font-medium text-theme border-b border-transparent hover:border-theme"
											>
												Forgot Password ?
											</a>
										</div>
									</form>
								</div>
								<div className="text-center text-sm text-gray-900 mt-4">
									<div className="text-gray-500 mt-2.5">
										Not have a account ?
										<Link
											to={'/register'}
											className="text-gray-800 hover:text-emerald-500 font-bold mx-2"
										>
											Register
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default Login;
