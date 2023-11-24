/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,Filler,
	Legend,
	Tooltip,
} from 'chart.js';
const LineChart = ({ datasets, labels }) => {
	const options = {
		plugins: {
			legend: {
				labels: {
					usePointStyle: true,
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};
	ChartJS.register(
		LinearScale,
		CategoryScale,
		BarElement,
		PointElement,
		LineElement,
		Filler,
		Legend,
		Tooltip
	);
	// const [sales, setSales] = useState({});
	// const labels = data.map((item) => item.year);

	const Data = {
		labels,
		tension: 0.3,
		fill: true,
		backgroundColor: [
			'red',
			'rgba(62, 151, 255, 0.2)',
			'rgba(80, 205, 137, 0.2)',
			'rgba(255, 152, 0, 0.2)',
		],
		borderColors: [
			'rgba(62, 151, 255)',
			'rgb(80, 205, 137)',
			'rgb(255, 152, 0)',
		],
		datasets,
	};

	return <Line data={Data} options={options} />;
};

export default LineChart;
