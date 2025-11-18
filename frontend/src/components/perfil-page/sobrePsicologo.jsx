import '../../assets/styles/perfil.css';


export default function SobrePsicologo() {
    return (
        <>
            <div className="infos">
            <div className="card-info-container">
                <h4>Sobre mim:</h4>
                <div className="card-sobre-container"></div>
            </div>
            <div className="card-info-container">
                <h4>Especializações</h4>
                <div className="card-ficha-container-psi"></div>
            </div>
            <div className="container-horarios-psi">
                <h4>Horários de Atendimento</h4>
                <div className="container-horario-atendimento-psi">
                    <p>Segunda-feira</p>
                    <p>09:00</p>
                    <p>09:40</p>
                </div>
                <div className="container-horario-atendimento-psi">
                    <p>Sexta-feira</p>
                    <p>19:00</p>
                    <p>20:00</p>
                </div>
                
            </div>
        </div>

        </>
    )
}


