//React Library
import Modal from 'react-modal';
import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Icons
import { FaQuestionCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
//User-Components
import '../styles/Signup.css'
import { useAuth } from '../utils/context/AuthContext';

export default function Signup(props) {

    //State Variables
    const [dateOption, setDateOption] = useState([]);
    const [monthOption, setMonthOption] = useState([]);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [yearOption, setYearOption] = useState([]);
    const [reUsernameType, setReUsernameType] = useState("hidden");
    const [userInputs, setUserInputs] = useState({  //UserInputs
        firstName: '', surName: '', username: '', reUsername: '', password: '',
        DOBDate: '', DOBMonth: '', DOBYear: '', gender: ''
    });
    const [error, setError] = useState({            //Errors
        firstName: '', surName: '', username: '', reUsername: '', password: '',
        DOBDate: '', DOBMonth: '', DOBYear: '', gender: '', overall: false,
        validateEachTime: false, signupStat: '', alert: 'An error occured. Please try again.'
    });
    //Context, router and id variables
    const signupID = useId();
    const { signup } = useAuth();
    const navigate = useNavigate();
    
    //OnChange of any Inputs
    const handleInputChange = (e) => {
        var typeOfInput = e.target.name;
        setUserInputs({ ...userInputs, [typeOfInput]: e.target.value });
        if (/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userInputs.username)) {
            //Change ReUsername type if not changed already
            reUsernameType === "hidden" && setReUsernameType("username");
        }
        error.validateEachTime === true && validateInput(error);
    }

    //Date Setting
    if (dateOption.length === 0) {
        for (let i = 1; i <= 31; i++)
            setDateOption((prev) => [...prev, i]);
        for (let i = 0; i <= 11; i++)
            setMonthOption((prev) => [...prev, i]);
        for (let i = 2022; i >= 1900; i--)
            setYearOption((prev) => [...prev, i]);
    }

    //Input Validations
    const validateInput = (updatedError) => {
        if (!/^[a-zA-Z ]+$/.test(userInputs.firstName)) {
            setError({ ...updatedError, firstName: 'What\'s your name?', overall: true });
            return 0;
        } else if (!/^[a-zA-Z ]+$/.test(userInputs.surName)) {
            setError({ ...updatedError, firstName: '', surName: 'What\'s your name?', overall: true });
            return 0;
        } else if (!(/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userInputs.username))) {
            setError({ ...updatedError, firstName: '', surName: '', username: 'Please enter a valid mobile number or email address', overall: true });
            return 0;
        } else if (userInputs.username !== userInputs.reUsername) {
            setError({ ...updatedError, firstName: '', surName: '', username: '', reUsername: 'Please re-enter your email address.', overall: true });
            return 0;
        } else if (!/^[a-zA-Z0-9!@#$%^&*]{6,15}$/.test(userInputs.password)) {
            setError({ ...updatedError, firstName: '', surName: '', username: '', reUsername: '', password: 'Invalid Password', overall: true });
            return 0;
        } else if (userInputs.DOBDate === "" || userInputs.DOBMonth === "" || userInputs.DOBYear === "") {
            setError({ ...updatedError, firstName: '', surName: '', username: '', reUsername: '', password: '', DOBDate: 'It looks like you\'ve entered the wrong info. Please make sure that you use your real date of birth.', overall: true });
            return 0;
        } else if (userInputs.gender === "") {
            setError({ ...updatedError, firstName: '', surName: '', username: '', reUsername: '', password: '', DOBDate: '', gender: 'Please choose a gender. You can change who can see this later.', overall: true });
            return 0;
        } else {
            //Date Validation
            var fullDOB = new Date(userInputs.DOBYear, months.indexOf(userInputs.DOBMonth), userInputs.DOBDate);
            if ((fullDOB.getDate().toString() === userInputs.DOBDate.toString()) && ((fullDOB.getMonth()).toString() === months.indexOf(userInputs.DOBMonth).toString()) && ((fullDOB.getFullYear() + 1900).toString() !== userInputs.DOBYear.toString())) {
                //No Errors
                setError({ ...updatedError, firstName: '', surName: '', username: '', reUsername: '', password: '', DOBDate: '', gender: '', overall: false, alert:'' }); //Set as no error
                return 1;
            } else {
                //Date Invalid
                setError({ ...updatedError, firstName: '', surName: '', username: '', reUsername: '', password: '', DOBDate: 'It looks like you\'ve entered the wrong info. Please make sure that you use your real date of birth.', overall: true });
                return 0;
            }
        }
    }

    //Signup - Validation
    const handleSignup = () => {
        //Input Date in format
        var DOBFormat = userInputs.DOBYear + "-" + (months.indexOf(userInputs.DOBMonth) + 1) + "-" + userInputs.DOBDate;
        //Change ReUsername type if not changed already
        if(reUsernameType === "hidden")
            if (/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userInputs.username))
                setReUsernameType("username");
        //Clear Old Errors to default values
        var newError = {
            firstName: '', surName: '', username: '', reUsername: '', password: '',
            DOBDate: '', DOBMonth: '', DOBYear: '', gender: '', overall: false,
            validateEachTime: true, signupStat: '', alert: 'An error occured. Please try again'
        };
        //Find Respective Errors
        if (userInputs.firstName === '') newError.firstName = 'What\'s your name?';
        if (userInputs.surName === '') newError.surName = 'What\'s your name?';
        if (userInputs.username === '') newError.username = 'You\'ll use this when you log in and if you ever need to reset your password.';
        if (userInputs.password === '') newError.password = 'Enter a combination of atleast six numbers, letters and punctuation marks (such as ! and &).';
        if (userInputs.DOBDate === '') newError.DOBDate = 'It looks like you\'ve entered the wrong info. Please make sure that you use your real date of birth.';
        if (userInputs.gender === '') newError.gender = 'Please choose a gender. You can change who can see this later.';
        if ((userInputs.firstName === '') || (userInputs.surName === '') || (userInputs.username === '') || (userInputs.password === '') || (userInputs.DOBDate === '') || (userInputs.gender === ''))
            newError.overall = false;
        //Validations
        //If all fields are filled
        if (newError.overall === false) {
            var errorChk = validateInput(newError);
            if (errorChk === 1) {
                //Signup with firebase
                setError({
                    ...error, firstName: '', surName: '', username: '', reUsername: '', password: '',
                    DOBDate: '', DOBMonth: '', DOBYear: '', gender: '', overall: false,
                    signupStat: 'done', alert: 'Signing up...'
                });
                checkSignup(userInputs.username, userInputs.password, userInputs.firstName, userInputs.surName, userInputs.gender, DOBFormat);
            }
            //If input is not Valid
            else {
                console.error(error);
                if (error.firstName === '') document.getElementById(signupID + "firstName").focus();
                else if (error.surName === '') document.getElementById(signupID + "surName").focus();
                else if (error.username === '') document.getElementById(signupID + "username").focus();
                else if (error.password === '') document.getElementById(signupID + "password").focus();
                else if (error.reUsername === '') document.getElementById(signupID + "reUsername").focus();
                else if (error.DOBDate === '') document.getElementById(signupID + "DOBDate").focus();
                else if (error.DOBMonth === '') document.getElementById(signupID + "DOBMonth").focus();
                else if (error.DOBYear === '') document.getElementById(signupID + "DOBYear").focus();
                else if (userInputs.gender === '') document.getElementById("signupGenderF").focus();
            }
        }
        //If any field is empty
        else {
            //Set Errors
            setError({ ...error, ...newError });
            if (userInputs.firstName === '') document.getElementById(signupID + "firstName").focus();
            else if (userInputs.surName === '') document.getElementById(signupID + "surName").focus();
            else if (userInputs.username === '') document.getElementById(signupID + "username").focus();
            else if (userInputs.password === '') document.getElementById(signupID + "password").focus();
            else if (userInputs.reUsername === '') document.getElementById(signupID + "reUsername").focus();
            else if (userInputs.DOBDate === '') document.getElementById(signupID + "DOBDate").focus();
            else if (userInputs.DOBMonth === '') document.getElementById(signupID + "DOBMonth").focus();
            else if (userInputs.DOBYear === '') document.getElementById(signupID + "DOBYear").focus();
            else if (userInputs.gender === '') document.getElementById("signupGenderF").focus();
        }
    }

    //Signup [After Validation]
    async function checkSignup(email, password, firstName, lastName, gender, DOB) {
        try {
            await signup(email, password, firstName, lastName, gender, DOB);
            navigate("/Home");
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                setError({ ...error, overall: true, username: 'Email Already registered. Try a new one!', alert:'Email Already registered. Try a new one!' });
            } else {
                setError({ ...error, overall: true, alert: 'Something Went Wrong! Please Try Again' });
            }
        }
    }

    return (
        /*Modal Outer*/
        <Modal ariaHideApp={false} isOpen={props.isSignupModalOpen} onRequestClose={() => { props.setIsSignupModalOpen(false) }} className="signupModal" closeTimeoutMS={500}>
            {/*Signup Div*/}
            <div className="signupDiv">
                {/*Header*/}
                <div className="signupDivHeader">
                    <div className="signupClose" onClick={() => { props.setIsSignupModalOpen(false) }}><MdClose/></div>
                    <h1>Sign Up</h1>
                    It's quick and easy.
                </div><hr/>
                {/*Content*/}
                <div className="signupDivContent">
                    {/*Error Div*/}
                    {error.overall && <div className="signupAlert signupErrorAlert">{error.alert}</div>}
                    {!error.overall && error.signupStat === 'done' && <div className="signupAlert signupSuccessAlert">{error.alert}</div>}
                    {/*Names Div*/}
                    <div className="signupInputNamesDiv">
                        <input id={signupID + "firstName"} name="firstName" value={userInputs.firstName} onChange={handleInputChange} type="name" className={"signupInput signupFirstNameInput " + (error.firstName !== "" && "errorBoder")} title={error.firstName} placeholder="First Name" autoFocus/>
                        {error.firstName !== "" && <div className="firstNameErrorDiv errorSection">{error.firstName}</div>}
                        <input id={signupID + "surName"} name="surName" value={userInputs.surName} onChange={handleInputChange} type="name" className={"signupInput signupSurNameInput " + (error.surName !== "" && "errorBoder")} title={error.surName} placeholder="Surname" />
                        {error.surName !== "" && <div className="surNameErrorDiv errorSection">{error.surName}</div>}
                    </div>
                    {/*Username and Password*/}
                    <input id={signupID + "username"} name="username" value={userInputs.username} onChange={handleInputChange} type="username" className={"signupInput signupUsernameInput " + (error.username !== "" && "errorBoder")} title={error.username} placeholder="Mobile number or email address" />
                    {error.username !== "" && <div className="usernameErrorDiv errorSection">{error.username}</div>}
                    <input id={signupID + "reUsername"} name="reUsername" value={userInputs.reUsername} onChange={handleInputChange} type={reUsernameType} className={"signupInput signupReUsernameInput " + (error.reUsername !== "" && "errorBoder")} title={error.reUsername} placeholder="Re-enter email address" />
                    {error.reUsername !== "" && <div className="reUsernameErrorDiv errorSection">{error.reUsername}</div>}
                    <input id={signupID + "password"} name="password" value={userInputs.password} onChange={handleInputChange} type="password" className={"signupInput signupPasswordInput " + (error.password !== "" && "errorBoder")} title={error.password} placeholder="New password" /><br/>
                    {error.password !== "" && <div className="passwordErrorDiv errorSection">{error.password}</div>}
                    {/*Date Of Birth*/}
                    <div className="signupDobDiv">
                        <div className="dobLabel">
                            <small className="signupLabelSmall">
                                <label>Date of birth</label>
                                <span className="questionMarkIcon">
                                    <FaQuestionCircle />
                                </span>
                            </small>
                        </div>
                        <div className="flexDisplay signupDOBDiv">
                            <select id={signupID + "DOBDate"} value={userInputs.DOBDate} name="DOBDate" onChange={handleInputChange} className={"signupDOBDate " + (error.DOBDate !== "" && "errorBoder")} title={error.DOBDate}>
                                dateOption.length === 0 ?
                                    <option></option> :
                                    {dateOption.map((item) => { return <option key={"DOBDateKey" + item}>{item}</option> })}
                            </select>
                            <select id={signupID + "DOBMonth"} value={userInputs.DOBMonth} name="DOBMonth" onChange={handleInputChange} className={"signupDOBMonth " + (error.DOBMonth !== "" && "errorBoder")} title={error.DOBMonth}>
                                dateOption.length === 0 ?
                                    <option></option> :
                                    {monthOption.map((item) => { return <option key={"DOBMonthKey" + item}>{months[item]}</option> })}
                            </select>
                            <select id={signupID + "DOBYear"} value={userInputs.DOBYear} name="DOBYear" onChange={handleInputChange} className={"signupDOBYear " + (error.DOBYear !== "" && "errorBoder")} title={error.DOBYear}>
                                dateOption.length === 0 ?
                                    <option></option> :
                                    {yearOption.map((item) => { return <option key={"DOBYearKey" + item}>{item}</option> })}
                            </select>
                        </div>
                        {(error.DOBDate !== "" || error.DOBMonth !== "" || error.DOBYear !== "") && <div className="dobErrorDiv errorSection">{error.DOBDate}</div>}
                    </div>
                    {/*Gender*/}
                    <div className="signupGenderDiv">
                        <div className="genderLabel">
                            <small className="signupLabelSmall">
                                <label>Gender</label>
                                <span className="questionMarkIcon">
                                    <FaQuestionCircle />
                                </span>
                            </small>
                        </div>
                        <div className="flexDisplay signupGenderInputDiv">
                            <label className={"signupGenderLabelF " + (error.gender !== "" && "errorBoder")} htmlFor="signupGenderF" title={error.gender}>Female <input id="signupGenderF" name="gender" type="radio" value="Female" onChange={handleInputChange} checked={userInputs.gender === "Female"} /></label>
                            <label className={"signupGenderLabelM " + (error.gender !== "" && "errorBoder")} htmlFor="signupGenderM" title={error.gender}>Male <input id="signupGenderM" name="gender" type="radio" value="Male" onChange={handleInputChange} checked={userInputs.gender === "Male"} /></label>
                            <label className={"signupGenderLabelC " + (error.gender !== "" && "errorBoder")} htmlFor="signupGenderC" title={error.gender}>Custom <input id="signupGenderC" name="gender" type="radio" value="Custom" onChange={handleInputChange} checked={userInputs.gender === "Custom"} /></label>
                        </div>
                        {error.gender !== "" && <div className="genderErrorDiv errorSection">{error.gender}</div>}
                    </div>
                    {/*Terms and Policy*/}
                    <small className="signupTerms">
                        People who use our service may have uploaded your contact information to Facebook.
                        <a rel="noreferrer" target="_blank" href="https://www.facebook.com/help/637205020878504" className="link">Learn more</a>.
                        <br /><br />
                        By clicking Sign Up, you agree to our <a rel="noreferrer" target="_blank" href="https://www.facebook.com/legal/terms/update" className="link">Terms</a>, <a rel="noreferrer" target="_blank" href="https://www.facebook.com/about/privacy/update" className="link">Privacy Policy</a> and <a rel="noreferrer" target="_blank" href="https://www.facebook.com/policies/cookies/" className="link">Cookies Policy</a>. You may receive SMS notifications from us and can opt out at any time..
                    </small>
                    {/*Signup Button*/}
                    <button className="signupButton" onClick={handleSignup}>Sign Up</button>
                </div>
            </div>
        </Modal>
    )
}