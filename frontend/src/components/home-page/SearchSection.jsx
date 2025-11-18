import { HiOutlineSearch } from "react-icons/hi";

import Filtro from "./Filtro.jsx";
import Visualizacao from "./Visualizacao.jsx";

export default function SearchSection({
    selectedSpecialities, setSelectedSpecialities, // para filtro de especialidades
    selectedLocals, setSelectedLocals, locais,     // para filtro de localidades
    selectedRatings, setSelectedRatings,           // para filtro de notas
    selectedDays, setSelectedDays,                 // para filtro de dias da semana
    visualizacao, setVisualizacao                  // para visualizacao da posicao dos cards
}) {
    
    const specialities = [
        "Ansiedade",
        "Casais",
        "Conflitos Familiares",
        "Insônia",
        "Dependência Química",
        "Burnout",
    ];
    const ratings = [
        "5.0 ★",
        "4.9 – 4.0 ★",
        "3.9 – 3.0 ★",
        "2.9 – 2.0 ★",
        "1.9 – 1.0 ★",
    ];
    const diasSemana = [
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
        "Domingo",
    ];

    return (
        <>
            <section className="section-filters-searchbox">
                <div className="search-boxes">
                    <input type="text" required id="search-input" placeholder="Pesquisar" />
                    <HiOutlineSearch className="icon-ui button-search" />
                </div>
                <div className="search-filters">
                    <Filtro
                        titulo="Especialidades"
                        opcoes={specialities}
                        selecionados={selectedSpecialities}
                        setSelecionados={setSelectedSpecialities}
                    />
                    <Filtro
                        titulo="Locais"
                        opcoes={locais}
                        selecionados={selectedLocals}
                        setSelecionados={setSelectedLocals}
                    />
                    <Filtro
                        titulo="Avaliação"
                        opcoes={ratings}
                        selecionados={selectedRatings}
                        setSelecionados={setSelectedRatings}
                    />
                    <Filtro
                        titulo="Semana"
                        opcoes={diasSemana}
                        selecionados={selectedDays}
                        setSelecionados={setSelectedDays}
                    />
                </div>
                <div className="search-visualizacao">
                     <Visualizacao
                        visualizacao={visualizacao}
                        setVisualizacao={setVisualizacao}
                    />
                </div>
            </section>
        </>
    )
}
