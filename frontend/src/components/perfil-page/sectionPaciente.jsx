import '../../assets/styles/perfil.css';
import Info from './info.jsx';
import Calendario from './calendario.jsx';
import Sobre from './sobre.jsx';
import Notificacoes from './notificacoes.jsx';

export default function SectionPaciente({ id }) {
    return (
        <div className="container-section-perfil">
            <div className="perfil-container">
                <Info id={id} />
                <Calendario id={id} />
            </div>
            <div className="sobre-notif-container">
                <Sobre id={id} />
                <Notificacoes id={id} />
            </div>
        </div>
    );
}
