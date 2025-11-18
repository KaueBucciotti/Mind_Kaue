const API_URL = "http://localhost:8080";

export const authService = {
    // 🔹 Login com JWT
    async login(username, password) {
        const res = await fetch(`${API_URL}/api/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            throw new Error("Login ou senha inválidos");
        }

        const data = await res.json();

        // Salvar token e username no localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        return data;
    },

    // 🔹 Buscar dados completos (paciente, psicólogo ou voluntário)
    async getUserData(username) {
        const token = this.getToken();

        const fetchWithAuth = async (endpoint) => {
            const res = await fetch(`${API_URL}/${endpoint}/login/${username}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) return res.json();
            return null;
        };

        // Tentar nas 3 entidades conhecidas
        const paciente = await fetchWithAuth("pacientes");
        if (paciente) return { ...paciente, tipo: "paciente" };

        const psicologo = await fetchWithAuth("psicologos");
        if (psicologo) return { ...psicologo, tipo: "psicologo" };

        const voluntario = await fetchWithAuth("voluntarios");
        if (voluntario) return { ...voluntario, tipo: "voluntario" };

        throw new Error("Usuário não encontrado");
    },

    // 🔹 Cadastrar paciente
    async registerPaciente(userData) {
        const res = await fetch(`${API_URL}/pacientes/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });


        if (!res.ok) throw new Error("Erro ao cadastrar paciente");
        return res.json();
    },

    // 🔹 Cadastrar psicólogo
    async registerPsicologo(userData) {
        const res = await fetch(`${API_URL}/psicologos/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) throw new Error("Erro ao cadastrar psicólogo");
        return res.json();
    },

    // 🔹 Cadastrar voluntário ✅ (novo)
    async registerVoluntario(userData) {
        const res = await fetch(`${API_URL}/voluntarios/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) throw new Error("Erro ao cadastrar voluntário");
        return res.json();
    },

    // 🔹 Logout
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("user");
    },

    // 🔹 Verificar se está autenticado
    isAuthenticated() {
        return !!this.getToken();
    },

    // 🔹 Obter token e username
    getToken() {
        return localStorage.getItem("token");
    },

    getUsername() {
        return localStorage.getItem("username");
    },

    // 🔹 Requisição autenticada
    async authenticatedFetch(url, options = {}) {
        const token = this.getToken();

        if (!token) {
            throw new Error("Não autenticado");
        }

        const headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const res = await fetch(url, { ...options, headers });

        if (res.status === 401) {
            this.logout();
            throw new Error("Sessão expirada. Faça login novamente.");
        }

        return res;
    },
};