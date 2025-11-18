import '../../assets/styles/navbar-footer.css'
import logotipo from "../../assets/img/logotipo.svg"

import NavDesktop from './NavbarDesktop'
import NavMobile from './NavbarMobile'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [resize, setResize] = useState(true);

    useEffect(() => {
        const checkMedia = () => {
           setResize(window.matchMedia("(min-width: 800px)").matches)
        }
        checkMedia()
        window.addEventListener('resize', checkMedia);

    }, [])

    return (
        <>
            <header id="masterNav">
                <NavLink to="/">
                    <img className="logotipo" src={logotipo} alt="logotipo da plataforma Mind" />
                </NavLink>
                {resize ? <NavDesktop /> : <NavMobile />}
            </header>
        </>
    )
}