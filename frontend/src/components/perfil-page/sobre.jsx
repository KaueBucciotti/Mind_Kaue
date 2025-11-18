import '../../assets/styles/perfil.css';
import { useAuth } from "../../context/authContext";

export default function Sobre() {
    const { user } = useAuth();

    return (
        <>
            <div className="infos">
                <div className="card-info-container">
                    <h4>Sobre mim:</h4>
                    <div className="card-sobre-container">
                        <p>{user?.sobreMim || "Nenhuma informação adicionada."}</p>
                    </div>
                </div>
                <div className="card-info-container">
                    <h4>Ficha do Paciente</h4>
                    <div className="card-ficha-container">
                        <div>
                            <strong>Medicamentos:</strong>
                            <p>{user?.medicamentos || "Nenhum medicamento registrado."}</p>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                            <strong>Preferências:</strong>
                            <p>{user?.preferencias || "Nenhuma preferência registrada."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}