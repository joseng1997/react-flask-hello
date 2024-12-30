import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Perfil = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const handleLogout = () => {
		actions.logout()
		navigate('/')
	}

    useEffect (() =>{
        if (!localStorage.getItem('token')) navigate ('/')
            actions.getUserData()
    },[])

    
	return (
		<div className="text-center mt-5">
			<h2>User Profile</h2>
            <p>correo: {store.user?.email}</p>

        <button onClick={handleLogout}> Logout</button>
		</div>
	);
};