export default function InfosPerfil({ user }) {
  return (
    <>
        <div className="container-perfil" id="container-perfil">
            <h1>Perfil</h1>
            <div className="container-sobre-mim">
                <h3 id="sobreMim">Sobre mim</h3>
                <span>Escreva sobre você, condições médicas e diagnósticos recentes.</span>
                <textarea 
                    id="sobreMimEdit" 
                    type="text" 
                    rows="4"
                    defaultValue={user?.sobreMim || ""}
                ></textarea>
            </div>
            <div className="container-medicamento">
                <h3 id="Medicamento">Medicamento</h3>
                <span>Escreva sobre medicamentos já em uso, périodo de seu consumo, e se necessário, efeitos colateras pessoais.</span>
                <textarea 
                    id="medicamentosEdit"
                    type="text"
                    defaultValue={user?.medicamentos || ""}
                ></textarea>
            </div>
            <div className="container-preferencias">
                <h3 id="Preferencias">Preferências</h3>
                <span>Preferências de atendimento e assuntos</span>
                <textarea 
                    id="preferenciasEdit" 
                    type="text"
                    defaultValue={user?.preferencias || ""}
                ></textarea>
            </div>
        </div>
    </>
  )
}