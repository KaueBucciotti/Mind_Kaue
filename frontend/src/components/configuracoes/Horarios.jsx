import "../../assets/styles/configuracoes/horarios-atendimento.css"
import CardHorarios from "../cards/CardHorarios"
import { useState } from "react";

export default function Horarios() {
  const [cardHorario, setCardHorario] = useState([]);

  const newCardHorario = () => {
    const cardId = Date.now();

    setCardHorario([...cardHorario, cardId])
  }

  return (
    <>
        <div className="container-perfil" id="container-horario-atendimento">
            <h1>Horário de atendimento</h1>
            <span>Escolha seus horários de atendimento por dia. Lembre-se que o periodo máximo padrão da
                plataforma para atendimento psicologico é de 40 min.</span>
            <button 
              type="button"
              className="btn-adicionar button-proceed"
              onClick={() => newCardHorario()}>
              + Adicionar Semana</button>

            <div>
              {cardHorario.map((_, i) => (
                <CardHorarios key={i}/>
              ))}

            </div> 
        </div>
    </>
  )
}
