// import React from 'react'
// import { useQuery } from '@tanstack/react-query';
import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import RadioInput from '../components/RadioInput';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
const EditProduct = () => {
	const { user, selectedProduct, setSelectedProduct } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	useEffect(() => {
		if (!selectedProduct) {
			navigate('/products');
		}
		console.log(selectedProduct);
	}, [selectedProduct, navigate]);
	const [addProductTab, setAddProductTab] = useState(1);
	const [name, setName] = useState(selectedProduct?.name);
	const [description, setDescription] = useState(selectedProduct?.description);
	const [price, setPrice] = useState(selectedProduct?.price);
	const [sku, setSku] = useState(selectedProduct?.sku);
	const [quantity, setQuantity] = useState(selectedProduct?.quantity);
	const [vat, setVat] = useState(selectedProduct?.vat);
	const [height, setHeight] = useState(selectedProduct?.height);
	const [weight, setWeight] = useState(selectedProduct?.weight);
	const [width, setWidth] = useState(selectedProduct?.width);
	const [cost, setCost] = useState(selectedProduct?.shippingCost);
	const discountOptions = ['no discount', 'fixed discount', 'percent discount'];
	const [discountType, setDiscountType] = useState(
		selectedProduct?.discountType
	);
	const [discount, setDiscount] = useState(selectedProduct?.discount);
	const [color, setColor] = useState(selectedProduct?.color);
	const [size, setsize] = useState(selectedProduct?.size);
	const [tag, setTag] = useState(selectedProduct?.tag);
	const [subCategory, setSubCategory] = useState(selectedProduct?.subCategory);
	const [category, setCategory] = useState(selectedProduct?.category);
	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const hiddenFileInput = useRef(null);
	const [isLoading, setIsLoading] = useState(null);
	const queryClient = useQueryClient();
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			'Content-Type': 'multipart/form-data',
		},
	};

	const handleRadioChange = (type) => {
		setDiscountType(type);
		setDiscount('');
	};
	const handleUpdateProduct = async () => {
		const data = {
			name,
			description,
			price,
			sku,
			quantity,
			vat,
			discountType,
			discount,
			shippingCost: cost,
			width,
			weight,
			height,
			category,
			subCategory,
			tags: tag,
			size,
			color,
		};

		if (name === '') {
			return toast.error('product name is required');
		}
		if (description === '') {
			return toast.error('product description is required');
		}
		if (price === '') {
			return toast.error('product price is required');
		}
		if (quantity === '') {
			return toast.error('product quantity is required');
		}
		if (image === '') {
			return toast.error('product image is required');
		}
		setIsLoading(true);
		try {
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			formData.append('image', imageFile);
			axios
				.patch(`${apiUrl}/products/${selectedProduct._id}`, formData, config)
				.then((res) => {
					if (res.data) {
						toast.success('Product updated successfully');
					}
					console.log(res);
					queryClient.invalidateQueries(['products']);
					navigate('/products');
				})
				.catch((error) => {
					toast.error(error.message);
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};
	const handleCancel = () => {
		setSelectedProduct('');
		navigate('/products');
	};
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		const maxSize = 5 * 1024 * 1024; // 5MB in bytes
		const validTypes = ['image/svg+xml', 'image/jpeg', 'image/png'];
		const isValidType = validTypes.includes(file.type);
		if (!file) {
			return toast.error('add a valid image');
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		if (!isValidType) {
			toast.error('Invalid file type. Only SVG, JPEG, and PNG are allowed.');
			return;
		}
		if (file.size > maxSize) {
			return toast.error('Image size must be less than 5Mb');
		}
		const imgname = file.name;
		setImageName(imgname);
		reader.onloadend = () => {
			const imageDataURL = reader.result;
			setImage(imageDataURL);
			setImageFile(file);
		};
	};
	const handleClick = () => {
		hiddenFileInput.current.click();
	};
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="grid grid-cols-12">
					<div className="col-span-12 2xl:col-span-10">
						<div className="flex justify-between mb-10 items-end flex-wrap">
							<div className="page-title mb-6 sm:mb-0">
								<h3 className="mb-0 text-[28px]">Edit Product</h3>
								<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
									<li className="breadcrumb-item text-muted">
										<Link to={'./'} className="text-hover-primary">
											{' '}
											Home
										</Link>
									</li>
									<li className="breadcrumb-item flex items-center">
										<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
									</li>
									<li className="breadcrumb-item text-muted">Edit Product</li>
								</ul>
							</div>
							<div className="mb-2 flex sm:justify-end items-center flex-wrap">
								<button
									onClick={handleUpdateProduct}
									className="tp-btn px-10 py-2 mr-2 sm:mb-0 mb-2"
								>
									Save
								</button>
								<button
									onClick={handleCancel}
									className="tp-btn px-10 py-2 border border-[#dfdfdf] bg-transparent text-black hover:text-black hover:bg-white hover:border-white sm:mb-0 mb-2"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* <!-- add product --> */}
				<div className="grid grid-cols-12">
					<div className="col-span-12 2xl:col-span-10">
						<div className=" mb-3 hidden">
							<div className="flex items-center bg-white rounded-md px-4 py-3">
								<button
									onClick={() => setAddProductTab(1)}
									className={`text-base  py-1 px-5 rounded-md border-b border-transparent ${
										addProductTab == 1
											? 'bg-theme text-white'
											: ' bg-white text-textBody'
									}`}
								>
									General
								</button>
								<button
									onClick={() => setAddProductTab(2)}
									className={`text-base  py-1 px-5 rounded-md ${
										addProductTab == 2
											? 'bg-theme text-white'
											: 'text-textBody bg-white'
									}`}
								>
									Advanced
								</button>
							</div>
						</div>
						<div className="">
							{/* // <!-- general tab content --> */}
							<div className="">
								<div className="grid grid-cols-12 gap-6 mb-6">
									<div className="col-span-12 xl:col-span-8 2xl:col-span-9 ">
										<div className="mb-6 bg-white px-8 py-8 rounded-md">
											<h4 className="text-[22px]">General</h4>
											{/* <!-- input --> */}
											<div className="mb-5">
												<p className="mb-0 text-base text-black">
													Product Name <span className="text-red">*</span>
												</p>
												<input
													className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
													type="text"
													placeholder="Product name"
													value={name}
													onChange={(e) => setName(e.target.value)}
												/>
												<span className="text-tiny">
													A product name is required and recommended to be
													unique.
												</span>
											</div>
											<div className="mb-5">
												<label className="text-black">Description</label>
												<textarea
													value={description}
													onChange={(e) => setDescription(e.target.value)}
													className="input py-4 rounded-md h-[200px] resize-none w-full border border-gray6  text-black"
												></textarea>
											</div>
										</div>
										<div className="bg-white px-8 py-8 rounded-md mb-6">
											<h4 className="text-[22px]">Details</h4>
											{/* <!-- tax vat --> */}
											<div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
												<div className="mb-5">
													<p className="mb-0 text-base text-black">
														Base Price <span className="text-red">*</span>
													</p>
													<input
														className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														type="number"
														placeholder="Product price"
														value={price}
														onChange={(e) => setPrice(e.target.value)}
													/>
													<span className="text-tiny leading-4">
														Set the base price of product.
													</span>
												</div>
												{/* <!-- input --> */}
												<div className="mb-5">
													<p className="mb-0 text-base text-black">
														SKU <span className="text-red">*</span>
													</p>
													<input
														className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														type="text"
														placeholder="SKU"
														value={sku}
														onChange={(e) => setSku(e.target.value)}
													/>
													<span className="text-tiny leading-4">
														Enter the product SKU.
													</span>
												</div>
												{/* <!-- input --> */}
												<div className="mb-5">
													<p className="mb-0 text-base text-black">
														Qantity <span className="text-red">*</span>
													</p>
													<input
														className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														placeholder="Quantity"
														type="number"
														value={quantity}
														onChange={(e) => setQuantity(e.target.value)}
													/>
													<span className="text-tiny leading-4">
														Enter the product quantity.
													</span>
												</div>
												{/* <!-- input --> */}
												<div className="mb-5">
													<p className="mb-0 text-base text-black">
														VAT Ammount (%)
													</p>
													<input
														className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														type="number"
														placeholder="VAT"
														min="0"
														max="100"
														value={vat}
														onChange={(e) => setVat(e.target.value)}
													/>
													<span className="text-tiny leading-4">
														Set the product VAT about.
													</span>
												</div>
											</div>

											{/* <!-- discount --> */}
											<div className="">
												<p className="mb-0 text-base text-black">
													Discount Type <span className="text-red">*</span>
												</p>
												<div className="flex items-center sm:space-x-3 flex-wrap mb-5">
													<RadioInput
														options={discountOptions}
														selectedOption={discountType}
														onChange={handleRadioChange}
													/>
												</div>
												<div>
													{discountType === 'fixed discount' && (
														<div className="mb-5">
															<p className="mb-0 text-base text-black">
																Discount Price{' '}
																<span className="text-red">*</span>
															</p>
															<input
																className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
																type="number"
																placeholder="Price"
																value={discount}
																onChange={(e) => setDiscount(e.target.value)}
															/>
														</div>
													)}
													{discountType === 'percent discount' && (
														<div className="mb-5 mx-6">
															<p className="mb-2 text-base text-black">
																Percent <span className="text-red">*</span>
															</p>
															<input
																className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
																type="number"
																id="example_id"
																name="example_name"
																value={discount}
																onChange={(e) => setDiscount(e.target.value)}
															/>
														</div>
													)}
												</div>

												{/* <!-- range slider --> */}
												<div className="mt-10 hidden">
													<div className="w-full">
														<div
															className="relative h-5 w-full"
															id="my-slider"
															data-se-min="00"
															data-se-step="1"
															data-se-min-value="0"
															data-se-max-value="40"
															data-se-max="100"
														>
															<div className="slider-touch-left w-5 h-5 rounded-md absolute z-10 hover:cursor-pointer">
																<span className="block w-full h-full bg-white rounded-full shadow-sm"></span>
															</div>
															<div className="slider-touch-right w-5 h-5 rounded-md absolute z-10 hover:cursor-pointer">
																<span className="block w-full h-full bg-white rounded-full shadow-sm"></span>
															</div>
															<div className="slider-line absolute w-[calc(100%-5rem)] h-1 left-[18px] top-[7px] rounded bg-[#f9f9f9] overflow-hidden">
																<span className="block h-full w-0 bg-theme"></span>
															</div>
														</div>
													</div>
													<div id="result" className="">
														Min: 0 Max: 100
													</div>
												</div>
											</div>
										</div>

										<div className="bg-white px-8 py-8 rounded-md mb-6">
											<h4 className="text-[22px]">Shipping</h4>
											<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
												{/* <!-- input --> */}
												<div className="mb-5">
													<p className="mb-0 text-base text-black">
														Width(Inch)
													</p>
													<input
														className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														type="number"
														placeholder="Width"
														value={width}
														onChange={(e) => setWidth(e.target.value)}
													/>
													<span className="text-tiny">
														Set the product width.
													</span>
												</div>
												{/* <!-- input --> */}
												<div className="mb-5">
													<p className="mb-0 text-base text-black">
														Height(Inch)
													</p>
													<input
														className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														type="number"
														placeholder="Height"
														value={height}
														onChange={(e) => setHeight(e.target.value)}
													/>
													<span className="text-tiny">
														Set the product height.
													</span>
												</div>
												{/* <!-- input --> */}
												<div className="mb-5">
													<p className="mb-0 text-base text-black">
														Weight(KG)
													</p>
													<input
														className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														type="number"
														placeholder="Weight"
														value={weight}
														onChange={(e) => setWeight(e.target.value)}
													/>
													<span className="text-tiny">
														Set the product weight.
													</span>
												</div>
											</div>
											{/* <!-- input --> */}
											<div className="mb-5">
												<p className="mb-0 text-base text-black">
													Shipping Cost
												</p>
												<input
													className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
													type="number"
													placeholder="Cost"
													value={cost}
													onChange={(e) => setCost(e.target.value)}
												/>
												<span className="text-tiny">
													Set the product shipping cost.
												</span>
											</div>
										</div>
									</div>
									<div className="col-span-12 xl:col-span-4 2xl:col-span-3 ">
										<div className="bg-white px-8 py-8 rounded-md mb-6">
											<p className="mb-2 text-base text-black">Upload Image</p>
											<div className="text-center" onClick={handleClick}>
												{!image ? (
													<img
														className="w-[100px] h-auto mx-auto"
														src={
															selectedProduct?.image?.url ||
															'assets/img/icons/upload.png'
														}
														alt=""
													/>
												) : (
													<img
														className="w-[100px] h-auto mx-auto"
														src={image || selectedProduct?.image?.url}
														alt={imageName || name}
													/>
												)}
											</div>
											<span className="text-tiny text-center w-full inline-block mb-3">
												{imageName
													? imageName
													: 'Image size must be less than 5Mb'}
											</span>
											<div className="">
												<form>
													<input
														type="file"
														ref={hiddenFileInput}
														onChange={handleImageChange}
														className="hidden"
													/>
													<label
														htmlFor="productImage"
														className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
														onClick={handleClick}
													>
														Upload Image
													</label>
												</form>
											</div>
										</div>
										<div className="bg-white px-8 py-8 rounded-md mb-6">
											<p className="mb-5 text-base text-black">
												Product Details
											</p>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
												<div className="category-select select-bordered">
													<h5 className="text-tiny mb-1">Category</h5>
													<select
														value={category}
														onChange={(e) => setCategory(e.target.value)}
													>
														<option value="Electronics">Electronics</option>
														<option value="Fashion">Fashion</option>
														<option value="Jewellery">Jewellery</option>
														<option value="Beauty">Beauty</option>
														<option value="Grocery">Grocery</option>
													</select>
												</div>
												<div className="sub-category-select select-bordered">
													<h5 className="text-tiny mb-1">Sub Category</h5>
													<select
														value={subCategory}
														onChange={(e) => setSubCategory(e.target.value)}
													>
														<option value="Electronics">Electronics</option>
														<option value="Fashion">Fashion</option>
														<option value="Jewellery">Jewellery</option>
														<option value="Beauty">Beauty</option>
														<option value="Grocery">Grocery</option>
													</select>
												</div>
											</div>
											<div className="mb-5">
												<p className="mb-0 text-base text-black">Tags</p>
												<input
													type="text"
													id="tag-input1"
													className="hidden"
													value={tag}
													onChange={(e) => setTag(e.target.value)}
												/>
											</div>
										</div>
										<div className="bg-white px-8 py-8 rounded-md">
											<p className="mb-5 text-base text-black">
												Product Attribute
											</p>
											<div className="">
												<div className="mb-5">
													<p className="mb-0 text-base text-black">Size</p>
													<input
														className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														type="number"
														placeholder="Size"
														value={size}
														onChange={(e) => setsize(e.target.value)}
													/>
												</div>
												<div className="mb-5">
													<p className="mb-0 text-base text-black">Color</p>
													<input
														className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
														type="text"
														placeholder="Hex Code Here"
														value={color}
														onChange={(e) => setColor(e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="">
									<button
										onClick={handleUpdateProduct}
										className="tp-btn px-10 py-2 mb-2"
									>
										Save
									</button>
									<button
										onClick={handleCancel}
										className="tp-btn px-10 py-2 border border-[#dfdfdf] bg-transparent text-black hover:text-black hover:bg-white hover:border-white mb-2"
									>
										Cancel
									</button>
								</div>
							</div>
							{/* <!-- general tab content --> */}
							{/* x-show="addProductTab === 2" */}
							<div className=""></div>
						</div>
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default EditProduct;
