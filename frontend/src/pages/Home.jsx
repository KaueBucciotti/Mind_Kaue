import SearchSection from "../components/home-page/SearchSection";
import AreaCards from "../components/home-page/AreaCards";
import VerPsi from "../components/pop-ups/Verpsi";
import { useState } from "react";
import { usePsicologos } from "../context/psicologos";
import '../assets/styles/home/filtros-home.css';
import '../assets/styles/home/card-psicologo.css';

export default function Home() {
  // Filtros
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [selectedLocals, setSelectedLocals] = useState([]);
  const [visualizacao, setVisualizacao] = useState("col");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  // Cards
  const [openPsi, setOpenPsi] = useState(false);
  const [selectedPerfil, setSelectedPerfil] = useState(null);

  const { psicologos, loading } = usePsicologos();

  const perfis = (psicologos || []).map(p => ({
      id: p.id,
      nome: p.nome,
      sobrenome: p.sobrenome, // Adicionado
      idade: p.idade, // Deve ser calculado no backend ou frontend
      local: p.endereco, // Usando 'endereco' do backend como 'local'
      tags: p.especialidade ? [p.especialidade] : [], // Usando 'especialidade' como tag
      foto: p.imgPerfil || null, // Usando 'imgPerfil' do backend como 'foto'
      horarios: p.horarios || {} // Manter se for usado para agendamento

  }));

  const locais = [...new Set(perfis.map(perfil => perfil.local))];

  const perfisFiltrados = perfis.filter(perfil => {
      const matchEspecialidade = selectedSpecialities.length === 0
          || perfil.tags.some(tag => selectedSpecialities.includes(tag));
      const matchLocal = selectedLocals.length === 0
          || selectedLocals.includes(perfil.local);
      return matchEspecialidade && matchLocal;
  });

  if (loading) {
    return <div>Carregando psicólogos...</div>;
  }

  return (
    <>
      <SearchSection 
        selectedSpecialities={selectedSpecialities}
        setSelectedSpecialities={setSelectedSpecialities}
        selectedLocals={selectedLocals}
        setSelectedLocals={setSelectedLocals}
        locais={locais}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        visualizacao={visualizacao}
        setVisualizacao={setVisualizacao}
      />
      <AreaCards
        perfis={perfisFiltrados} 
        setSelectedPerfil={setSelectedPerfil} 
        setOpenPsi={setOpenPsi}
        visualizacao={visualizacao}
      />
      {openPsi && selectedPerfil && (
          <VerPsi
              open={openPsi}
              close={() => setOpenPsi(false)}
              perfil={selectedPerfil}
          />
      )}
    </>
  );
}
