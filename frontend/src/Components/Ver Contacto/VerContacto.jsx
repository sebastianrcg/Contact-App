import classes from "./vercontacto.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const VerContacto = () => {
    const [contacto, setContacto] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();


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
                    <button onClick={() => navigate("/")} className={classes.btnContactos}>Contactos</button>
                    <button onClick={()=> navigate(`/editar/${id}`)} className={classes.btnEditar}>Editar</button>
                </div>
                {contacto.map(contacto => {
                    return (
                        <>
                        <div className={classes.header}>
                            <h2>{contacto.nombre[0]}{contacto.apellido && contacto.apellido[0]}</h2>
                            <h3>{contacto.nombre} {contacto.apellido}</h3>
                        </div>

                        <div className={classes.dashboard}>
                            <div className={classes.dashboardIcon}>
                                
                                <BiSolidMessageRounded className={classes.icon}/>
                                <p>message</p>
                            </div>
                            <div className={classes.dashboardIcon}>
                                <FaPhone className={classes.icon}/>
                                <p>call</p>
                            </div>
                            <div className={classes.dashboardIcon}>
                                <FaVideo className={classes.icon}/>
                                <p>video</p>

                            </div>
                            <div className={classes.dashboardIcon}>
                                <IoIosMail className={classes.icon}/>
                                <p>mail</p>
                            </div>

                        </div>

                        <div className={classes.contactoInfo}>
                            <p><b>Numero: </b>{contacto.numero}</p>
                            <p><b>Correo: </b>{contacto.correo}</p>
                            <p><b>Cedula: </b>{contacto.cedula}</p>
                            <p><b>Fecha de Nacimiento: </b>{contacto.fechaNacimiento}</p>
                            <p><b>Tipo de Sangre: </b>{contacto.sangre}</p>

                        </div>
                        </>
                    )
                })

                }
            </div>
        </>
    )
};

export default VerContacto;