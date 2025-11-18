export default function AtualizacaoCredenciais({ user }) {
  return (
    <>
        <div className="container-input-2">
            <div className="input-e-span">
                <span className="login-titulo"><label>Nome do login</label></span>
                <input 
                    id="loginEdit" 
                    type="text" 
                    className="form-control" 
                    placeholder="Login"
                    defaultValue={user?.login || ""}
                />
            </div>
            <div className="input-e-span">
                <span className="login-titulo"><label>E-mail</label></span>
                <input 
                    id="emailEdit" 
                    type="email" 
                    className="form-control" 
                    placeholder="E-mail"
                    defaultValue={user?.email || ""}
                />
            </div>
            <div className="input-e-span">
                <span className="login-titulo"><label>Nova Senha (deixe em branco para manter)</label></span>
                <input 
                    id="senhaEdit" 
                    type="password" 
                    className="form-control" 
                    placeholder="Nova senha"
                />    
            </div>
        </div>
    </>
  )
}