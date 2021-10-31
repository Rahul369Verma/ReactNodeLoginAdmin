import axios from "axios";
import { useState, useContext, useEffect } from "react"
import { Context } from '../context';
import { useHistory } from 'react-router-dom';


const User = () => {

	const history = useHistory()

	const { state } = useContext(Context)
	const [data, setData] = useState(false)
	if (data === false) {
		axios.get("http://localhost:5000/user", {
			withCredentials: true
		})
			.then((response) => {
				setData(response.data.message)
			}).catch(err => {
				if (err.response?.status === 403) {
					console.log("receive 403 from token");
					axios.get("http://localhost:5000/refreshToken", {
						withCredentials: true
					}).then((response) => {
						console.log("login with RT");
					}).catch((err) =>{
						history.push("/logout")
					})
				}
			})

	}

	if (state.type === "admin") {
		return (
			<div>
				Hello Admin
				{data && (
					<div>
						{data}
						<br />
					</div>
				)}
			</div>
		)
	}
	if (state.type === "normal") {
		return (
			<div>
				Hello Stranger
				{data && (
					<div>
						{data}
						<br />
					</div>
				)}
			</div>
		)
	}

	return (
		<div>
		</div>
	)
}

export default User