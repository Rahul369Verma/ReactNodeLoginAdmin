import axios from "axios";
import { useReducer, createContext, useEffect } from "react";


// initial State
const initialState = {
    email: null,
    username: null,
    type: null
}

// create Context
const Context = createContext()

// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            const user = action.payload
            return {
                ...state, email: user.email, username: user.username, type: user.type
            }
        case "LOGOUT":
            return {
                ...state, email: initialState.email, username: initialState.username, type: initialState.type
            }
        default:
            return state
    }
}

// context Provider
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    useEffect(() => {
        axios.get("http://localhost:5000/userData", { withCredentials: true })
            .then((response) => {
                window.sessionStorage.setItem("user", JSON.stringify(response.data))
                dispatch({
                    type: "LOGIN",
                    payload: response.data || ""
                })
            }).catch(err => {
                console.log(err.response?.data)
                if (err.response?.status === 403) {
                    axios.get("http://localhost:5000/refreshToken", {
                        withCredentials: true
                    }).then((response) => {
                        console.log("login with RT");
                        window.sessionStorage.setItem("user", JSON.stringify(response.data))
                        dispatch({
                            type: "LOGIN",
                            payload: response.data || ""
                        })
                    }).catch((err) => {
                        window.sessionStorage.removeItem("user")
                    })
                } else {
                    window.sessionStorage.removeItem("user")
                }
            })

    }, [])

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }