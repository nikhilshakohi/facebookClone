//Icons
import { FaUserFriends, FaChevronCircleDown } from 'react-icons/fa';
import { MdOutlineOndemandVideo, MdOutlineStorefront, MdAccountCircle, MdGroups, MdBookmark, MdFlag } from 'react-icons/md';
import { GiBackwardTime } from 'react-icons/gi';
//User-Components
import '../styles/ContentLeft.css';
import { useAuth } from '../utils/context/AuthContext';

export default function ContentLeft() {

	const menuLinks = [{ name: 'Friends', icon: <FaUserFriends className="icon contentLeftIcon" /> }, { name: 'Groups', icon: <MdGroups className="icon contentLeftIcon" /> }, { name: 'Marketplace', icon: <MdOutlineStorefront className="icon contentLeftIcon" /> }, { name: 'Watch', icon: <MdOutlineOndemandVideo className="icon contentLeftIcon" /> }, { name: 'Memories', icon: <GiBackwardTime className="icon contentLeftIcon" /> }, { name: 'Saved', icon: <MdBookmark className="icon contentLeftIcon" /> }, { name: 'Pages', icon: <MdFlag className="icon contentLeftIcon" /> }, { name: 'See More', icon: <FaChevronCircleDown className="icon contentLeftIcon"/> }];
	//User Context
	const { user } = useAuth();

	return (
		//Menu
		<div className="contentLeft">
			{/*Account Name*/}
			<div className="contentLeftLinkDiv flexDisplay">
				<MdAccountCircle className="icon contentLeftIcon"/>
				{user.displayName && user.displayName}
			</div>
			{/*Menu Links*/}
			{
				menuLinks.map((item, index) => {
					return (
						<div key={index} title={item.name} className="contentLeftLinkDiv flexDisplay">
							{item.icon}
							{item.name}
						</div>
					)
				})
			}
			<hr/>
			{/*Account Name*/}
			<div className="footer">
				<small>Privacy &bull; Terms &bull; Cookies 
				Advertising &bull; Ad choices <br/>
				Facebook &copy; 2022</small>
			</div>
		</div>
	);
}