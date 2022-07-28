import { useContext, useRef, useState } from "react";
import { axiosInstance } from "../config";
import { Context } from "../context/Context";
import "./login.css";
 
export default function Login() {
 
    const userRef = useRef();
    const passwordRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axiosInstance.post("/auth/login", {
                userName: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            res.data && window.location.replace("../Nav/Navbar.jsx");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            console.log("something went wrong")
        }
    };
    console.log(user)
    console.log(isFetching)
    const [isRegister, setReg] = useState(true);

    const wantRegister = (e) => {
        // 👇️ passed function to setState
        e.preventDefault();
    
        setReg(current => !current);
    };


    // lets implement Registeration her

    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const handleSubmitForReg = async (e) => {
        setError(false);
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/register", {
                userName,
                email,
                password,
            }

            );
            if(res!==null){
                setReg(false);
            }
            


        } catch (err) {
            setError(true)

        }

    }




    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="form">
                        <div className="left-side">
                            <img src="https://imgur.com/XaTWxJX.jpg" alt="" />
                        </div>

                        <div className="right-side">
                            {/* <div className="register">
                            <p>Not a member? <a href="#">Register Now</a></p>
                        </div> */}

                            {/* REGISTER should be DONE Here */}

                            {isRegister ? <form onSubmit={handleSubmitForReg}>
                                <div className="hello">
                                    {error ? <span style={{ color: "red", marginTop: "10px" }
                                    }>Something went wrong</span> : <h4>SignUp to get Leatest articles! </h4>}

                                </div>
                                <div className="input_text">
                                    <input className="warning" type="text" placeholder="Enter username" name="email"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <p className="danger"><i className="fa fa-warning"></i>Please enter a valid email address.</p>
                                </div>

                                <div className="input_text">
                                    <input className="warning" type="text" placeholder="Enter email" name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <p className="danger"><i className="fa fa-warning"></i>Please enter a valid email address.</p>
                                </div>

                                <div className="input_text">
                                    <input className="warning" type="password" placeholder="Enter password" name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                </div>
                                {/* <div className="recovery">
                  <p>Recovery Password</p>
                </div> */}
                                <div className="btn">
                                    <button type="submit">SignUp</button>
                                </div>
                                <br />
                                <button className="bn30" onClick={wantRegister}>
                                    Login?
                                </button>
                            </form> : <form onSubmit={handleSubmit}>
                                {/* LOGIN should be DONE Here */}
                                <div className="hello">
                                    <h2>Hello Again!</h2>
                                    <h4>Welcome back you have been missed! </h4>
                                </div>
                                <div className="input_text">
                                    <input className="warning" type="text" placeholder="Enter user name" name="email"

                                        ref={userRef} />
                                    <p className="danger"><i className="fa fa-warning"></i>Please enter a valid email address.</p>
                                </div>
                                <div className="input_text">
                                    <input className="warning" type="password" placeholder="Enter Password" name="password"
                                        ref={passwordRef}
                                    />

                                    <i className="fa-eye-slash"></i>
                                </div>
                                <div className="recovery">
                                    <p></p>
                                </div>
                                <div className="btn">
                                    <button type="submit">Sign in</button>
                                </div>
                                <br />
                                <button className="bn30" onClick={wantRegister}>
                                    Register?
                                </button>
                            </form>}
                            <hr />
                            <div className="or">
                                <p>or signin with</p>
                            </div>
                            <div className="boxes">
                                <span><img src="https://imgur.com/XnY9cKl.png" alt="HI" /></span>
                                <span><img src="https://imgur.com/ODlSChL.png" alt="HI" /></span>
                                <span><img src="https://imgur.com/mPBRdQt.png" alt="HI" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>

    );
}