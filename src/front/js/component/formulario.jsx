import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Formulario = ({type}) => {

    const {store, actions} = useContext(Context)
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    }) 

    const handleChange = e => setFormData ({...formData, [e.target.name]: e.target.value})
    
    const handleSubmit = e => {
        e.preventDefault()
        console.log('submit', formData, 'type=>', type)
        type == 'login' ? actions.login(formData) : actions.register(formData)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" onChange={handleChange} name="email" placeholder="example.@gmail.com" value= {formData.email} />
            <input type="password"  onChange={handleChange} name="password" placeholder="password" value= {formData.password}/>
            <input type="submit" value={type === 'login' ? 'Iniciar sesión' : 'Registrarse'}/>
        </form>
    )
    
  



}