import { usePsicologos } from "../../context/psicologos";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import fotoPsi from '../../assets/img/perfil-default.png';
import '../../assets/styles/perfil.css';
import VerPsi from "../pop-ups/Verpsi"; // 🔹 Importa o pop-up

export default function InfoPublicoPsicologo() {
    const { id } = useParams();
    const location = useLocation();
    const { psicologos } = usePsicologos();

    const [perfil, setPerfil] = useState(null);
    const [openPsi, setOpenPsi] = useState(false);

    useEffect(() => {
        // 1️⃣ Se veio o perfil pelo navigate (state), usa ele direto
        if (location.state?.perfil) {
            setPerfil(location.state.perfil);
            return;
        }

        // 2️⃣ Se não veio, tenta buscar pelo contexto
        if (psicologos?.length > 0) {
            const encontrado = psicologos.find(p => String(p.id) === String(id));
            if (encontrado) {
                console.log("✅ Perfil encontrado no contexto:", encontrado);
                setPerfil(encontrado);
            }
        }
    }, [id, psicologos, location.state]);

    if (!perfil) return <p>Carregando...</p>;

    return (
        <>
            <div className="card-perfil-content">
                <div className="foto-perfil">
                    <img id="perfilFoto" src={perfil.foto || fotoPsi} alt="Foto do Psicólogo" />
                    <div className="info-perfil">
                        <h3 id="perfilNome">{perfil.nome}</h3>

                        <div className="container-info">
                            <p>Idade:</p>
                            <label>{perfil.idade || "—"}</label>
                        </div>

                        <div className="container-info">
                            <p>Local:</p>
                            <label>{perfil.local || "—"}</label>
                        </div>
                    </div>
                </div>

                <div className="settings">
                    <div className="container-contatos">
                        <div className="contato">
                            <button
                                type="button"
                                className="icon-btn icon-ui"
                                onClick={() => navigator.clipboard.writeText(perfil.email || "")}
                            >
                                <HiOutlineMail />
                            </button>
                            <span>{perfil.email || "email@exemplo.com"}</span>
                        </div>
                    </div>

                    <div className="container-config-artigos">
                        <button
                            className="button-ver-card-psi"
                            id="btn-abrir-pop-up"
                            onClick={() => setOpenPsi(true)}
                        >
                            Agendar
                        </button>
                    </div>
                </div>
            </div>

            {/* 🔹 Renderiza o pop-up VerPsi */}
            <VerPsi
                open={openPsi}
                close={() => setOpenPsi(false)}
                perfil={perfil}
            />
        </>
    );
}
