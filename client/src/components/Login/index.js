import React, { useState } from "react";
import axios from "axios";
export default function Login() {
	const [phonenumber, setPhonenumber] = useState("");
	const [code, setCode] = useState("");
	const [sendCodeRes, setSendcodeRes] = useState({});
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const handleLogin = async () => {
		const responce = await axios.post("http://localhost:5000/sendCode", {
			phonenumber: phonenumber,
		});
		setSendcodeRes(responce.data);
		console.log(responce);	
	};
	const otphandle = async () => {
		const responce_after_otp = await axios.post(
			"http://localhost:5000/verifyCode",
			{ phonenumber: phonenumber, code: code, phoneCodeHash: sendCodeRes.result.phoneCodeHash }
		);
		console.log(responce_after_otp);
	}

	const handleCreateChannel = async () => {
		const responce = await axios.post("http://localhost:5000/createChannel", { title: title, description: desc});
		console.log(responce);
	}
	return (
		<>
			<div>
				<input
					type="text"
					placeholder="Enter the mobile number ...."
					onChange={(e) => {
						setPhonenumber(e.target.value);
					}}
				></input>
				<button onClick={handleLogin}>Verify</button>
					<input type="text" onChange={(e) => {setCode(e.target.value)}}></input>
					<button onClick={() => {otphandle()}}>vERIFY OTP</button>
			</div>
			<div>
				<input type="text" placeholder="channel name" onChange={(e) => {setTitle(e.target.value)}}></input>
				<input type="text" placeholder="desc" onChange={(e) => {setDesc(e.target.value)}}></input>
				<button onClick={() => {handleCreateChannel()}}>create channel</button>
			</div>
		</>
	);
}
