import { useAuth } from "../../context/authContext";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import fotoPsi from '../../assets/img/perfil-default.png';
import '../../assets/styles/perfil.css';
import { Link } from "react-router-dom";

export default function InfoPsicologo() {
  const { user } = useAuth();

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="card-perfil-content">
      <div className="foto-perfil">
        <img id="perfilFoto" src={user.foto || fotoPsi} alt="Foto do Psicólogo" />
        <div className="info-perfil">
          <h3 id="perfilNome">{user.nome}</h3>

          <div className="container-info">
            <p id="perfilIdade">Idade:</p>
            <label>{user.idade || "—"}</label>
          </div>

          <div className="container-info">
            <p id="perfilLocal">Local:</p>
            <label>{user.local || "—"}</label>
          </div>
        </div>
      </div>

      <div className="settings">
        <div className="container-contatos">
          <div className="contato">
            <button 
              type="button" 
              className="icon-btn icon-ui" 
              onClick={() => navigator.clipboard.writeText(user.telefone || "")}
            >
              <HiOutlinePhone />
            </button>
            <span>{user.telefone || "+55 11 9000-0000"}</span>
          </div>

          <div className="contato">
            <button 
              type="button" 
              className="icon-btn icon-ui" 
              onClick={() => navigator.clipboard.writeText(user.email || "")}
            >
              <HiOutlineMail />
            </button>
            <span>{user.email || "email@exemplo.com"}</span>
          </div>
        </div>

        <div className="container-config-artigos">
          <Link to="/adicionar-artigos" className="button-config btn-mob">
            Criar Artigos
          </Link>
          <Link to={`/${user.tipo}/perfil/${user.id}/configuracoes`} className="button-config btn-mob">
            Configurações
          </Link>
        </div>
      </div>
    </div>
  );
}
