import '../../assets/styles/perfil.css';
import Info from './info.jsx';
import Calendario from './calendario.jsx';
import Sobre from './sobre.jsx';
import Notificacoes from './notificacoes.jsx';


export default function Section() {

    return (
        <>
            <div className="container-section-perfil">
                <div className="perfil-container">
                    <Info />
                    <Calendario />
                </div>
                <div className="sobre-notif-container">
                    <Sobre />
                    <Notificacoes />
                </div>
            </div>
        </>
    )
}