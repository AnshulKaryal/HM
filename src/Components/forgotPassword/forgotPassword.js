import React, { useContext, useState } from 'react';
import styles from './forgotPassword.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { validateEmail } from '../../helpers';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Api/api';
import { Globalinfo } from '../../App';



const Forgotpassword = () => {
    const navigate = useNavigate();
    const { userDetail, getUserDetails, GetCart, GetWishList } = useContext(Globalinfo)
    const [btnLoader, setBtnLoader] = useState(false);
    const [show, setShow] = useState(1);

    const [user, setUser] = useState({

        email: "",
        password: "",
        otp: "",
        password: "",
        confirmPassword: "",

    });
    // console.log(userDetail)

    const handleReset = async () => {
        console.log(user)
        setBtnLoader(true);

        if (!validateEmail(user.email)) {
            toast.error('Enter valid Email  Address')
            setBtnLoader(false)
            return;
        }
        else if (user.password !== user.confirmPassword) {
            toast.error("Your Password is not Matching")
            return;
        }
        else {
            try {
                const res = await axios.put(`${BASE_URL}/resetPassword`, {
                    email: user.email,
                    password: user.password,
                })

                console.log(res);
                getUserDetails()
                toast.success("Password reset Successfull")

                setTimeout(() => {
                    navigate('/login')

                }, 2000);

            } catch (error) {
                console.log(error);
                toast.error("Some Error Occured while Login")
            } finally {
                setBtnLoader(false)
            }
        }
    }

    const handleSendOTP = async () => {
        console.log(user)
        setBtnLoader(true);

        if (!validateEmail(user.email)) {
            toast.error('Enter valid Email  Address')
            setBtnLoader(false)
        }
        else {
            try {
                const res = await axios.get(`${BASE_URL}/generateOTP?email=${user.email}`)

                console.log(res);
                if (res.data.success) {
                    setShow(2)
                }

            } catch (error) {
                console.log(error);
                toast.error("Some Error Occured while Login")
            } finally {
                setBtnLoader(false)
            }
        }
    }
    const handleVerifyOTP = async () => {
        console.log(user)
        setBtnLoader(true);

        if (!validateEmail(user.email)) {
            toast.error('Enter valid Email  Address')
            setBtnLoader(false)
        }
        else {
            try {
                const res = await axios.get(`${BASE_URL}/verifyOTP?code=${user.otp}`)

                console.log(res);
                if (res.status === 201) {
                    setShow(3)
                }

            } catch (error) {
                console.log(error);
                toast.error("Some Error Occured while Login")
            } finally {
                setBtnLoader(false)
            }
        }
    }

    return (
        <>
            <head>
                <title>
                    Reset Password | HopingMinds
                </title>
            </head>
            <div className={styles.register_container}>
                <div className={styles.register_box_main}>

                    {show === 1 ? <>
                        <h1>Forgot Password</h1>

                        <div className={styles.input_main}>

                            <div className={styles.inputs}>

                                <div>
                                    {/* Email input */}
                                    <p>Email</p>
                                    <input type="text" placeholder="Enter Your Email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                </div>

                            </div>
                            {/* Action buttons */}
                            <div className={styles.action_button}>

                                <div className={styles.submit}>
                                    <button onClick={handleSendOTP}>{btnLoader ? "Loading..." : "Send OTP"}</button>
                                </div>


                            </div>
                        </div> </> : show === 2 ? <>
                            <h1>Verify OTP Here</h1>
                            <h6>We have sent an OTP to *******{user.email.slice(user.email.length - 14, user.email.length)}</h6>
                            <div className={styles.input_main}>

                                <div className={styles.inputs}>

                                    <div>
                                        {/* Email input */}
                                        <p>Enter OTP</p>
                                        <input type="number" placeholder="Enter Your OTP" name="otp" value={user.otp} onChange={(e) => setUser({ ...user, otp: e.target.value })} />
                                    </div>

                                </div>
                                {/* Action buttons */}
                                <div className={styles.action_button}>

                                    <div className={styles.submit}>
                                        <button onClick={handleVerifyOTP}>{btnLoader ? "Loading..." : "Verify OTP"}</button>
                                    </div>


                                </div>
                            </div> </> : <>
                        <h1>Reset Your Password</h1>

                        <div className={styles.input_main}>

                            <div className={styles.inputs}>

                                <div>
                                    {/* Email input */}
                                    <p>Enter New Password</p>
                                    <input type="text" placeholder="Enter Your New Password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                </div>
                                <div>
                                    {/* Email input */}
                                    <p>Confirm New Password</p>
                                    <input type="text" placeholder="Confirm New Password" name="confirmPassword" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                                </div>

                            </div>
                            {/* Action buttons */}
                            <div className={styles.action_button}>

                                <div className={styles.submit}>
                                    <button onClick={handleReset}>{btnLoader ? "Loading..." : "Update Password"}</button>
                                </div>


                            </div>
                        </div> </>}
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Forgotpassword;
