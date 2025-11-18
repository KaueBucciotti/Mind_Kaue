import React, { createContext, useContext, useState, useEffect } from 'react';
import { buscarTodosPublico } from '../services/psicologoService';

// Contexto temporário com dados de psicólogos para desenvolvimento
const PsicologosContext = createContext(null);

const consultasPadrao = {
  "2025-10-21": ["12:13", "14:30"],
  "2025-10-22": ["10:15"],
  "2025-10-24": ["09:00", "10:00", "16:45"],
  "2025-10-25": ["21:00"]
};

const psicologosInit = []; // Inicializa vazio, os dados virão da API
// Removendo os dados mockados, pois agora buscamos da API.
// Se a API falhar, a lista ficará vazia.
// Se quiser manter os dados mockados como fallback, mantenha-os aqui.

export function PsicologosProvider({ children }) {
  const [psicologos, setPsicologos] = useState(psicologosInit);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPsicologos = async () => {
      try {
        const data = await buscarTodosPublico();
        setPsicologos(data);
      } catch (error) {
        console.error("Erro ao carregar psicólogos da API:", error);
        // Opcional: manter os dados mockados em caso de falha da API
        // setPsicologos(psicologosInit); 
      } finally {
        setLoading(false);
      }
    };

    fetchPsicologos();
  }, []);

  function getById(id) {
    return psicologos.find(p => p.id === id) || null;
  }

  function getByName(nome) {
    return psicologos.find(p => p.nome === nome) || null;
  }

  return (
    <PsicologosContext.Provider value={{ psicologos, getById, getByName, loading }}>
      {children}
    </PsicologosContext.Provider>
  );
}

export function usePsicologos() {
  const ctx = useContext(PsicologosContext);
  if (!ctx) throw new Error('usePsicologos must be used within PsicologosProvider');
  return ctx;
}
