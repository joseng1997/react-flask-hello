import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h2>REGISTER</h2>
			<Formulario type={'register'} />

			<h2>LOGIN</h2>
			<Formulario type={'register'} />
		</div>
	);
};
