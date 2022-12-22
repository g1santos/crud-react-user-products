import './Nav.css'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em casa! */}
            <a href="/">
                <i className="fa fa-home"></i> Inicio
            </a>
            <a href="/users">
                <i className="fa fa-users"></i> Usuários
            </a>
            <a href="/products">
                <i className="fa fa-product-hunt"></i> Produtos
            </a>
        </nav>
    </aside>