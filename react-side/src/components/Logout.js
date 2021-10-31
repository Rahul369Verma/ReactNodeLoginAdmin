import { useContext } from "react"
import { Context } from '../context';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const Logout = () => {

    const { state, dispatch } = useContext(Context)
    const history = useHistory()
    axios.get('http://localhost:5000/logout', {
        withCredentials: true
    }).then((response) => {
        dispatch({
            type: "LOGOUT",
        })
        window.sessionStorage.removeItem("user")
        history.push("/login")
        // window.location.reload(false);

    })
    return null

}

export default Logout