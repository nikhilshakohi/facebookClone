//React Library
import { useContext, useState, useEffect } from 'react';
//Icons
import { MdAccountCircle, MdEmojiEmotions, MdVideoCall } from 'react-icons/md';
import { IoMdPhotos } from 'react-icons/io';
//User-Components
import Post from "./Post";
import '../styles/ContentCenter.css';
import { myThemeContext } from '../utils/context/ThemeContext';
import CreatePost from './CreatePost';
import { useAuth } from '../utils/context/AuthContext';
//Firebase
import { collection, doc, getFirestore, onSnapshot, orderBy, query, where } from 'firebase/firestore';

export default function ContentCenter() {

	//State Variables
	const { myState } = useContext(myThemeContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [allPostsArray, setAllPostsArray] = useState([]);
	//Context
	const { user } = useAuth();
	//Add New Post Action Buttons
	const addPostActions = [{ name: 'Live Video', id: 'actionLiveVideo', icon: <MdVideoCall className="actionIcon" /> }, { name: 'Photo/video', id: 'actionPhoto', icon: <IoMdPhotos className="actionIcon" /> }, { name: 'Feeling/activity', id: 'actionActivity', icon: <MdEmojiEmotions className="actionIcon" /> }];

	//Check if content data changes
	useEffect(() => {
		//all contents query
		const allPostsQuery = query(collection(getFirestore(), "posts"), where("username", "==", user.email), orderBy("uploadTime", "desc"));
		onSnapshot(allPostsQuery, (snapshot) => {
			setAllPostsArray(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
					caption: doc.data().caption,
					fileURL: doc.data().fileURL,
					uploadTime: doc.data().uploadTime,
					privacy: doc.data().privacy
				}))
			);
		});
	}, [user.email]);

	return (
		<div className="contentCenter">
			{/*Create Post Modal*/}
			<CreatePost isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
			<div className={`post ${myState.postStyle}`}>
				{/*Account Icon and Input Box*/}
				<div className="postHeader flexDisplay">
					<div className="postHeaderDetails flexDisplay addPostHeaderDetails">
						<MdAccountCircle className="postIcon addPostPostIcon"/>
						<input type="text" readOnly className={`addPostInput  ${myState.bodyStyle}`} placeholder={`What's on your mind, ${user.displayName && user.displayName.split(" ")[0]}?`} onClick={() => setIsModalOpen(true)} onKeyDown={(e) => { ((e.key >= 48 && e.key <= 90) || (e.which >= 48 && e.which <= 90) || (e.which >= 96 && e.which <= 105)) && setIsModalOpen(true) }}/>
					</div>
				</div><hr />
				{/*New Post Action Buttons*/}
				<div className="postFooter">
					<div className="postActionsDiv flexDisplay">
					{
						addPostActions.map((item, index) => {
							return (
								<div key={index} className={"postAction flexDisplay postActionOf" + item.id}
									onClick={item.name !== "Live Video" ? () => setIsModalOpen(true) : null}>
										{item.icon}
										<small>{item.name}</small>
									</div>
								)
						})
					}
					</div>
				</div>
			</div>
			{/*All Posts*/}
			{
				(allPostsArray.length > 0) ?
					allPostsArray.map((data,index) => (
						<Post key={index} id={doc.id} name={data.name} caption={data.caption} fileURL={data.fileURL} privacy={data.privacy} uploadTime={data.uploadTime} />
					)) : null
            }
			<br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br />
		</div>
	);
}