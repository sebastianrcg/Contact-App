import { useState, useEffect } from "react";
import classes from "./contactos.module.css";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import ContactoCard from "../Contacto Card/ContactoCard";

const Contactos = () => {
    const [contactos, setContactos] = useState([]);


    const navigate = useNavigate();

    useEffect(()=> {

        const getContactos = async () =>{
            try {

                const response = await axios.get("http://localhost:10000/contactos");
                console.log(response)
                setContactos(response.data);

            } catch (error) {

            }
        }

        getContactos();

    }, []);

    return (

        <>
            <div className={classes.container}>
                <div>
                    <button onClick={()=> navigate("/crearContacto")} className={classes.agregarBtn} title="Agregar Contacto">+</button>
                </div>
                <h1 className={classes.title}>Contactos</h1>

                <div className={classes.inputContainer}>
                    <input type="text" placeholder="Search" />
                    <IoSearchOutline className={classes.inputSearch} size={"22px"}/>
                </div>
                <hr />

                <div>
                    { (contactos.length > 0) && contactos.map(contacto => {
                        return (
                            <ContactoCard id={contacto["_id"]} nombre={contacto.nombre} apellido={contacto.apellido} />
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default Contactos;