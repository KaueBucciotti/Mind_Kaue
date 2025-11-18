import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import background from "../../assets/img/background_input.png";
import '../../assets/styles/input_login.css';
import OptionsLogin from "./optionsLogin";
import { useAuth } from "../../context/authContext";
import { toast } from 'react-toastify';

export default function InputLogin() {
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



    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(form.login, form.senha);
        
        if (result.success) {
            const { user } = result;
            
            // Verificar se o tipo corresponde (apenas se não for /login genérico)
            if (location.pathname !== "/login") {
                if (tipoUsuario === "psicologo" && user.tipo !== "psicologo") {
                    toast.error("Este usuário não é um psicólogo. Use o login de paciente.", {
                        position: "top-center",
                        closeButton: true,
                        autoClose: 7000,
                        theme: "light",
                        draggable: true,
                        ariaLabel: "Este usuário não é um psicólogo. Use o login de paciente."
                    })
                    logout(); // DESLOGAR imediatamente
                    return;
                }
                
                if (tipoUsuario === "paciente" && user.tipo !== "paciente") {
                    toast.error("Este usuário não é um paciente. Use o login de psicólogo.", {
                        position: "top-center",
                        closeButton: true,
                        autoClose: 7000,
                        theme: "light",
                        draggable: true,
                        ariaLabel: "Este usuário não é um paciente. Use o login de psicólogo."
                    })
                    logout(); // DESLOGAR imediatamente
                    return;
                }
            }
            
            // Redirecionar para home SOMENTE se passou na validação
            toast.success("Logado", {
                position: "top-center",
                theme: "light",
                autoClose: 2000,
                draggable: true,
                ariaLabel: "Logado"
            })
            navigate("/home")
        }
    };

    return (
        <>
            <section className="login-inputs">
                <div className="background-img-login-cadastro">
                    <img className="background" 
                        src={background} 
                        alt="Imagem de fundo - tela de cadastro" 
                    />
                </div>
                <div className="container-input-login">
                    <h1>Login</h1>
                    <OptionsLogin></OptionsLogin>
                    <form className="inputs" onSubmit={handleSubmit}>
                        <span className="login-titulo">
                            <label htmlFor="login0">Login</label>
                        </span>
                        <input
                            id="login0"
                            type="text"
                            placeholder="E-mail ou nome do usuário"
                            value={form.login}
                            onChange={(e) => setForm({ ...form, login: e.target.value })}
                            required
                        />
    
                        <span className="login-titulo">
                            <label htmlFor="password0">Senha</label>
                        </span>
                        <input
                            id="password0"
                            type="password"
                            placeholder="Senha"
                            value={form.senha}
                            onChange={(e) => setForm({ ...form, senha: e.target.value })}
                            required
                        />
    
                        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    
                        <div className="container-cadastrar-entrar">
                            <Link to="/cadastro=0" className="link-cadastro">
                                Não tenho cadastro
                            </Link>
                            <button 
                                type="submit" 
                                className="button-confirm" 
                                disabled={loading}>
                                {loading ? "Entrando..." : "Entrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
