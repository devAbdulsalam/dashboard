// import React from 'react'
import { Fragment, useState, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useNavigate, Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Search from '../components/Search';
import ProductTable from '../components/ProductTable';

const Product = () => {
	const { user, selectedProduct, setSelectedProduct } = useContext(AuthContext);
	const navigate = useNavigate();
	const apiUrl = import.meta.env.VITE_API_URL;
	const [products, setProducts] = useState([]);
	const { data, isLoading, error } = useQuery(['products'], async () =>
		fetchProducts(user)
	);
	const [isDeleteProductModal, setShowDeleteProductModal] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (data && data?.length > 0) {
			setProducts(data);
			// console.log(data);
			// navigate('/');/
		}
		if (error) {
			console.log(error);
			toast.error(error?.message);
		}
	}, [data, error]);
	const handleDelete = (product) => {
		// console.log(product);
		setShowDeleteProductModal(true);
		setSelectedProduct(product);
	};
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			'Content-Type': 'multipart/form-data',
		},
	};
	const queryClient = useQueryClient();
	const handleDeleteProduct = async (product) => {
		setLoading(true);
		setShowDeleteProductModal(false);
		try {
			axios
				.delete(`${apiUrl}/products/${product._id}`, config)
				.then((res) => {
					if (res.data) {
						toast.success('Product deleted successfully');
					}
					queryClient.invalidateQueries(['products']);
				})
				.catch((error) => {
					toast.error(error.message);
					console.log(error);
					setShowDeleteProductModal(true);
				})
				.finally(() => {
					setLoading(false);
					// setShowDeleteProductModal(false);
					setSelectedProduct('');
				});
		} catch (error) {
			console.log(error);
		}
	};
	const handleEdit = (product) => {
		setSelectedProduct(product);
		navigate(`/products/${product._id}/edit`);
	};
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Products</h3>
						<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
							<li className="breadcrumb-item text-muted">
								<Link to={'/products'} className="text-hover-primary">
									{' '}
									Home
								</Link>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">Product List</li>
						</ul>
					</div>
				</div>

				{/* <!-- table --> */}
				<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
					<ProductTable
						data={products}
						handleDelete={handleDelete}
						handleEdit={handleEdit}
					/>
					<hr />
					<div className="tp-search-box flex items-center justify-between px-8 py-8">
						<Search />
						<div className="flex justify-end space-x-6">
							<div className="search-select mr-3 flex items-center space-x-3 ">
								<span className="text-tiny inline-block leading-none -translate-y-[2px]">
									Status :{' '}
								</span>
								<select>
									<option>Active</option>
									<option>In Active</option>
									<option>Scheduled</option>
									<option>Low Stock</option>
									<option>Out of Stock</option>
								</select>
							</div>
							<div className="product-add-btn flex ">
								<Link to={'/add-product'} className="tp-btn">
									Add Product
								</Link>
							</div>
						</div>
					</div>
					<div className="relative overflow-x-auto  mx-8">
						<table className="w-full text-base text-left text-gray-500">
							<thead className="bg-white">
								<tr className="border-b border-gray 6 text-tiny">
									<th
										scope="col"
										className=" py-3 text-tiny text-text2 uppercase font-semibold w-[3%]"
									>
										<div className="tp-checkbox -translate-y-[3px]">
											<input id="selectAllProduct" type="checkbox" />
											<label htmlFor="selectAllProduct"></label>
										</div>
									</th>
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
										SKU
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
									>
										QTY
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
									>
										Price
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
									>
										Rating
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
									>
										Status
									</th>
									<th
										scope="col"
										className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end"
									>
										Action
									</th>
								</tr>
							</thead>
							{/* <tbody>
								{products?.map((product) => {
									return (
										<tr
											key={product._id}
											className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
										>
											<td className="pr-3  whitespace-nowrap">
												<div className="tp-checkbox">
													<input id="product-1" type="checkbox" />
													<label htmlFor="product-1"></label>
												</div>
											</td>
											<td className="pr-8 py-5 whitespace-nowrap">
												<Link
													to={`/products/${product?._id}`}
													className="flex items-center space-x-5"
												>
													<img
														className="w-[60px] h-[60px] rounded-md"
														src={
															product?.image?.url ||
															product?.image ||
															'assets/img/product/prodcut-1.jpg'
														}
														alt={product?.name}
													/>
													<span className="font-medium text-heading text-hover-primary transition">
														{product?.name}
													</span>
												</Link>
											</td>
											<td className="px-3 py-3 font-normal text-[#55585B] text-end">
												{product?.sku || '#479063DR'}
											</td>
											<td className="px-3 py-3 font-normal text-[#55585B] text-end">
												{product?.quantity <= 0 && (
													<span className="text-[11px] -translate-y-[1px] inline-block text-danger px-3 py-1 rounded-md leading-none bg-danger/10 font-medium text-end">
														Out Of Stock
													</span>
												)}
												{product?.quantity > 0 && product?.quantity < 10 && (
													<span className="text-[11px] -translate-y-[1px] inline-block text-warning px-3 py-1 rounded-md leading-none bg-warning/10 font-medium text-end">
														Low Stock
													</span>
												)}{' '}
												{product?.quantity}
											</td>
											<td className="px-3 py-3 font-normal text-[#55585B] text-end">
												${product?.price}
											</td>
											<td className="px-3 py-3 font-normal text-heading text-end">
												<div className="flex justify-end items-center space-x-1 text-tiny">
													<span className="text-yellow flex items-center space-x-1">
														<i className="fa-solid fa-star"></i>
														<i className="fa-solid fa-star"></i>
														<i className="fa-solid fa-star"></i>
														<i className="fa-solid fa-star"></i>
														<i className="fa-solid fa-star"></i>
													</span>
												</div>
											</td>
											<td className="px-3 py-3 text-end">
												<span className="text-[11px]  text-success px-3 py-1 rounded-md leading-none bg-success/10 font-medium text-end">
													Active
												</span>
											</td>
											<td className="px-9 py-3 text-end">
												<div className="flex items-center justify-end space-x-2">
													<div className="relative">
														<button
															className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
															onMouseEnter={() =>
																handleMouseEnterEdit(product._id)
															}
															onMouseLeave={handleMouseLeaveEdit}
															onClick={() => handleEdit(product)}
															aria-label="Edit"
														>
															<svg
																className="-translate-y-px"
																height="12"
																viewBox="0 0 492.49284 492"
																width="12"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fill="currentColor"
																	d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0"
																/>
																<path
																	fill="currentColor"
																	d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0"
																/>
															</svg>
														</button>
														{showEditTooltip === product._id && (
															<div className="tooltip-container">
																<span className="tooltip-content text-tiny whitespace-no-wrap">
																	Edit
																</span>
																<div className="tooltip-arrow"></div>
															</div>
														)}
													</div>
													<div className="relative">
														<button
															className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
															onMouseEnter={() =>
																handleMouseEnterDelete(product._id)
															}
															onMouseLeave={handleMouseLeaveDelete}
															onClick={() => handleDelete(product)}
														>
															<svg
																className="-translate-y-px"
																width="14"
																height="14"
																viewBox="0 0 20 22"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M19.0697 4.23C17.4597 4.07 15.8497 3.95 14.2297 3.86V3.85L14.0097 2.55C13.8597 1.63 13.6397 0.25 11.2997 0.25H8.67967C6.34967 0.25 6.12967 1.57 5.96967 2.54L5.75967 3.82C4.82967 3.88 3.89967 3.94 2.96967 4.03L0.929669 4.23C0.509669 4.27 0.209669 4.64 0.249669 5.05C0.289669 5.46 0.649669 5.76 1.06967 5.72L3.10967 5.52C8.34967 5 13.6297 5.2 18.9297 5.73C18.9597 5.73 18.9797 5.73 19.0097 5.73C19.3897 5.73 19.7197 5.44 19.7597 5.05C19.7897 4.64 19.4897 4.27 19.0697 4.23Z"
																	fill="currentColor"
																/>
																<path
																	d="M17.2297 7.14C16.9897 6.89 16.6597 6.75 16.3197 6.75H3.67975C3.33975 6.75 2.99975 6.89 2.76975 7.14C2.53975 7.39 2.40975 7.73 2.42975 8.08L3.04975 18.34C3.15975 19.86 3.29975 21.76 6.78975 21.76H13.2097C16.6997 21.76 16.8398 19.87 16.9497 18.34L17.5697 8.09C17.5897 7.73 17.4597 7.39 17.2297 7.14ZM11.6597 16.75H8.32975C7.91975 16.75 7.57975 16.41 7.57975 16C7.57975 15.59 7.91975 15.25 8.32975 15.25H11.6597C12.0697 15.25 12.4097 15.59 12.4097 16C12.4097 16.41 12.0697 16.75 11.6597 16.75ZM12.4997 12.75H7.49975C7.08975 12.75 6.74975 12.41 6.74975 12C6.74975 11.59 7.08975 11.25 7.49975 11.25H12.4997C12.9097 11.25 13.2497 11.59 13.2497 12C13.2497 12.41 12.9097 12.75 12.4997 12.75Z"
																	fill="currentColor"
																/>
															</svg>
														</button>
														{showDeleteTooltip === product._id && (
															<div className="flex flex-col items-center z-50 absolute left-1/2 -translate-x-1/2 bottom-full mb-1">
																<span className="relative z-10 p-2 text-tiny leading-none font-medium text-white whitespace-no-wrap w-max bg-slate-800 rounded py-1 px-2 inline-block">
																	Delete
																</span>
																<div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
															</div>
														)}
													</div>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody> */}
						</table>
					</div>
				</div>
			</div>
			{isLoading || loading ? <Loader /> : ''}
			{/*  Delete product alert modal */}
			<Transition appear show={isDeleteProductModal} as={Fragment}>
				<Dialog as="div" className="relative" onClose={() => {}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/70 bg-opacity-25 z-50" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto flex place-content-center z-50">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all font-josefin">
									<div className="space-y-5 p-4">
										<div className="flex justify-between">
											<div>
												<p className="font-semibold text-lg text-primary">
													Delete Product
												</p>
											</div>
											<button
												onClick={() => setShowDeleteProductModal(false)}
												className="m-1 p-2 py-1 shadow rounded-full hover:bg-red-300 duration-150 ease-in-out"
											>
												<i className="fa-solid fa-xmark text-xl text-red-300 hover:text-red-500" />
											</button>
										</div>
										<div className="p-2">
											<p className="text-center ">
												Are you sure you want to delete this product?
											</p>
											<div className="flex items-center space-x-5">
												<img
													className="w-[60px] h-[60px] rounded-md"
													src={
														selectedProduct?.image?.url ||
														selectedProduct?.image
													}
													alt={selectedProduct?.name}
												/>
												<p className=" text-center">{selectedProduct?.name}</p>
											</div>
										</div>
										<button
											className="bg-red-500 hover:bg-red-400 text-white font-semibold h-10 py-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
											onClick={() => handleDeleteProduct(selectedProduct)}
										>
											<span>Delete Product</span>
											<i className="fa-solid fa-delete text-2xl text-primary"></i>
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Product;
