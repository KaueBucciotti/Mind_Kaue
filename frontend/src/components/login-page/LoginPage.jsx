// import { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router";
// import background from "../../assets/img/background_input.png";
// import "../../assets/styles/input_login.css";
// import { useAuth } from "../../context/authContext";

// export default function LoginPage() {
//     const { login, error, loading, logout } = useAuth();
//     const [form, setForm] = useState({ login: "", senha: "" });
//     const [tipoUsuario, setTipoUsuario] = useState("paciente");
    
//     const navigate = useNavigate();
//     const location = useLocation();

//     // Detectar tipo de usuário pela URL
//     useEffect(() => {
//         const path = location.pathname;
        
//         if (path === "/login=0" || path === "/login") {
//             setTipoUsuario("paciente");
//         } else if (path === "/login=1") {
//             setTipoUsuario("psicologo");
//         } else if (path === "/login=2") {
//             setTipoUsuario("voluntario");
//         }
//     }, [location.pathname]);



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const result = await login(form.login, form.senha);
        
//         if (result.success) {
//             const { user } = result;
            
//             // Verificar se o tipo corresponde (apenas se não for /login genérico)
//             if (location.pathname !== "/login") {
//                 if (tipoUsuario === "psicologo" && user.tipo !== "psicologo") {
//                     alert("Este usuário não é um psicólogo. Use o login de paciente.");
//                     logout(); // DESLOGAR imediatamente
//                     return;
//                 }
                
//                 if (tipoUsuario === "paciente" && user.tipo !== "paciente") {
//                     alert("Este usuário não é um paciente. Use o login de psicólogo.");
//                     logout(); // DESLOGAR imediatamente
//                     return;
//                 }
//                 if (tipoUsuario === "paciente" && user.tipo !== "paciente") {
//                     alert("Este usuário não é um paciente. Use o login de psicólogo.");
//                     logout(); // DESLOGAR imediatamente
//                     return;
//                 }
            
//             }
            
//             // Redirecionar para home SOMENTE se passou na validação
//             navigate("/home");
//         }
//     };

//     const getTitulo = () => {
//         if (tipoUsuario === "psicologo") return "Entrar - Psicólogo";
//         if (tipoUsuario === "voluntario") return "Entrar - Voluntário";
//         return "Entrar - Paciente";
//     };


//     return (
//         <section className="login-inputs">
//             <img className="background" src={background} alt="Imagem inicial do site" />
//             <div className="container-input-login">
//                 <h1>{location.pathname === "/login" ? "Entrar" : getTitulo()}</h1>
//                 <form className="inputs" onSubmit={handleSubmit}>
//                     <span className="login-titulo">
//                         <label htmlFor="login0">Login</label>
//                     </span>
//                     <input
//                         id="login0"
//                         type="text"
//                         placeholder="E-mail ou nome do usuário"
//                         value={form.login}
//                         onChange={(e) => setForm({ ...form, login: e.target.value })}
//                         required
//                     />

//                     <span className="login-titulo">
//                         <label htmlFor="password0">Senha</label>
//                     </span>
//                     <input
//                         id="password0"
//                         type="password"
//                         placeholder="Senha"
//                         value={form.senha}
//                         onChange={(e) => setForm({ ...form, senha: e.target.value })}
//                         required
//                     />

//                     {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

//                     <div className="container-cadastrar-entrar">
//                         <Link to="/cadastro" className="link-cadastro">
//                             Não tenho cadastro
//                         </Link>
//                         <button type="submit" className="button-confirm" disabled={loading}>
//                             {loading ? "Entrando..." : "Entrar"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </section>
//     );
// }

