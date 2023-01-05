//Library
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
//User-Components
import '../styles/Login.css';
import Signup from './Signup';
import { useAuth } from '../utils/context/AuthContext';

export default function Login() {

	//State Variables
	const [loginDetails, setLoginDetails] = useState({ username: "", password: "" });
	const [error, setErrors] = useState({ username: '', password: '' });
	const [showPasswordEye, setShowPasswordEye] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [alert, setAlert] = useState({ status: false, content: '' });
	//Refs
	const loginUsernameRef = useRef();
	const loginPasswordRef = useRef();
	//Router
	const navigate = useNavigate();
	//Context
	const { login, forgotPasswordMail } = useAuth();

	//Password Visibility Toggle
	useEffect(() => {
		loginDetails.password !== "" ? setShowPasswordEye(true) : setShowPasswordEye(false);
    },[loginDetails.password])

	//Show/Hide Password function
	const handleShowPassword = (event,type) => {
		if (type === 'click' || event.key === 'Enter') {
			setShowPassword(!showPassword);
			loginPasswordRef.current.type === "password" ?
				loginPasswordRef.current.type = "text" :
				loginPasswordRef.current.type = "password";
        }
	}

	//Login - Validation
	const handleSubmit = (event) => {
		event.preventDefault();
		//Validation
		const email = loginDetails.username, password = loginDetails.password;
		if (email === '') {
			setErrors({username: 'The email address or mobile number you entered isn\'t connected to an account.', password: '' });
			loginUsernameRef.current.focus();
		} else if (!/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
			setErrors({ username: 'The email address or mobile number you entered isn\'t connected to an account.', password: '' });
			loginUsernameRef.current.focus();
		} else if (password === '') {
			setErrors({ username: '', password: 'The password that you\'ve entered is incorrect.' });
			loginPasswordRef.current.focus();
		} else if (!/^[a-zA-Z0-9!@#$%^&*]{6,15}$/.test(password)) {
			setErrors({ password: 'Invalid Password', username: error.email });
			loginPasswordRef.current.focus();
		} else {
			//Login with firebase
			checkLogin(email, password);
			setErrors({ username: '', password: '' });
		}
	};

	//Login [After Validation]
	async function checkLogin(email, password) {
		try {
			await login(email, password);
			navigate('/Home');	
		} catch (error) {
			if (error.code === 'auth/wrong-password') {
				setErrors({ username: '', password: 'The password that you\'ve entered is incorrect.' });
				loginPasswordRef.current.focus();
			} else if (error.code === 'auth/user-not-found') {
				setErrors({ username: 'The email address or mobile number you entered isn\'t connected to an account.', password: '' });
				loginUsernameRef.current.focus();
			} else {
				console.error(error);
            }
		}
	}

	//Forgot Password - Validation
	const forgotPassword = (event) => {
		event.preventDefault();
		setAlert({ status: 'error', content: '' });
		const email = loginDetails.username;
		if (email === '') {
			setErrors({ username: 'Please enter the E-Mail Address whose password is to be reset.', password: '' });
			loginUsernameRef.current.focus();
		} else if (!/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
			setErrors({ username: 'The email address or mobile number you entered isn\'t connected to an account.', password: '' });
			loginUsernameRef.current.focus();
		} else {
			sendForgotPwdMail(email);
		}
	}

	//Forgot Password [After Validation]
	async function sendForgotPwdMail(email) {
		setErrors({ username: '', password: '' });
		try {
			await forgotPasswordMail(email);
			setAlert({ status: 'success',content: 'Password Reset Mail Sent Successfully!' });
		} catch (error) {
			if (error.code === 'auth/user-not-found') {
				setErrors({ username: 'The email address or mobile number you entered isn\'t connected to an account.', password: '' });
				loginUsernameRef.current.focus();
			} else {
				setErrors({ username: 'Something went wrong. Please try again..', password: '' });
				console.error(error);
			}
		}
	}

	return (
		<>
			<div className="loginPage flexDisplay">
				{/*Company Details*/}
				<div className="companyDetails">
					<h1>facebook</h1>
					<h2>Facebook helps you connect and share with the people in your life.</h2>
				</div>
				{/*Login Input Details*/}
				<div className="loginBox">
					<div className="loginBoxDiv">
						{alert.status === 'success' ? <div className="loginAlert">{alert.content}</div> : null}
						{/*Username*/}
						<input
							name="loginUsername"
							ref={loginUsernameRef}
							type="username"
							className={"loginUsername " + (error.username !== "" && "errorBoder")}
							placeholder="Email address or phone number"
							value={loginDetails.username}
							onChange={(e) => { setLoginDetails({ ...loginDetails, username: e.target.value }) }}
						/>
						{error.username !== "" && <div className="usernameErrorDiv errorDiv">{error.username}</div>}
						{/*Password*/}
						<div className={"loginPasswordDiv flexDisplay " + (error.password !== "" && "errorBoder")}>
							<input
								name="loginPassword"
								ref={loginPasswordRef}
								type="password"
								className="loginPassword"
								placeholder="Password"
								value={loginDetails.password}
								onChange={(e) => { setLoginDetails({ ...loginDetails, password: e.target.value });} }
							/>
							{
								showPasswordEye ?
									!showPassword ?
										<AiOutlineEyeInvisible tabIndex="0" className="loginPasswordEye" onClick={(e) => handleShowPassword(e, 'click')} onKeyDown={(e) => handleShowPassword(e, 'enter')} /> :
										<AiOutlineEye tabIndex="0" className="loginPasswordEye" onClick={(e) => handleShowPassword(e, 'click')} onKeyDown={(e) => handleShowPassword(e, 'enter')}/> :
									<span className="loginPasswordEye" ></span>
							}
						</div>
						{error.password !== "" && <div className="passwordErrorDiv errorDiv">{error.password}</div>}
						{/*Login, ForgotPassword Button*/}
						<input type="button" className="loginButton" onClick={(e)=>handleSubmit(e)} value="Log in" /><br />
						<a className="forgotPasswordButton" onClick={forgotPassword} >Forgotten password?</a>
						{/*Signup Button*/}
						<button className="loginCreateAccount" onClick={() => { setIsModalOpen(true)} }>Create New Account</button>
					</div><br/>
					<small><b><a onClick={()=>alert("Yet to be worked out..!")}>Create a Page</a></b> for a celebrity, brand or business.</small>
				</div>
			</div>
			{/*Signup Modal*/}
			<Signup isSignupModalOpen={isModalOpen} setIsSignupModalOpen={setIsModalOpen}/>
			<br /><br /><br /><br /><br /><br /><br /><br />
			<br /><br /><br /><br />
		</>
	);
}