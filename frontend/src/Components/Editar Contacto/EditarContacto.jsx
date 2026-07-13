import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import classes from "./editarcontacto.module.css";
import { useNavigate } from "react-router-dom";


const EditarContacto = () => {

    const [contacto, setContacto] = useState([])

    const navigate = useNavigate();

    const { id } = useParams();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContacto(prev => ([{ ...prev, [name]: value }]))
    }

    const eliminarContacto = async (id) => {
        if (confirm("Continuar y eliminar contacto?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/contactos/${id}`);
                navigate("/");

            } catch (error) {

            }
        }
    }

    const actualizarContacto = async (id) =>{
        try {
            const response = await axios.put(`http://localhost:5000/contactos/${id}`, {...contacto[0]});
            navigate(-1);

        } catch (error) {

        }
    }

    useEffect(() => {
        const getContactoInfo = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/contactos/${id}`);
                setContacto(response.data);

            } catch (error) {

            }
        }
        getContactoInfo(id);

    }, [id])
    return (
        <>
            <div className={classes.container}>
                <div className={classes.btnContainer}>
                    <button onClick={() => navigate(-1)} className={classes.btnAtras}>Atras</button>
                    <button onClick={()=> eliminarContacto(id)} className={classes.btnBorrar}>Borrar</button>
                </div>

                {
                    contacto.map(contacto => {
                        return (
                            <>
                                <div className={classes.inputContainer}>

                                    <div>
                                        <input type="text" name="nombre" placeholder="Nombre" value={contacto.nombre} onChange={handleChange} />
                                        <input type="text" name="apellido" placeholder="Apellido" value={contacto.apellido} onChange={handleChange} />
                                        <input type="text" name="numero" placeholder="Numero" value={contacto.numero} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <input type="email" name="correo" placeholder="Correo" value={contacto.correo} onChange={handleChange} />
                                        <input type="text" name="cedula" placeholder="Cedula" value={contacto.cedula} onChange={handleChange} />

                                        <input type="date" name="fechaNacimiento" id="" placeholder="Fecha de Nacimiento" value={contacto.fechaNacimiento} onChange={handleChange} />
                                        <select name="sangre" value={contacto.sangre} onChange={handleChange}>
                                            <option value="" disabled>Tipo de Sangre</option>
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

                                </div>
                                <button onClick={()=> actualizarContacto(id)} className={classes.saveBtn}>Guardar</button>
                            </>
                        )
                    })
                }
            </div>


        </>
    )
}

export default EditarContacto;

