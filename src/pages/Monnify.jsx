import { useState } from 'react';

import axios from 'axios';
const Monnify = () => {
	// <script type="text/javascript" src="https://sdk.monnify.com/plugin/monnify.js"></script>

	const [isLoading, setIsLoading] = useState(false);
	const apiUrl = import.meta.env.VITE_API_URL;
	const payWithMonnify = async () => {
		setIsLoading(true);
		try {
			axios
				.post(`${apiUrl}/payments/monnify`)
				.then((res) => {
					console.log(res);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			console.log(error);
		}
		// MonnifySDK.initialize({
		//     amount: 100,
		//     currency: "NGN",
		//     reference: new String((new Date()).getTime()),
		//     customerFullName: "Damilare Ogunnaike",
		//     customerEmail: "ogunnaike.damilare@gmail.com",
		//     apiKey: "MK_PROD_FLX4P92EDF",
		//     contractCode: "626609763141",
		//     paymentDescription: "Lahray World",
		//     metadata: {
		//         "name": "Damilare",
		//         "age": 45
		//     },
		//     incomeSplitConfig: [{
		//         "subAccountCode": "MFY_SUB_342113621921",
		//         "feePercentage": 50,
		//         "splitAmount": 1900,
		//         "feeBearer": true
		//     }, {
		//         "subAccountCode": "MFY_SUB_342113621922",
		//         "feePercentage": 50,
		//         "splitAmount": 2100,
		//         "feeBearer": true
		//     }],
		//     onLoadStart: () => {
		//         console.log("loading has started");
		//     },
		//     onLoadComplete: () => {
		//         console.log("SDK is UP");
		//     },
		//     onComplete: function(response) {
		//         //Implement what happens when the transaction is completed.
		//         console.log(response);
		//     },
		//     onClose: function(data) {
		//         //Implement what should happen when the modal is closed here
		//         console.log(data);
		//     }
		// });
	};
	return (
		<div>
			<button type="button" onClick={payWithMonnify} className="tp-btn">
				{isLoading ? 'Loading' : 'Pay With Monnify'}
			</button>
		</div>
	);
};

export default Monnify;
