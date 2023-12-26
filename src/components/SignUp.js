import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'

const SignUp = (props) => {
	let navigate=useNavigate();
	const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""})
	const handleOnchange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
	const handleSub = async (e) => {
		e.preventDefault();
		const {name,email,password}=credentials;
		const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createuser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({name, email, password })
		});
		const json =await response.json();
		if (json.success) {
			props.alertFunc('Account created successfully','success')
			localStorage.setItem('token',json.authtoken)
			navigate('/')
		}
		else{
			props.alertFunc('Failed to Sign Up','danger')
		}
	}
	return (
		<div className=''>
			<form className='signup-form' onSubmit={handleSub}>
				<div className="input-title">
					<input type="text" className="" onChange={handleOnchange} id="name" placeholder='Name' name="name" aria-describedby="emailHelp"required/>
				</div>
				<div className="input-title">
					<input type="email" className="" onChange={handleOnchange} id="email" placeholder='Email Id' name="email" aria-describedby="emailHelp"required/>
				</div>
				<div className="input-title">
					<input type="password" className="" onChange={handleOnchange} name="password" placeholder='Password' id="password" required minLength={8}/>
				</div>
				<div className="input-title">
					<input type="password" className="" onChange={handleOnchange} name="cpassword" placeholder='Confirm Password' id="cpassword" required minLength={8}/>
				</div>
				<button type="submit" id='signup-btn' className="my-btn">Sign Up </button>
			</form>
		</div>
	)
}

export default SignUp
