import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { fauth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/index"
export default function Login() {
	const [phonenumber, setPhonenumber] = useState("");
	const [code, setCode] = useState("");
	const [sendCodeRes, setSendcodeRes] = useState("");
	const [flag, setFlag] = useState(false);
	const dispatch = useDispatch();
	const sendOtp = async () => {
		if (phonenumber === "" || phonenumber === undefined) return;
		try {
			const responce = await setUpRecaptchaVerifier(phonenumber);
			setSendcodeRes(responce);
			setFlag(true);
		} catch (error) {
			console.log(error);
			// window.location.replace("/");
		}
	};

	const setUpRecaptchaVerifier = async (phonenumber) => {
		const recaptchaVerifier = new RecaptchaVerifier(fauth, 'recaptcha-container', {});
		await recaptchaVerifier.render();
		return signInWithPhoneNumber(fauth, phonenumber, recaptchaVerifier);
	}

	const verifyOtp = async () => {
		if (code === "" || code === null || code.length !== 6) return;
		try {
			await sendCodeRes.confirm(code);
			dispatch(setLogin({
				user: phonenumber,
				token: phonenumber
			}))
		} catch (error) {
			console.log(error);
		}
	}

	// const handleCreateChannel = async () => {
	// 	const responce = await axios.post("http://localhost:5000/createChannel", { title: title, description: desc, phonenumber: phonenumber });
	// 	console.log(responce);
	// }
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
									<h6 className="font-weight-light">Sign in to continue.</h6>
									<form className="pt-3">
										<div className="form-group">
											<input type="text" style={{ display: !flag ? "block" : "none" }} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Phone No." onChange={(e) => {setPhonenumber(e.target.value)}} />
										</div>
										<div className="form-group">
											<input type="text" style={{ display: flag ? "block" : "none" }} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter OTP here" onChange={(e) => {setCode(e.target.value)}} />
										</div>
										<div className="mt-3" style={{ display: !flag ? "block" : "none" }} >
											<p className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={sendOtp}>Send OTP</p>
											<div className="mt-3 mx-auto" id="recaptcha-container">
											</div>
										</div>
										<div className="mt-3" style={{ display: flag ? "block" : "none" }} >
											<p className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={verifyOtp}>Verify OTP</p>
										</div>
										<div className="my-2 d-flex justify-content-between align-items-center">
											<div className="form-check">
												<label className="form-check-label text-muted">
													<input type="checkbox" className="form-check-input"></input> Keep me signed in </label>
											</div>
											<a href="/" className="auth-link text-black">Forgot password?</a>
										</div>
										<div className="mb-2">
											<button type="button" className="btn btn-block btn-facebook auth-form-btn">
												<i className="icon-social-facebook mr-2"></i>Connect using facebook </button>
										</div>
										<div className="text-center mt-4 font-weight-light"> Don't have an account? <a href="register.html" className="text-primary">Create</a>
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
