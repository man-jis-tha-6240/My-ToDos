import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
const Navbar = (props) => {
	const { pathname } = useLocation();
	let navigate = useNavigate();
	let location = useLocation();
	useEffect(() => {

	}, [location])
	const handleLogOut = () => {
		localStorage.removeItem('token')
		props.alertFunc('Logged out successfully', 'success')
		navigate('/login')
	}
	return (
		<nav className="my-navbar">
			<h3 className="main-head">My ToDos</h3>
			<div className="nav-btns" >
				{!localStorage.getItem('token') ? <form className="d-flex">
					<Link className={(pathname === '/login') ? 'active my-link' : 'my-link'} to="/login" role="button">Login</Link>
					<Link className={(pathname === '/signup') ? 'active my-link' : 'my-link'} to="/signup" role="button">Signup</Link>
				</form> : <p className="my-link" onClick={handleLogOut} role="button">Log Out <span className="material-icons">
					logout
				</span></p>}
			</div>

		</nav>
	)
}

export default Navbar
