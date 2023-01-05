//React Library 
import { useContext, useState } from 'react';
//Icons
import { MdAccountCircle } from 'react-icons/md';
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { VscComment } from 'react-icons/vsc';
import { IoMdShareAlt } from 'react-icons/io';
//User-Components
import '../styles/ContentCenter.css';
import { myThemeContext } from '../utils/context/ThemeContext';

export default function Post(props) {

	const { myState } = useContext(myThemeContext);			//Context for themes
	const [likeStatus, setLikeStatus] = useState(false);	//like Button Clicked
	//Time of post calculation
	const uploadDate = new Date(props.uploadTime);
	const currentDate = new Date();
	const currentTime = currentDate.getTime();
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	//Double Digit conversion
	const twoDigitNumber = (num) => {
		return num < 10 ? "0"+num : num
    }

	return (
		//Each Post
		<div className={`post ${myState.postStyle}`} >
			{/*Post Header*/}
			<div className="postHeader flexDisplay">
				<div className="postHeaderDetails flexDisplay">
					<MdAccountCircle className="icon contentCenterIcon"/>
					{/*Post Header Name*/}
					<div>
						<div>{props.name}</div>
						{
							((currentTime - props.uploadTime)/1000) < 3600 ?
								//Minutes Ago
								<small className="postHeaderSubDetails">{Math.round((currentTime - props.uploadTime) / 60000)}m</small> :
								((currentTime - props.uploadTime) / 1000) < 21600 ?
									//Hours Ago
									<small className="postHeaderSubDetails">{Math.round((currentTime - props.uploadTime) / 3600000)}h</small> :
									//Date
									<small className="postHeaderSubDetails">{twoDigitNumber(uploadDate.getDate())}-{months[uploadDate.getMonth()]}{uploadDate.getFullYear() !== currentDate.getFullYear() && -uploadDate.getFullYear()} {twoDigitNumber(uploadDate.getHours())}:{twoDigitNumber(uploadDate.getMinutes())}</small>
						}
						<small className="postHeaderSubDetails"> &bull; {props.privacy}</small>
					</div>
				</div>
				{/*Post Header More Options*/}
				<div className="postMenuIcon">&#10247;</div>
			</div>
			{/*Post Content [Caption and Image]*/}
			<div className="postContent">
				<div className="postCaption">
					{props.caption}
				</div>
				<div className="postImageDiv">
					{props.fileURL === "" ? null : <img src={props.fileURL} alt="Post" className="postImage" />}
				</div>
			</div>
			{/*Post Footer [Like buttons and count]*/}
			<div className="postFooter">
				{/*Count of Likes/comments/shares*/}
				<div className="postFooterDetails flexDisplay">
					<div>150k Likes</div>
					<div>
						300 comments 32 shares
					</div>
				</div>
				<hr />
				{/*Buttons of Likes/comments/shares*/}
				<div className="postActionsDiv flexDisplay">
					<div className="postAction flexDisplay" onClick={() => setLikeStatus(!likeStatus)}>
						{!likeStatus ?
							<BiLike className="icon contentCenterIcon" /> :
							<AiFillLike color="#3578E5" className="icon contentCenterIcon" />}
						<span className={likeStatus ? "likedButton" : null}>Like</span>
					</div>
					<div className="postAction flexDisplay">
						<VscComment className="icon contentCenterIcon" />
						Comment
					</div>
					<div className="postAction flexDisplay">
						<IoMdShareAlt className="icon contentCenterIcon" />
						Share
					</div>
				</div>
			</div>
		</div>
	);
}