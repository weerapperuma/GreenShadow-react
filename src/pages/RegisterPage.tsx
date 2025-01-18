import registerImage from "../assets/registerPageImg.png"
import logo from "../assets/logo.png"
import '../css/Pages/RegisterPage.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {User} from "../model/User.ts";
import {addUser} from "../store/slices/userSlice.ts";
import {toast} from "react-toastify";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const dispatch = useDispatch()

    const register = () => {

        if (email === "" || password === "" || type === "") {
            toast.error("Please fill all fields")
            console.log("Please fill all fields")
            return
        }

        console.log(isCheckboxChecked)

        if (isCheckboxChecked) {
            const user : User = new User(email, password, type)
            dispatch(addUser(user))
            toast.success("User added successfully")
        }else{
            toast.error("Please agree to all terms")
        }
    }

    return (
        <>
            <div className="main-container d-grid">
                <div className="w-100 h-100 d-flex align-items-end">
                    <img className="w-auto register-img" src={registerImage} alt="" srcSet=""/>
                    <div className="h-100 d-flex align-items-center justify-content-start ms-5">
                        <canvas className="h-75"></canvas>
                    </div>
                </div>
                <div className="pe-5">
                    <div className="logo d-flex gap-4 align-items-center mt-5">
                        <img src={logo} alt="logo"/>
                        <h1 className="m-0 fw-medium">Green Shadow</h1>
                    </div>
                    <div className="form-container mt-5">
                        <h3 className="fw-medium">Create your account</h3>
                        <h4 className="mt-2 fw-medium">"Sign Up to start managing your farm today!"</h4>

                        <div className="mt-5">

                            <div className="d-flex flex-column gap-3">
                                <div className="form-floating mb-3 w-100">
                                    <input type="email" className="form-control email-input fw-bold border-0"
                                           id="floatingInput"
                                           placeholder="name@example.com"
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3 w-100">
                                    <input type="password" className="form-control password-input fw-bold border-0"
                                           id="floatingPassword"
                                           placeholder="Password"
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating mb-3 w-100">
                                    <select
                                        className="form-select role-select fw-bold border-0"
                                        id="floatingSelect"
                                        value={type} // Use `value` to control the selected option
                                        onChange={(e) => setType(e.target.value)}
                                        aria-label="Floating label select example"
                                    >
                                        <option value="">Choose an option</option>
                                        <option value="MANAGER">MANAGER</option>
                                        <option value="ADMINISTRATIVE">ADMINISTRATIVE</option>
                                        <option value="SCIENTIST">SCIENTIST</option>
                                    </select>
                                    <label htmlFor="floatingSelect">Select an option</label>
                                </div>


                            </div>

                            <div className="d-flex mt-5">
                                <label className="checkbox-btn">
                                    <label htmlFor="checkbox"></label>
                                    <input id="checkbox" type="checkbox" onClick={() => setIsCheckboxChecked(!isCheckboxChecked)}/>
                                    <span className="checkmark"></span>
                                </label>
                                <h4 className="m-0 term">I agree to all Term, Privacy Policy and Fees</h4>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-5">
                        <h5 className="switchForm">Already have an account ? <Link to={ "/" }>Login</Link> Now. </h5>
                        <button className="cssbuttons-io-button" onClick={register}>
                            Sign Up
                            <div className="icon">
                                <svg
                                    height="24"
                                    width="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;