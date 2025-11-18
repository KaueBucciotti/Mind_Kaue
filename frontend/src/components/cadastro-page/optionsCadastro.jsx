import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import "../../assets/styles/landing-page/hero-apresentacao.css";

export default function OptionsCadastro() {
    const [tipoUsuario, setTipoUsuario] = useState("paciente");
    const location = useLocation();

    // Detectar tipo de usuário pela URL
    useEffect(() => {
        const path = location.pathname;

        if (path === "/cadastro=0" || path === "/cadastro") {
            setTipoUsuario("paciente");
        } else if (path === "/cadastro=1") {
            setTipoUsuario("psicologo");
        } else if (path === "/cadastro=2") {
            setTipoUsuario("voluntario");
        }
    }, [location.pathname]);

    return (
        <div className="container-options">
            <Link to="/cadastro=0">
                <button className={tipoUsuario === "paciente" ? "active" : ""}>
                    Paciente
                </button>
            </Link>
            <Link to="/cadastro=1">
                <button className={tipoUsuario === "psicologo" ? "active" : ""}>
                    Psicólogo
                </button>
            </Link>
            <Link to="/cadastro=2">
                <button className={tipoUsuario === "voluntario" ? "active" : ""}>
                    Voluntário
                </button>
            </Link>
        </div>
    );
}
