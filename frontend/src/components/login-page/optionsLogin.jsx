import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { useAuth } from "../../context/authContext";

import '../../assets/styles/landing-page/hero-apresentacao.css';

export default function OptionsLogin() {

    const { login, error, loading, logout } = useAuth();
    const [form, setForm] = useState({ login: "", senha: "" });
    const [tipoUsuario, setTipoUsuario] = useState("paciente");

    const navigate = useNavigate();
    const location = useLocation();

    // Detectar tipo de usuário pela URL
    useEffect(() => {
        const path = location.pathname;

        if (path === "/login=0" || path === "/login") {
            setTipoUsuario("paciente");
        } else if (path === "/login=1") {
            setTipoUsuario("psicologo");
        } else if (path === "/login=2") {
            setTipoUsuario("voluntario");
        }
    }, [location.pathname]);

    return (
        <div className="container-options">
            <Link to="/login=0">
                <button className={tipoUsuario === "paciente" ? "active" : ""}>
                    Paciente
                </button>
            </Link>
            <Link to="/login=1">
                <button className={tipoUsuario === "psicologo" ? "active" : ""}>
                    Psicologo
                </button>
            </Link>
            <Link to="/login=2">
                <button className={tipoUsuario === "voluntario" ? "active" : ""}>
                    Voluntario
                </button>
            </Link>
        </div>
    )
}
