//React Library
import Modal from 'react-modal';
import { useContext, useRef, useState } from 'react';
//Firebase Library
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//Icons
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdAccountCircle, MdImage } from 'react-icons/md';
import { FaImages } from 'react-icons/fa';
//User-Components
import '../styles/CreatePost.css'
import { myThemeContext } from '../utils/context/ThemeContext';
import { useAuth } from '../utils/context/AuthContext';

export default function CreatePost(props) {

    //Set Modal Element
    Modal.setAppElement("#root");

    //State Variables
    const [inputFile, setInputFile] = useState();
    const [inputFileName, setInputFileName] = useState('');
    const [fileProgress, setFileProgress] = useState(0);
    //Refs, Context
    const inputCaptionRef = useRef();
    const inputFileRef = useRef();
    const inputPrivacyRef = useRef();
    const { myState } = useContext(myThemeContext);
    const { user, uploadPost } = useAuth();
    //Firebase Storage
    const storage = getStorage();
    
    //Input TextArea Auto size
    const handleTextareaAutoSize = (e) => {
        inputCaptionRef.current.style.height = `50px`;
        inputCaptionRef.current.style.height = `${e.target.scrollHeight}px`;
    }

    //Get Uploaded File Details
    const handleFileUpload = (e) => {
        setInputFile(e.target.files[0]);
        setInputFileName(inputFileRef.current.value.replace(/^.*\\/, ""));
    }

    //AddPost [Validation]
    const addPost = (e) => {
        var caption = inputCaptionRef.current.value;
        var file = inputFile;
        var privacy = inputPrivacyRef.current.value;
        var fileURL = "";
        if (inputFileRef.current.value !== "") {
            const storageRef = ref(storage, 'images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, { contentType: 'image/jpg' });
            //Listen to changes
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setFileProgress(progress);//console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused': break;//console.log('Upload is paused');
                        case 'running': break;//console.log('Upload is running');
                    }
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized': break;// User doesn't have permission to access the object
                        case 'storage/canceled': break;// User canceled the upload
                        case 'storage/unknown': break;// Unknown error occurred, inspect error.serverResponse
                    }
                },
                () => {// Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        fileURL = downloadURL;//console.log('File available at', downloadURL);
                        var uploadTime = new Date();
                        addPostToFirestore(user.email, user.displayName, caption, privacy, fileURL, uploadTime.getTime());
                    });
                }
            );
        } else {
            fileURL = "";//console.log('File available at', downloadURL);
            var uploadTime = new Date();
            addPostToFirestore(user.email, user.displayName, caption, privacy, fileURL, uploadTime.getTime());
        }
    }

    //AddPost [After Validation]
    async function addPostToFirestore(username, name, caption, privacy, fileURL, uploadTime){
        try {
            await uploadPost(username, name, caption, privacy, fileURL, uploadTime);
            props.setIsModalOpen(false);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        //Modal
        <Modal isOpen={props.isModalOpen} onRequestClose={() => { props.setIsModalOpen(false) }} className="createPostModal" closeTimeoutMS={250}>
            {/*Outer Div*/}
            <div className={`${myState.postStyle} createPostDiv`}>
                {/*Header*/}
                <div className="createPostDivHeader">
                    <div className="createPostClose" onClick={() => { props.setIsModalOpen(false) }}><AiFillCloseCircle /></div>
                    <h3>Create Post</h3>
                </div><hr />
                {/*Content*/}
                <div className="createPostDivContent">
                    {/*Account Name and Display Options*/}
                    <div className="flexDisplay createPostDivContentHeading">
                        <MdAccountCircle className="icon" />
                        <div>
                            <div>{user && user.displayName}</div>
                            <select ref={inputPrivacyRef} className={`${myState.bodyStyle} createPostPublicDisplay`}>
                                <option>Public</option>
                                <option>Friends</option>
                                <option>Only Me</option>
                            </select>
                        </div>
                    </div>
                    {/*Post Input Caption*/}
                    <textarea ref={inputCaptionRef} className={`${myState.postStyle} createPostInputBox`} type="text" placeholder={`What's on your mind, ${user.displayName && user.displayName.split(" ")[0]}?`} onChange={handleTextareaAutoSize} autoFocus/>
                    {/*Post Input Image*/}
                    <div className="uploadedFileName">{inputFileName}</div>
                    <input id="createPostInputFile" ref={inputFileRef} type="file" onChange={handleFileUpload} accept='image/*' />
                    <label tabIndex="0" id="createPostInputFileLabel" className={`${myState.postStyle} createPostInputFileLabel`} htmlFor="createPostInputFile" >
                        <div>Add to your Post</div>
                        <div>
                            <MdImage className="createPostInputFileLabelPic" />
                            <FaImages className="createPostInputFileLabelPic" />
                        </div>
                    </label>
                    {fileProgress !== 0 && <progress className="uploadedFileProgress" max="100" value={fileProgress}>{fileProgress}%</progress>}
                    {fileProgress === 100 && <b className="uploadedFileProgress" >File Uploaded successfully!</b>}
                    {/*Post Submit*/}
                    <button className="createPostButton" onClick={(e)=>addPost()}>Post</button>
                </div>
            </div>
        </Modal>
    )

}