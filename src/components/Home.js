//React Library
import { useContext } from 'react';
//User-Components
import ContentLeft from './ContentLeft';
import ContentCenter from './ContentCenter';
import ContentRight from './ContentRight';
import Header from './Header';
import '../styles/Home.css';
import { myThemeContext } from '../utils/context/ThemeContext';

export default function Home() {

	//Context Variable
	const { myState } = useContext(myThemeContext);

	return (
		<div className={myState.bodyStyle}>
			{/*Header Div*/}
			<Header />
			{/*Home Div*/}
			<div className="homeDiv flexDisplay">
				<ContentLeft />
				<ContentCenter />
				<ContentRight/>
			</div>
		</div>
	);
}