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
			<div className="auth-area" style={{ display: 'flex', flexDirection: 'column', margin: '4vh auto', width: '20%', justifyContent: 'space-between' }}>
				<input
					type="text"
					style={{ margin: '1rem auto'}}
					placeholder="Enter the mobile number ...."
					onChange={(e) => {
						setPhonenumber(e.target.value);
					}}
				></input>
					
				<button onClick={handleLogin} style={{ margin: '1rem auto'}}>Verify</button>
					<input type="text" style={{ margin: '1rem auto'}} placeholder="Enter otp" onChange={(e) => {setCode(e.target.value)}}></input>
					<button onClick={() => {otphandle()}} style={{ margin: '1rem auto'}}>vERIFY OTP</button>
			</div>
			<div className="channel-area" style={{ display: 'flex', flexDirection: 'column', margin: '4vh auto', width: '20%', justifyContent: 'space-between' }}>
				<input type="text" placeholder="channel name" style={{ margin: '1rem auto'}} onChange={(e) => {setTitle(e.target.value)}}></input>
				<input type="text" style={{ margin: '1rem auto'}} placeholder="desc" onChange={(e) => {setDesc(e.target.value)}}></input>
				<button style={{ margin: '1rem auto'}} onClick={() => {handleCreateChannel()}}>create channel</button>
			</div>
		</>
	);
}
