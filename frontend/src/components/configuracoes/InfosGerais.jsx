export default function InfosGerais({ user }) {
  return (
    <>
        <div className="container-input-1">
            <div className="input-e-span">
                <span className="login-titulo">
                    <label htmlFor="nomeEdit">Nome</label>
                </span>
                <input 
                    id="nomeEdit" 
                    type="text" 
                    className="form-control" 
                    placeholder="Nome"
                    defaultValue={user?.nome || ""}
                />    
            </div>
            
            <div className="input-e-span">
                <span className="login-titulo">
                    <label>Sobrenome</label>
                </span>
                <input 
                    id="sobrenomeEdit" 
                    type="text" 
                    className="form-control" 
                    placeholder="Sobrenome"
                    defaultValue={user?.sobrenome || ""}
                />    
            </div>
            
            <div className="input-e-span">
                <span className="login-titulo">
                    <label>Data de nascimento</label>
                </span>
                <input 
                    id="nascimentoEdit" 
                    type="date" 
                    className="form-control" 
                    placeholder="Data de nascimento"
                    defaultValue={user?.dtNascimento || ""}
                />    
            </div>

            <div className="input-e-span">
                <span className="login-titulo">
                    <label>Telefone</label>
                </span>
                <input 
                    id="telefoneEdit" 
                    type="text" 
                    className="form-control" 
                    placeholder="Telefone"
                    defaultValue={user?.telefone || ""}
                />    
            </div>
            
            <div className="input-e-span">
                <span className="login-titulo">
                    <label>Local</label>
                </span>
                <select 
                    id="localEdit" 
                    className="form-control"
                    defaultValue={user?.endereco || ""}
                >
                    <option value="" disabled hidden>Escolha a Cidade</option>
                    <option value="São Paulo">São Paulo</option>
                    <option value="Diadema">Diadema</option>
                    <option value="São Bernardo">São Bernardo</option>
                    <option value="Santo André">Santo André</option>
                    <option value="Santo Amaro">Santo Amaro</option>
                    <option value="Jabaquara">Jabaquara</option>
                    <option value="Osasco">Osasco</option>
                    <option value="Guarulhos">Guarulhos</option>
                </select>
            </div>
            
            <div className="input-e-span">
                <span className="login-titulo">
                    <label>Sexo</label>
                </span>
                <select 
                    id="generoEdit" 
                    className="form-control"
                    defaultValue={user?.genero || ""}
                >
                    <option value="" disabled hidden>Escolha o gênero</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
        </div>
    </>
  )
}