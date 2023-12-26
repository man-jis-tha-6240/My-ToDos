import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
	let navigate = useNavigate();
	const [credentials, setCredentials] = useState({ email: "", password: "" })
	const handleOnchange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}
	const handleSub = async (e) => {
		e.preventDefault();
		const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: credentials.email, password: credentials.password })
		});
		const json = await response.json();
		if (json.authtoken) {
			props.alertFunc('Logged in successfully', 'success')
			localStorage.setItem('token', json.authtoken)
			navigate('/')
		}
		else {
			props.alertFunc('Invalid login credentials', 'danger')
		}
	}
	return (

		<form className='login-form' onSubmit={handleSub}>
			<div className="input-title">
				<input type="email" className="" value={credentials.email} onChange={handleOnchange} id="email" name="email" placeholder='Email Id' aria-describedby="emailHelp" required />
			</div>
			<div className="input-title">
				<input type="password" className="" value={credentials.password} onChange={handleOnchange} name="password" placeholder='Password' id="password" minLength={8} required />
			</div>
			<button type="submit" className="my-btn">Log In</button>
		</form>
	)
}

export default Login
