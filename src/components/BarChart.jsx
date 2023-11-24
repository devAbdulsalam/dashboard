/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
} from 'chart.js';
const BarChart = ({ datasets, labels }) => {
	ChartJS.register(
		LinearScale,
		CategoryScale,
		BarElement,
		PointElement,
		LineElement,
		Legend,
		Tooltip
	);
	const data = {
		labels,
		datasets,
		hoverOffset: 4,
		borderWidth: 1,
		backgroundColor: ['#50CD89', '#F1416C', '#3E97FF', '#ff9800'],
		borderColor: ['#50CD89', '#F1416C', '#3E97FF', '#ff9800'],
		options: {
			responsive: true,
		},
	};

	return <Bar data={data} />;
};

export default BarChart;
