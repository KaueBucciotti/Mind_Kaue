import { NavLink, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { HiOutlineUser, HiOutlineSearch } from "react-icons/hi";
import { useAuth } from '../../context/authContext';

export default function NavDesktop() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // referência para o dropdown

    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login=0");
    };

    // 🔽 Fecha o dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav id="nav-desktop">
                <ul>
                    <NavLink id="linkSobreNos" to="/sobre-nos">
                        <li>Sobre nós</li>
                    </NavLink>
                    <NavLink
                        id="linkPlanos"
                        to="/"
                        onClick={(e) => {
                            if (window.location.pathname === "/") {
                                e.preventDefault();
                                document.getElementById('planos')?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }
                        }}>
                        <li>Planos</li>
                    </NavLink>
                    <NavLink id="linkArtigos" to="/artigos">
                        <li>Artigos</li>
                    </NavLink>
                    {isAuthenticated && (
                        <>
                            <NavLink to="/home">
                                <HiOutlineSearch id="search-icon-btn" className="icon-ui" />
                            </NavLink>
                        </>
                    )}
                </ul>
                <div className="nav-right-buttons" ref={dropdownRef}>
                    {!isAuthenticated ? (
                        <>
                        <Link to="login=0">
                    <button
                        type="button"
                        className="nav-btn-login"
                        onClick={() => setDropdownOpen(prev => !prev)}
                    >
                        {isAuthenticated ? user.nome : "Login"}
                    </button>
                    </Link>
                        </>

                    ):(
                        <>
                         <button
                        type="button"
                        className="nav-btn-login"
                        onClick={() => setDropdownOpen(prev => !prev)}
                    >
                        {isAuthenticated ? user.nome : "Login"}
                    </button>
                        </>
                    )}
                        
                    
                    

                    <div className={`nav-login-drop-wrapper ${isAuthenticated && isDropdownOpen ? "show" : ""}`}>
                        <div className="nav-login-drop">
                            {isAuthenticated ? (
                                <>
                                    {user && (
                                        <Link
                                            to={`/${user.tipo.toLowerCase()}/perfil/${user.id}`}
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <button type="button">Meu Perfil</button>
                                        </Link>
                                    )}
                                    <Link
                                        to={`/${user.tipo}/perfil/${user.id}/configuracoes`}
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <button type="button">Configurações</button>
                                    </Link>
                                    {user.tipo === "psicologo" && (
                                        <Link
                                            to="/adicionar-artigos"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <button type="button">Adicionar Artigos</button>
                                        </Link>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleLogout();
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        Sair
                                    </button>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
