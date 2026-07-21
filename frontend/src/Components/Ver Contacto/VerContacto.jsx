import classes from "./vercontacto.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const VerContacto = () => {
    const [contacto, setContacto] = useState([]);
    const [showCall, setShowCall] = useState(false);
    const [listaContactos, setListaContactos] = useState([]);
    const [callData, setCallData] = useState({
        idContacto: "",
        minutos: "",
        segundos: "",
        motivoLlamada: ""
    });
    const [submittedData, setSubmittedData] = useState(false);



    const navigate = useNavigate();

    const { id } = useParams();

    const showMenu = () => {
        setShowCall(!showCall)
    }

    const handleCallData = (e) => {
        const { name, value } = e.target;
        setCallData(prev => ({ ...prev, [name]: value }));
    }

    const cancelarLlamadaEntry = (e) => {
        e.preventDefault();
        setShowCall(false)
        setCallData({
            idContacto: "",
            minutos: "",
            segundos: "",
            motivoLlamada: ""
        })
    }

    const submitCallData = async (e) => {
        e.preventDefault();

        const formattedMinutes = String(callData.minutos).padStart(2, "0");
        const formattedSeconds = String(callData.segundos).padStart(2, "0");

        const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
        const data = { ...callData };
        setCallData({
            idContacto: "",
            minutos: "",
            segundos: "",
            motivoLlamada: ""
        });
        setShowCall(false);
        setSubmittedData(true);
        try {
            const response = await axios.post(`/contactos/${id}`, { idContacto: data.idContacto, tiempoLlamada: formattedTime, motivoLlamada: data.motivoLlamada });



        } catch (err) {

        } finally {

            

        }

    }

    const generatePDF = () => {


        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        })

        const pageWidth = doc.internal.pageSize.getWidth();
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.text(`Reporte de Contacto`, doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });


        doc.setFillColor(200, 200, 255);
        doc.rect(10, 27, doc.internal.pageSize.getWidth() - 20, 20, "F");

        doc.setFontSize(12);
        doc.setTextColor(0);


        doc.text(`Nombre: ${contacto[0].nombre} ${contacto[0].apellido}`,
            12,
            32
        );
        doc.text(`Teléfono: ${contacto[0].numero}`, pageWidth / 2, 32);

        doc.text(`Correo: ${contacto[0].correo}`, 12, 38);
        doc.text(`Sangre: ${contacto[0].sangre}`, pageWidth / 2, 38);

        doc.text(`Cédula: ${contacto[0].cedula}`, 12, 44);
        doc.text(`Fecha Nac.: ${contacto[0].fechaNacimiento}`, pageWidth / 2, 44);

        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.text(`Llamadas Realizadas`, doc.internal.pageSize.getWidth() / 2, 55, { align: "center" });

        if (contacto[0].llamadas && contacto[0].llamadas.length > 0) {
            // Calls table
            const rows = contacto[0].llamadas.map((llamada) => [
                llamada.idContacto,
                llamada.nombreContacto,
                llamada.numeroContacto,
                llamada.tiempoLlamada,
                llamada.motivoLlamada
            ]);

            autoTable(doc, {
                head: [["ID", "Nombre", "Teléfono", "Tiempo", "Motivo"]],
                body: rows,
                startY: 60,
                styles: { fontSize: 11, cellPadding: 3 }
            });
        } else {
            doc.text("No hay llamadas registradas.", pageWidth/ 2, 90, {align: "center"});
        }



        // Option: open in new tab
        window.open(doc.output("bloburl"), "_blank");
        // doc.save("reporte_contacto.pdf");
    }

    useEffect(() => {
        const getContactList = async () => {
            try {
                const response = await axios.get("/contactos/");
                const filteredContacts = response.data.filter(contacto => contacto["_id"] !== id);
                setListaContactos(filteredContacts);

            } catch (error) {

            }
        }

        getContactList();

    }, [id])

    useEffect(() => {

        setSubmittedData(false);

        const getContactoInfo = async (id) => {
            try {
                const response = await axios.get(`/contactos/${id}`);
                setContacto(response.data);

            } catch (error) {

            }
        }
        getContactoInfo(id);

    }, [id, submittedData])

    return (
        <>
            <div className={classes.container}>
                <div className={classes.btnContainer}>
                    <button onClick={() => navigate("/")} className={classes.btnContactos}>Contactos</button>
                    <button onClick={generatePDF} className={classes.btnEnviar}>Generar Reporte</button>
                    <button onClick={() => navigate(`/editar/${id}`)} className={classes.btnEditar}>Editar</button>
                </div>

                {contacto.map(contacto => {
                    return (
                        <>
                            <div className={classes.header}>
                                <h2>{contacto.nombre[0]}{contacto.apellido && contacto.apellido[0]}</h2>
                                <h3>{contacto.nombre} {contacto.apellido}</h3>
                            </div>

                            <div className={classes.dashboard}>

                                <div onClick={showMenu} className={`${classes.dashboardIcon} ${classes.iconBtn}`}>
                                    <FaPhone className={classes.icon} />
                                    <p>call</p>
                                </div>
                                <div className={classes.dashboardIcon}>

                                    <BiSolidMessageRounded className={classes.icon} />
                                    <p>message</p>
                                </div>

                                <div className={classes.dashboardIcon}>
                                    <FaVideo className={classes.icon} />
                                    <p>video</p>

                                </div>
                                <div className={classes.dashboardIcon}>
                                    <IoIosMail className={classes.icon} />
                                    <p>mail</p>
                                </div>

                            </div>

                            {/* {
                                showCall &&
                                <div ref={callMenuRef} className={classes.callMenu} style={{
                                    maxHeight: showCall ? `${callMenuRef.current?.scrollHeight}px` : "0px",
                                    overflow: "hidden",
                                    transition: "max-height 0.4s ease-out"
                                }}>

                                </div>
                            } */}

                            <div className={`${classes.callMenu} ${showCall ? classes.open : ""}`}>
                                <h3>Registrar Llamada</h3>

                                <form>

                                    <select name="idContacto" value={callData.idContacto} onChange={handleCallData} required>
                                        <option value="" selected disabled>Elegir Contacto</option>
                                        {listaContactos.map(contacto => {
                                            return (
                                                <option value={contacto["_id"]}>{contacto.nombre} {contacto.apellido}</option>
                                            )
                                        })}
                                    </select>

                                    <div>
                                        <h4>Tiempo de Llamada</h4>
                                        <label>Minutos:</label>
                                        <input type="number" name="minutos" min="0" step="1" placeholder="Minutos" value={callData.minutos} onChange={handleCallData} required />

                                        <label>Segundos:</label>
                                        <input type="number" name="segundos" min="0" max="59" step="1" placeholder="Segundos" value={callData.segundos} onChange={handleCallData} required />
                                    </div>
                                    <textarea name="motivoLlamada" placeholder="Motivo o Razon de llamada." value={callData.motivoLlamada} onChange={handleCallData}></textarea>

                                    <div className={classes.btnFormContainer}>
                                        <button onClick={cancelarLlamadaEntry} className={classes.btnCancelar} type="reset">Cancelar</button>
                                        <button onClick={submitCallData} className={classes.btnEnviar}>Registrar</button>
                                    </div>
                                </form>

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