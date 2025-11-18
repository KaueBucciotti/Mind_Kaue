import { HiChevronDown } from "react-icons/hi";
import { useState } from "react"

export default function CardHorarios() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [fourtyMinutesLater, setFourtyMinutesLater] = useState('');

    const calculateHour = (hour) => {
        const [hh, mm] = hour.split(":").map(Number)
        const data = new Date();

        data.setHours(hh, mm, 0, 0)
        data.setMinutes(data.getMinutes() + 40);

        setFourtyMinutesLater(data.toTimeString().slice(0,5))
    }
    
    return (
    <>
        <div className="container-agendamento">
            <div className="container-horario">
                <div className="inputs-horarios">
                    <select>
                        <option disabled hidden>Segunda</option>
                        <option value="Domingo">Domingo</option>
                        <option value="Segunda">Segunda</option>
                        <option value="Terca">Terca</option>
                        <option value="Quarta">Quarta</option>
                        <option value="Quinta">Quinta</option>
                        <option value="Sexta">Sexta</option>
                        <option value="Sabado">Sabado</option>
                    </select>
                    <input 
                        type="time" 
                        onChange={(e) => calculateHour(e.target.value)}/>
                    <input type="time" 
                        defaultValue={fourtyMinutesLater}/>
                </div>
                <div className="arrow-options">

                    <button 
                        type="button" 
                        id="abrir-options-agendamento"
                        onClick={() => {
                            isDropdownOpen ? 
                            setDropdownOpen(false) : 
                            setDropdownOpen(true)}}
                        className={isDropdownOpen ? "active" : ""}>
                        <HiChevronDown />
                    </button>

                </div>
            </div>
            <div 
                className="container-confirmar" 
                id="options-agendamento" 
                style={{ display: isDropdownOpen ? 'flex' : 'none' }}>

                <button className="confirmar-agendamento button-confirm">Confirmar</button>
                <button className="cancelar-agendamento button-cancelar">Cancelar</button>
            </div>
        </div>
    </>
  )
}
