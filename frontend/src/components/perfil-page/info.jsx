import { Link } from "react-router-dom";
import fotoPsi from '../../assets/img/perfil-default.png'
import '../../assets/styles/perfil.css';
import { HiOutlinePhone } from "react-icons/hi";
import { useAuth } from "../../context/authContext";
import PhotoDefault from "../../assets/img/perfil-default.png";


export default function Info() {
    const { user } = useAuth();
     const copyNumber = () => {
        if (user?.telefone) {
            navigator.clipboard.writeText(user.telefone);
            alert("Número copiado!");
        }
    };
    return (
        <>

            <div className="card-perfil-content">
                <div className="foto-perfil">
                    <img id="perfilFoto" src={user?.imgPerfil || PhotoDefault} alt="Foto de Perfil"/>
                        <div className="info-perfil ">
                            <h3 id="perfilNome">{user?.nome} {user?.sobrenome}</h3>
                            <div className="container-info">
                                <p id="perfilIdade">Idade:</p>
                            <label htmlFor="">{user?.idade || "N/A"}</label>
                            </div>
                            <div className="container-info">
                                <p id="perfilLocal">Local: </p>
                            <label htmlFor="">{user?.endereco || "N/A"}</label>
                            </div>
                        </div>
                </div>


                <div className="settings">
                    <div className="contato">
                        <button type="button"
                            className="icon-btn icon-ui"
                            onClick={copyNumber}
                            id="btn-telefone"><HiOutlinePhone /></button>
                        <span id="cell-n">{user?.telefone || "+55 11 0000-0000"}</span>
                    </div>
                    <button className="button-config btn-mob">
                        <Link to={`/${user?.tipo}/perfil/${user?.id}/configuracoes`}>
                            Configurações
                        </Link></button>
                </div>
            </div>

        </>
    );
}


