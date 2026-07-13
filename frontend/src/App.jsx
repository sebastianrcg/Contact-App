import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contactos from "./Components/Contactos/Contactos";
import NuevoContacto from "./Components/Agregar Contacto/NuevoContacto";
import VerContacto from "./Components/Ver Contacto/VerContacto";
import EditarContacto from "./Components/Editar Contacto/EditarContacto";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contactos />}/>
          <Route path="/crearContacto" element={<NuevoContacto />}/>
          <Route path="/contacto/:id" element={<VerContacto />}/>
          <Route path="/editar/:id" element={<EditarContacto />}/>


        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
