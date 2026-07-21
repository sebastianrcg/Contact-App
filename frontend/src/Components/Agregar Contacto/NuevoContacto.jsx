import { useState } from "react";
import classes from "./nuevocontacto.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import axios from "axios";



const NuevoContacto = () => {
    const [contacto, setContacto] = useState({
        nombre: "",
        apellido: "",
        numero: "",
        correo: "",
        cedula: "",
        fechaNacimiento: "",
        sangre: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContacto(prev => ({ ...prev, [name]: value }))
    }

    const enviarContacto = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/contactos", { ...contacto });
            navigate("/");



        } catch (error) {

        }
    }

    const navigate = useNavigate();
    return (
        <>
            <div className={classes.container}>
                <button onClick={() => navigate("/")} className={classes.atrasBtn}>Cancelar</button>
                <IoMdContact className={classes.icon} size={"160px"} />

                <div className={classes.inputContainer}>
                    <form onSubmit={(e) => enviarContacto(e)}>
                        <div>
                            <input type="text" name="nombre" placeholder="Nombre" value={contacto.nombre} onChange={handleChange} required/>
                            <input type="text" name="apellido" placeholder="Apellido" value={contacto.apellido} onChange={handleChange} required/>
                            <input type="text" name="numero" placeholder="Numero" value={contacto.numero} onChange={handleChange} required/>
                        </div>
                        <div>
                            <input type="email" name="correo" placeholder="Correo" value={contacto.correo} onChange={handleChange} />
                            <input type="text" name="cedula" placeholder="Cedula" value={contacto.cedula} onChange={handleChange} />

                            <input type="date" name="fechaNacimiento" id="" placeholder="Fecha de Nacimiento" value={contacto.fechaNacimiento} onChange={handleChange} title="Fecha de Nacimiento"/>
                            <select name="sangre" value={contacto.sangre} onChange={handleChange}>
                                <option value="" selected disabled>Tipo de Sangre</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <button type="submit" className={classes.saveBtn}>Guardar Contacto</button>

                    </form>

                </div>




            </div>
        </>
    )
}

export default NuevoContacto;