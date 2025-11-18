import fotoPsi from '../../assets/img/perfil-default.png'

export default function CardPsicologos({
    perfis,
    setSelectedPerfil,
    setOpenPsi,
    classType
}) {
  return (
    <>
      {perfis.map((item, index) => (
          <div className={`card-psi ${classType}`} key={index}>
              <div className={`psi-foto-perfil ${classType}`}>
                  <img className={`foto-psi ${classType}`} src={fotoPsi} alt="foto" />
              </div>
              <div className={`informacoes-gerais-psi-card ${classType}`}>
                <div className={`infos-psi ${classType}`}>
                    <h1 className={`nome-psi ${classType}`}>{item.nome} {item.sobrenome}</h1>
                    <div className={`local-info ${classType}`}>
                        <p>Local:</p>
                        <p className={`local-psi ${classType}`}>{item.local}</p>
                    </div>
                </div>
                <div className={`especialidades-psicologo ${classType}`}>
                  <p className={`title-conhecimentos ${classType}`}>Conhecimentos</p>
                  <div className={`tags-cards card-psi-body ${classType}`}>
                      {item.tags.map((list, i) => (
                          <a key={i} data-speciality={list}>{list}</a>
                      ))}
                  </div>
                </div>
              </div>
              <div className={`container-btn-ver ${classType}`}>
                  <button
                      className={`button-ver-card-psi ${classType}`}
                      id="btn-abrir-pop-up"
                      onClick={() => {
                          if (setSelectedPerfil) setSelectedPerfil(item);
                          if (setOpenPsi) setOpenPsi(true);
                      }}
                  > Ver
                  </button>
              </div>
          </div>
      ))}
    </>
  )
}
