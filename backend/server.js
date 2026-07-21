const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path")


const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname,"../frontend/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const MONGO_URL = "mongodb://s_cruzguenen:8097808055@mongo.ia3x.com:27017/s_cruzguenen_tarea3?authSource=admin";

mongoose.connect(MONGO_URL).then(() => console.log("Connected to MongoDb database Tarea 3")).catch((error) => console.log("Error connecting to MongoDb database."))


const ContactoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    numero: { type: String, required: true },
    correo: { type: String, required: true },
    sangre: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], required: true },
    cedula: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    llamadas: {
        type: [{
            idContacto: { type: String, required: true },
            nombreContacto: { type: String, required: true },
            tiempoLlamada: { type: String, required: true },
            motivoLlamada: { type: String, default: null }
        }],
        default: []
    }
});

const Contactos = mongoose.model("Contacto", ContactoSchema);

app.get("/contactos", async (req, res) => {
    try {
        const contactos = await Contactos.find().sort({"nombre": 1, "apellido": 1});
        res.json(contactos);

    } catch (err) {
        res.status(500).json({ msg: "Error obteniendo contactos." })
    }
});

app.get("/contactos/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const contacto = await Contactos.find({ "_id": id });
        res.json(contacto);

    } catch (err) {
        res.status(500).json({ msg: "Error obteniendo contacto." });
    }

});

app.post("/contactos", async (req, res) => {
    const { nombre, apellido, numero,correo, sangre, cedula, fechaNacimiento } = req.body;
    try {
        const nuevoContacto = new Contactos({ nombre, apellido, numero,correo, sangre, cedula, fechaNacimiento });
        await nuevoContacto.save();
        res.status(201).json({ nuevoContacto, msg: "Contacto creado." });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            msg: "Error creando Cotizacion."
        });
    }
});

app.delete("/contactos/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const accion = await Contactos.findOneAndDelete({ "_id": id });

        if (!accion) {
            return res.status(404).json({ msg: "Contacto no encontrado." });
        }
        res.json({ msg: "Contacto eliminado." });

    } catch (err) {
        res.status(500).json({
            error: err.message,
            msg: "Error elimando Contacto."
        });
    }
});

app.post("/contactos/:id", async(req, res)=>{
    const id = req.params.id;
    const {idContacto, tiempoLlamada, motivoLlamada} = req.body;

    try{

        const contacto = await Contactos.findById(idContacto);
        const nombreContacto = `${contacto.nombre} ${contacto.apellido}`;

        const dataLlamada = await Contactos.findOneAndUpdate({"_id": id}, { $push: {
            llamadas: {idContacto: idContacto, nombreContacto: nombreContacto, tiempoLlamada: tiempoLlamada, motivoLlamada: motivoLlamada}
        } })

    } catch (err) {

    }
});

app.put("/contactos/:id", async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, numero,correo, sangre, cedula, fechaNacimiento } = req.body;
    try {
        const accion = await Contactos.findOneAndUpdate({"_id": id}, {nombre, apellido, numero,correo, sangre, cedula, fechaNacimiento}, { new: true, runValidators: true });

        if (!accion) {
            return res.status(404).json({ msg: "Contacto no encontrado." });
        }
        res.json({ msg: "Contacto actualizando." });

    } catch (err) {
        res.status(500).json({
            error: err.message,
            msg: "Error actualizando Contacto."
        });

    }

});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})