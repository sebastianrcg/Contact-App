import classes from "./contactocard.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const ContactoCard = ({id ,nombre, apellido}) => {

    const navigate = useNavigate();

    return (
        <>
            <div onClick={()=> navigate(`/contacto/${id}`)} className={classes.card}>
                <p>{nombre} {apellido}</p>

                <div >
                    {/* <FaPhoneAlt /> */}
                    <FaPhone className={classes.icons} />
                    <BiSolidMessageRounded className={classes.icons}/>
                </div>
            </div>
        </>
    )
}

export default ContactoCard