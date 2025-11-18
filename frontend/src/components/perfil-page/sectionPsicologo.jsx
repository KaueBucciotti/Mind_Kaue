import '../../assets/styles/perfil.css';
import InfoPsicologo from './infoPsicologo.jsx';
import Calendario from './calendario.jsx';
import SobrePsicologo from './sobrePsicologo.jsx';
import Notificacoes from './notificacoes.jsx';

export default function SectionPsicologo({ id }) {
    return (
        <div className="container-section-perfil">
            <div className="perfil-container">
                <InfoPsicologo id={id} />
                <Calendario id={id} />
            </div>
            <div className="sobre-notif-container">
                <SobrePsicologo id={id} />
                <Notificacoes id={id} />
            </div>
        </div>
    );
}
