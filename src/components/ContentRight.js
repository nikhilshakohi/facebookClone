//User-Components
import '../styles/ContentRight.css';
import { MdAccountCircle } from 'react-icons/md';
import { useAuth } from '../utils/context/AuthContext';

export default function ContentRight() {

	//Context
	const { user } = useAuth();

	return (
		<div className="contentRight">
			<div className="contentRightHeading">Sponsored</div>
			<hr />
			<div className="contentRightHeading">Contact</div>
			<div className="contactsDiv flexDisplay">
				<MdAccountCircle className="contactIcon" />
				{user.displayName} (self)
			</div>
			<hr />
			<div className="contentRightHeading">Group Conversations</div>
			<div className="contactsDiv flexDisplay">
				<MdAccountCircle className="contactIcon" />
				{user.displayName} (self)
			</div>
			<hr />
		</div>
	);
}