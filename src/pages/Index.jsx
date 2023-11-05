import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from './../components/Sidebar';
const Index = () => {
	const [sideMenu, setSideMenu] = useState(null);

	return (
		<div className="tp-main-wrapper bg-slate-100 h-screen">
			<Sidebar sideMenu />

			<div
				className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300" ${
					sideMenu ? 'visible opacity-1' : '  invisible opacity-0 '
				}`}
				onClick={() => setSideMenu(!sideMenu)}
			>
				{' '}
			</div>

			<div className="tp-main-content lg:ml-[250px] xl:ml-[300px] w-[calc(100% - 300px)]">
				<Header sideMenu setSideMenu />
			</div>
		</div>
	);
};

export default Index;
