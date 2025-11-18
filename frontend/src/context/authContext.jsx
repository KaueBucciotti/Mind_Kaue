import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Verifica se há usuário logado
    useEffect(() => {
        async function loadUser() {
            const token = authService.getToken();
            const username = authService.getUsername();

            if (token && username) {
                try {
                    const userData = await authService.getUserData(username);
                    setUser(userData);
                } catch (err) {
                    console.error("Erro ao carregar usuário:", err);
                    authService.logout();
                }
            }
            setLoading(false);
        }

        loadUser();
    }, []);

    // 🔹 Login
    async function login(username, password) {
        setLoading(true);
        setError("");
        try {
            await authService.login(username, password);
            const userData = await authService.getUserData(username);
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            return { success: true, user: userData };
        } catch (err) {
            const errorMessage = err.message || "Erro ao fazer login";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Cadastro genérico (para paciente, psicólogo e voluntário)
    async function registerUser(userData) {
        setLoading(true);
        setError("");

        try {
            let newUser;

            // Decide qual serviço chamar
            const tipo = userData.tipo || userData.tipoUsuario;

            if (tipo === "paciente") {
                newUser = await authService.registerPaciente(userData);
            } else if (tipo === "psicologo") {
                newUser = await authService.registerPsicologo(userData);
            } else if (tipo === "voluntario") {
                newUser = await authService.registerVoluntario(userData);
            } else {
                throw new Error("Tipo de usuário inválido");
            }


            // Faz login automático após cadastro
            await login(userData.email, userData.senha);

            return { success: true, user: newUser };
        } catch (err) {
            const errorMessage = err.message || "Erro ao cadastrar usuário";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Logout
    function logout() {
        authService.logout();
        setUser(null);
        localStorage.removeItem("user");
    }

    // 🔹 Atualizar usuário no estado e localStorage
    function updateUser(newData) {
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    const value = {
        user,
        loading,
        error,
        login,
        registerUser, // ✅ função genérica usada pelo InputCadastro
        logout,
        updateUser,
        isAuthenticated: !!user,
        isPaciente: user?.tipo === "paciente",
        isPsicologo: user?.tipo === "psicologo",
        isVoluntario: user?.tipo === "voluntario",
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
}
