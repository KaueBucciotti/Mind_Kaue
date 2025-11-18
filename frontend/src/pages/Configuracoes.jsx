import "../assets/styles/configuracoes/configuracoes.css"

import InfosGerais from "../components/configuracoes/InfosGerais"
import AtualizacaoCredenciais from "../components/configuracoes/AtualizacaoCredenciais"
import InfosPerfil from "../components/configuracoes/InfosPerfil"
import Deletar from "../components/pop-ups/Deletar"
import PhotoDefault from "../assets/img/perfil-default.png"
import Horarios from "../components/configuracoes/Horarios";
import { toast } from 'react-toastify';

import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext";
import { atualizar, deletar } from "../services/pacienteService";
import { atualizar as atualizarPsicologo, deletar as deletarPsicologo } from "../services/psicologoService";

export default function Configuracoes() {
    const navigate = useNavigate();
    const { user, loading, updateUser, logout } = useAuth();
    const [imgPerfil, setImgPerfil] = useState(PhotoDefault);
    const [isOpen, setIsOpen] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [deletando, setDeletando] = useState(false);
    const { tipo, id } = useParams();

    useEffect(() => {
        if (user?.imgPerfil) {
            setImgPerfil(user.imgPerfil);
        }
    }, [user]);

    const chooseImgPerfil = (img) => {
        const file = img.target.files[0];
        const formData = new FormData();

        const imageUrl = URL.createObjectURL(file);
        setImgPerfil(imageUrl);

        formData.append('imagem', file);
        console.log(imageUrl);
    }

    const handleAtualizarPerfil = async (e) => {
        e.preventDefault();
        setSalvando(true);

        try {
            // Capturar dados dos inputs
            const dadosAtualizados = {
                // Informações Gerais
                nome: document.getElementById('nomeEdit')?.value || user.nome,
                sobrenome: document.getElementById('sobrenomeEdit')?.value || user.sobrenome,
                dtNascimento: document.getElementById('nascimentoEdit')?.value || user.dtNascimento,
                telefone: document.getElementById('telefoneEdit')?.value || user.telefone,
                endereco: document.getElementById('localEdit')?.value || user.endereco,
                genero: document.getElementById('generoEdit')?.value || user.genero,
                
                // Credenciais
                login: document.getElementById('loginEdit')?.value || user.login,
                email: document.getElementById('emailEdit')?.value || user.email,
                
                // Perfil
                sobreMim: document.getElementById('sobreMimEdit')?.value || user.sobreMim,
                medicamentos: document.getElementById('medicamentosEdit')?.value || user.medicamentos,
                preferencias: document.getElementById('preferenciasEdit')?.value || user.preferencias,
            };

            // Só adicionar senha se foi preenchida
            const novaSenha = document.getElementById('senhaEdit')?.value;
            if (novaSenha && novaSenha.trim() !== '') {
                dadosAtualizados.senha = novaSenha;
            }

            // Escolher a função de atualização correta baseada no tipo
            let usuarioAtualizado;
            if (user.tipo === 'psicologo') {
                usuarioAtualizado = await atualizarPsicologo(user.id, dadosAtualizados);
            } else {
                usuarioAtualizado = await atualizar(user.id, dadosAtualizados);
            }
            
            // Atualizar contexto local
            if (updateUser) {
                updateUser({ ...usuarioAtualizado, tipo: user.tipo });
            }

            toast.success('Configurações atualizadas com sucesso!');
            
            // Limpar campo de senha
            const senhaInput = document.getElementById('senhaEdit');
            if (senhaInput) senhaInput.value = '';

        } catch (error) {
            console.error('Erro ao atualizar:', error);
            toast.error(error.message || 'Erro ao atualizar configurações');
        } finally {
            setSalvando(false);
        }
    };

    const handleDeletarConta = async () => {
        setDeletando(true);

        try {
            // Escolher a função de deletar correta baseada no tipo
            if (user.tipo === 'psicologo') {
                await deletarPsicologo(user.id);
            } else {
                await deletar(user.id);
            }

            toast.success('Conta deletada com sucesso!');
            
            // Fazer logout e redirecionar
            if (logout) {
                logout();
            }
            
            // Aguardar um pouco para o usuário ver a mensagem
            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (error) {
            console.error('Erro ao deletar conta:', error);
            toast.error(error.message || 'Erro ao deletar conta');
            setDeletando(false);
            setIsOpen(false);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.id !== id || user.tipo !== tipo) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Acesso Negado</h2>
                <p>Você só pode editar suas próprias configurações.</p>
                <a href={`/${user.tipo}/perfil/${user.id}/configuracoes`}>
                    Ir para minhas configurações
                </a>
            </div>
        );
    }

    return (
    <>
        <section className="config">
            <div className="container-section">
                <div className="container-img">
                    <div className="img-options">
                        <img id="imagePreview" src={imgPerfil} alt="" className="imgEdit"/>
                        <div>
                            <input 
                                id="file-image" 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => chooseImgPerfil(e)}
                                required/>
                            <label className="btns button-confirm" htmlFor="file-image">Mudar Foto</label>
                        </div>
                    </div>
                    <div className="atalhos">
                        <a href="#formAtualizar" id="Geral">Geral</a>
                        <a href="#container-perfil" id="Perfil">Perfil</a>
                        {user?.tipo === "psicologo" && (
                            <a href="#container-horario-atendimento" id="Horarios">Horarios de atendimentos</a>
                        )}
                        <a href="#deletar-conta" id="Deletar">Deletar conta</a>
                    </div>
                </div>

                <div className="container-inputs container-perfil" id="formAtualizar">
                    <h1>Geral</h1>

                    <div>
                        <InfosGerais user={user} />
                        <AtualizacaoCredenciais user={user} />
                        <InfosPerfil user={user} />
                        
                        {user?.tipo === "psicologo" && (
                            <Horarios />
                        )}

                        <div className="container-atualizar">
                            <button 
                                id="btnAtualizarPerfil" 
                                className="button-confirm"
                                onClick={handleAtualizarPerfil}
                                disabled={salvando}
                                style={{ 
                                    opacity: salvando ? 0.6 : 1,
                                    cursor: salvando ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {salvando ? 'Salvando...' : 'Atualizar perfil'}
                            </button>
                        </div> 
                    </div>

                </div>
            </div>

            <div className="container-deletar" id="deletar-conta">
                <span>Uma vez deletada sua conta, não será possível recupera-la. Tenha certeza!</span>
                <button 
                    className="btn-deletar button-attention" 
                    id="btn-abrir-pop-up"
                    onClick={() => setIsOpen(true)}
                    disabled={deletando}
                >
                    Deletar conta
                </button>
            </div>

            <Deletar 
                open={isOpen} 
                close={() => setIsOpen(false)}
                onConfirm={handleDeletarConta}
                loading={deletando}
            />
        </section>
    </>
  )
}