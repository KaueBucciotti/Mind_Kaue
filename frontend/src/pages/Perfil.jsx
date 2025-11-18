import { useAuth } from "../context/authContext";
import { useParams, Navigate } from "react-router-dom";

// importa as sections específicas
import SectionPsicologo from "../components/perfil-page/sectionPsicologo";
import SectionPaciente from "../components/perfil-page/sectionPaciente";

export default function Perfil() {
  const { user, loading } = useAuth();
  const { id, tipo } = useParams();

  if (loading) {
    return <div>Carregando...</div>;
  }

  // 🔹 se não estiver logado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 se a URL não corresponder ao usuário logado
  if (String(user.id) !== String(id) || user.tipo.toLowerCase() !== tipo.toLowerCase()) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Acesso Negado</h2>
        <p>Você só pode acessar seu próprio perfil.</p>
        <a href={`/${user.tipo}/perfil/${user.id}`}>
          Ir para meu perfil
        </a>
      </div>
    );
  }

  // 🔹 se for psicólogo, mostra o layout específico
  if (user.tipo.toLowerCase() === "psicologo") {
    return <SectionPsicologo />;
  }

  // 🔹 se for paciente, mostra o layout específico
  if (user.tipo.toLowerCase() === "paciente") {
    return <SectionPaciente />;
  }

  // fallback caso tipo seja inesperado
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Tipo de usuário desconhecido</h2>
      <p>Entre em contato com o suporte.</p>
    </div>
  );
}
