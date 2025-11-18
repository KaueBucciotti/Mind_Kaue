import {Link} from "react-router-dom"
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";

export default function Footer() {

  return (
    <>
        <footer>
            <div className="grid-footer">
                <div>
                    <Link to="/sobre-nos"><p>Sobre nós</p></Link>
                    <Link to="/artigos"><p>Artigos</p></Link>
                    <Link to="/termos-e-condicoes"><p>Termos e Acordos</p></Link>
                    <Link to=""><p>Entre para nosso time</p></Link>
                </div>
                <div>
                    <Link 
                        to="/"
                        onClick={(e) => {
                            if (window.location.pathname === "/") {
                                e.preventDefault();
                                document.getElementById('planos')?.scrollIntoView({ 
                                    behavior: 'smooth' 
                                });
                            }
                        }}><p>Planos</p></Link>
                    <Link to="/:tipo(paciente|psicologo)/perfil/:id/configuracoes"><p>Atribuições</p></Link>
                    <Link to="/adicionar-artigos">Canal de denúncia</Link>
                    <p>Contatos:</p>
                    <div className="icon-btns">
                        <button className="icon-btn icon-ui">
                            <HiOutlineMail
                                value="mind@falsoemail.com"
                                type="button"
                                title="copiar email"
                            />
                        </button>
                        <button className="icon-btn icon-ui">
                            <HiOutlinePhone
                                value="(11) 1111-1111"
                                type="button"
                                title="copiar telefone"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">&copy; 2025 All rights reserved - Mind</p>
        </footer>
    </>
  )
}
