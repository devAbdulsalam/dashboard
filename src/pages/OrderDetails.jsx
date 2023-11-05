// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../hooks/axiosApis';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
const OrderDetails = () => {
	const { user } = useContext(AuthContext);
	// const navigate = useNavigate();
	const [search, setSearch] = useState();
	const { data, isLoading, error } = useQuery(['products'], async () =>
		fetchProduct(user)
	);
	useEffect(() => {
		if (data) {
			console.log(data);
			// navigate('/');/
		}
		if (error) {
			console.log(error);
			toast.error(error?.message);
		}
	}, [data, error]);
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Order Details</h3>
						<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
							<li className="breadcrumb-item text-muted">
								<a href="product-list.html" className="text-hover-primary">
									{' '}
									Home
								</a>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">
								Order Details #19893507
							</li>
						</ul>
					</div>
				</div>

				{/* <!-- table --> */}
				<div className="">
					<div className="flex items-center flex-wrap justify-between px-8 mb-6 bg-white rounded-t-md rounded-b-md shadow-xs py-6">
						<div className="relative">
							<h5 className="font-normal mb-0">Oder ID : #26BC663E</h5>
							<p className="mb-0 text-tiny">
								Order Created : Jan 26, 2023 10:30 AM
							</p>
						</div>
						<div className="flex sm:justify-end flex-wrap sm:space-x-6 mt-5 md:mt-0">
							<div className="search-select mr-3 flex items-center space-x-3 ">
								<span className="text-tiny inline-block leading-none -translate-y-[2px]">
									Change Status :{' '}
								</span>
								<select>
									<option>Delivered</option>
									<option>Pending</option>
									<option>Refunded</option>
									<option>Denied</option>
								</select>
							</div>
							<div className="product-add-btn flex ">
								<a href="#" className="tp-btn ">
									Save
								</a>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-6">
						<div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
							<h5>Customer Details</h5>

							<div className="relative overflow-x-auto ">
								<table className="w-[400px] sm:w-full text-base text-left text-gray-500">
									<tbody>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Name
											</td>
											<td className="py-3 whitespace-nowrap ">
												<a
													href="#"
													className="flex items-center justify-end space-x-5 text-end text-heading text-hover-primary"
												>
													<img
														className="w-10 h-10 rounded-full"
														src="assets/img/users/user-10.jpg"
														alt=""
													/>
													<span className="font-medium ">Shahnewaz Sakil</span>
												</a>
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Email
											</td>
											<td className="py-3 text-end">
												<a href="mailto:support@mail.com">support@mail.com</a>
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Phone
											</td>
											<td className="py-3 text-end">
												<a href="tel:9458785014">+9458 785 014</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
							<h5>Order Summary</h5>

							<div className="relative overflow-x-auto ">
								<table className="w-[400px] sm:w-full text-base text-left text-gray-500">
									<tbody>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Order Date
											</td>
											<td className="py-3 whitespace-nowrap text-end">
												04/05/2023
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Payment Method
											</td>
											<td className="py-3 text-end">
												Online{' '}
												<img
													className="w-[40px] h-auto"
													src="assets/img/icons/visa.svg"
													alt=""
												/>
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Shipping Method
											</td>
											<td className="py-3 text-end">Cash On Delivery</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
							<h5>Deliver To</h5>

							<div className="relative overflow-x-auto ">
								<table className="w-[400px] sm:w-full text-base text-left text-gray-500">
									<tbody>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[40%]">
												House
											</td>
											<td className="py-3 text-end">
												7765 Spring Circle Chicago, IL 60621
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[40%]">
												Street
											</td>
											<td className="py-3 whitespace-nowrap text-end">
												3169 Hamilton Drive
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[40%]">
												State
											</td>
											<td className="py-3 text-end">Texas</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 2xl:col-span-8">
							<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-8">
								<div className="relative overflow-x-auto  mx-8">
									<table className="w-[975px] md:w-full text-base text-left text-gray-500">
										<thead className="bg-white">
											<tr className="border-b border-gray6 text-tiny">
												<th
													scope="col"
													className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
												>
													Product
												</th>
												<th
													scope="col"
													className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
												>
													Unit Price
												</th>
												<th
													scope="col"
													className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
												>
													Quantity
												</th>
												<th
													scope="col"
													className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
												>
													Total
												</th>
											</tr>
										</thead>
										<tbody>
											<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
												<td className="pr-8 py-5 whitespace-nowrap">
													<a href="#" className="flex items-center space-x-5">
														<img
															className="w-[40px] h-[40px] rounded-md"
															src="assets/img/product/prodcut-1.jpg"
															alt=""
														/>
														<span className="font-medium text-heading text-hover-primary transition">
															Whitetails Women's Open Sky
														</span>
													</a>
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													$171.00
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													37
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													$1200.33
												</td>
											</tr>
											<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
												<td className="pr-8 py-5 whitespace-nowrap">
													<a href="#" className="flex items-center space-x-5">
														<img
															className="w-[40px] h-[40px] rounded-md"
															src="assets/img/product/prodcut-2.jpg"
															alt=""
														/>
														<span className="font-medium text-heading text-hover-primary transition">
															Red Bag for kids
														</span>
													</a>
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													$15.00
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													10
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													$15.00
												</td>
											</tr>
											<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
												<td className="pr-8 py-5 whitespace-nowrap">
													<a href="#" className="flex items-center space-x-5">
														<img
															className="w-[40px] h-[40px] rounded-md"
															src="assets/img/product/prodcut-3.jpg"
															alt=""
														/>
														<span className="font-medium text-heading text-hover-primary transition">
															Sports shoe for women
														</span>
													</a>
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													$145.00
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													20
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													$2500.00
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="col-span-12 2xl:col-span-4">
							<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-8 px-8">
								<h5>Order Price</h5>
								<div className="relative overflow-x-auto">
									<table className="w-full text-base text-left text-gray-500">
										<tbody>
											<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
												<td className="pr-3 py-3 pt-6 font-normal text-[#55585B] text-start">
													Subtotal
												</td>
												<td className="px-3 py-3 pt-6 font-normal text-[#55585B] text-end">
													$1237.00
												</td>
											</tr>
											<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
												<td className="pr-3 py-3 font-normal text-[#55585B] text-start">
													Shipping cost:
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													$49.55
												</td>
											</tr>
											<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
												<td className="pr-3 py-3 font-normal text-[#55585B] text-start">
													Grand total:
												</td>
												<td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
													$1310.55
												</td>
											</tr>
										</tbody>
									</table>
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
export default OrderDetails