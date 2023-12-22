import React from "react";
import {Link} from 'react-router-dom';

import logo from '../img/LOGO.svg';
import Register from "./register";
import Auth from "./authorization";

const Header = () => {
    return (
        <header className="header_and_footer">
            <nav className="navbar navbar-expand-lg navbar-light bg-">
                <div className="container-fluid main_color_text">
                    <Link className="navbar-brand" to={'/'}>
                        <img src={logo} alt="logo" className="w-25 rounded-3"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="#navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse larger_text" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link main_color_text" aria-current="page"
                                      to={'/'}>Главная</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle main_color_text" href="#"
                                   id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">Поисковая работа</a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item main_color_text" to={"/searchPet"}>Поиск по
                                        объявлениям</Link></li>
                                    <li><Link className="dropdown-item main_color_text" to={"/addPet"}>Добавить
                                        объявление</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link back_color_text" aria-current="page"
                                      to={'/userProfile'}>Личный кабинет</Link>
                            </li>
                        </ul>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal"
                                    data-bs-target="#ModalRegistration">Регистрация
                            </button>
                            <button type="button" className="btn btn-primary me-md-2" data-bs-toggle="modal"
                                    data-bs-target="#ModalAccount">Вход
                            </button>
                        </div>
                        <Register/>
                        <Auth/>
                    </div>
                </div>
            </nav>
        </header>
    );
}


export default Header;