import React, { useState } from "react";
import '../../assets/styles/perfil.css';
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";



const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

const consultasPadrao = {
    "2025-10-21": ["12:13", "14:30"],
    "2025-10-22": ["10:15"],
    "2025-10-24": ["09:00", "10:00", "16:45", "12:21", "12:21", "12:21"],
    "2025-10-25": ["21:00"]
};

function getSegunda(data) {
    let diaSemana = data.getDay();
    if (diaSemana === 0) diaSemana = 7;
    return new Date(data.getFullYear(), data.getMonth(), data.getDate() - (diaSemana - 1));
}

function formatDia(date) {
    return date.toISOString().split("T")[0];
}

export default function Calendario() {
    const hoje = new Date();
    const [inicioSemana, setInicioSemana] = useState(getSegunda(hoje));
    const [modalAberto, setModalAberto] = useState(false);
    const [diaModal, setDiaModal] = useState(formatDia(inicioSemana));
    const [consultas] = useState(consultasPadrao);

    // Gera os 5 dias da semana atual
    const diasDaSemana = Array.from({ length: 5 }, (_, i) => {
        const d = new Date(inicioSemana);
        d.setDate(inicioSemana.getDate() + i);
        return d;
    });

    function abrirModal(diaKey) {
        setDiaModal(diaKey);
        setModalAberto(true);
    }

    function fecharModal() {
        setModalAberto(false);
    }

    function handleSemanaAnterior() {
        const novaData = new Date(inicioSemana);
        novaData.setDate(novaData.getDate() - 7);
        setInicioSemana(getSegunda(novaData));
    }

    function handleSemanaProxima() {
        const novaData = new Date(inicioSemana);
        novaData.setDate(novaData.getDate() + 7);
        setInicioSemana(getSegunda(novaData));
    }

    function handleSelectDia(e) {
        setDiaModal(e.target.value);
    }

    // Renderização dos horários do modal
    function renderHorariosModal() {
        const horarios = consultas[diaModal] || [];
        if (horarios.length === 0) {
            return <p>Nenhum horário registrado</p>;
        }
        return horarios
            .slice()
            .sort((a, b) => a.localeCompare(b))
            .map((h, idx) => (
                <div key={idx} className="horario ocupado-modal">{h}</div>
            ));
    }

    return (
        <div className="container-calendario">
            <h1>Agendamento</h1>
            <div className="semana-nav">
                <button onClick={handleSemanaAnterior} className="button-seta-calendario"><HiChevronLeft className="seta-calendario" /></button>
                <div id="container-dias-horarios-mais">
                    <div className="dias" id="dias-container">
                        {diasDaSemana.map((dia, i) => {
                            const horarios = (consultas[formatDia(dia)] || []).slice(0, 3).sort((a, b) => a.localeCompare(b));
                            return (
                                <div key={i} className="coluna-dia">
                                    <div className="dia">
                                        <strong>{diasSemana[i]}</strong>
                                        <small>
                                            {dia.getDate().toString().padStart(2, "0")}/
                                            {meses[dia.getMonth()]}
                                        </small>
                                    </div>
                                    {horarios.map((h, idx) => (
                                        <div
                                            key={idx}
                                            className="horario ocupado"
                                            data-dia={formatDia(dia)}
                                            data-hora={h}
                                        >
                                            {h}
                                        </div>
                                    ))}
                                    {Array.from({ length: 3 - horarios.length }).map((_, idx) => (
                                        <div key={`empty-${idx}`} className="horario" style={{ visibility: "hidden" }}>--:--</div>
                                    ))}
                                    <div className="footer-dia">
                                        <button
                                            onClick={() => abrirModal(formatDia(dia))}
                                        >
                                            MAIS
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
                <button onClick={handleSemanaProxima} className="button-seta-calendario"><HiChevronRight className="seta-calendario" /></button>
                {/* Modal */}
                {modalAberto && (
                    <div className="modal" style={{ display: "block" }} onClick={e => { if (e.target.className === "modal") fecharModal(); }}>
                        <div className="modal-content">
                            <span
                                className="fechar"
                                style={{ cursor: "pointer" }}
                                onClick={fecharModal}
                            >
                                &times;
                            </span>
                            <select
                                id="modal-select-dia"
                                value={diaModal}
                                onChange={handleSelectDia}
                            >
                                {diasDaSemana.map((dia, i) => (
                                    <option key={i} value={formatDia(dia)}>
                                        {diasSemana[i]} - {dia.getDate().toString().padStart(2, "0")}/{meses[dia.getMonth()]}
                                    </option>
                                ))}
                                
                            </select>
                            <h2 id="modal-dia" style={{ display: "none" }}></h2>
                            <div id="modal-horarios">{renderHorariosModal()}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}