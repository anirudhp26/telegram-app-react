import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTeleUser } from "../../redux/index"
import axios from "axios";
export default function TelegramAuth() {
    const [phonenumber, setPhonenumber] = useState("");
    const [code, setCode] = useState("");
    const [sendCodeRes, setSendcodeRes] = useState("");
    const [flag, setFlag] = useState(false);
    const dispatch = useDispatch();
    const sendOtp = async () => {
        if (phonenumber === "" || phonenumber === undefined) return;
        try {
            const responce = await axios.post("https://telegram-app-react.vercel.app/sendCode", {
                phonenumber: phonenumber,
            });
            setSendcodeRes(responce.data);
            console.log(responce);
            setFlag(true);
        } catch (error) {
            console.log(error);
        }
    };

    const verifyOtp = async () => {
        if (code === "" || code === null || code.length !== 5) return;
        try {
            const responce_after_otp = await axios.post(
                "https://telegram-app-react.vercel.app/verifyCode",
                { phonenumber: phonenumber, code: code, phoneCodeHash: sendCodeRes.result.phoneCodeHash }
            );
            console.log(responce_after_otp);
            dispatch(setTeleUser({
                teleuser: phonenumber,
            }))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row flex-grow">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left p-5">
                                    <div className="brand-logo">
                                        <img src="../../images/logo.svg" alt="logo" />
                                    </div>
                                    <h4>Hello! let's get started</h4>
                                    <h6 className="font-weight-light">Verify your Telegram phoneNo.</h6>
                                    <form className="pt-3">
                                        <div className="form-group">
                                            <input type="text" style={{ display: !flag ? "block" : "none" }} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Phone No." onChange={(e) => { setPhonenumber(e.target.value) }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" style={{ display: flag ? "block" : "none" }} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter OTP here" onChange={(e) => { setCode(e.target.value) }} />
                                        </div>
                                        <div className="mt-3" style={{ display: !flag ? "block" : "none" }} >
                                            <p className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={sendOtp}>Send OTP</p>
                                        </div>
                                        <div className="mt-3" style={{ display: flag ? "block" : "none" }} >
                                            <p className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={verifyOtp}>Verify OTP</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
