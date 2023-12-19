import React from "react";
import {useState} from "react";

import {userEmailValid, userPassValid} from "../modules/validateForm";
import Token from "../modules/tokens";

const Auth = () => {
    const [token, setToken] = useState(Token() ? localStorage.getItem("token") : null);
    const request = () => {
        fetch("https://pets.сделай.site/api/login", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
            .then(response => response.json()).then(result => {
            console.log(result)
            if ('data' in result) {
                localStorage.setItem("token", result.data.token)
                setToken(result.data.token);
                document.getElementById('success_auth').style.display = 'block'
                document.getElementById('error_auth').style.display = 'none'
            } else {
                document.getElementById('error_auth').style.display = 'block'
                document.getElementById('success_auth').style.display = 'none'
                document.getElementById('InputAccountLogin').value = ''
                document.getElementById('InputAccountPassword').value = ''
            }
        })
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [validations, setValidations] = useState({
        email: false,
        password: false,
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));

        let error = "";
        switch (name) {
            case "email":
                error = userEmailValid(value);
                break;
            case "password":
                error = userPassValid(value);
                break;
        }
        setValidations((prev) => ({...prev, [name]: !error}));
        setErrors((prevErrors) => ({...prevErrors, [name]: error}));
    }

    const handleSubmit = () => {
        const emailError = userEmailValid(formData.email);
        const passwordError = userPassValid(formData.password);

        if (emailError || passwordError) {
            setErrors({email: emailError, password: passwordError});
        } else {
            request()
        }
    };

    return (
        <div className="modal fade" id="ModalAccount" tabIndex="-1" role="dialog"
             aria-labelledby="ModalAccountLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header header_and_footer">
                        <h5 className="modal-title back_color_text larger_text"
                            id="ModalAccountLabel"><b>Вход в личный кабинет</b></h5>
                        <button type="button" className="close" data-bs-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="main_color_text" name="acc">
                            <div className="form-group py-3">
                                <label htmlFor="InputEmail" className="form-label">Логин</label>
                                <input type="email" name="email"
                                       className={`form-control ${validations.email ? "is-valid" : errors.email ? "is-invalid" : ""}`}
                                       id="InputAccountLogin" aria-describedby="AccountlogHelp"
                                       placeholder="Ваш E-mail"
                                       onChange={handleInputChange}
                                       required/>
                                <span className="text-danger">{errors.email}</span>
                                <small id="AccountlogHelp" className="form-text text-muted small"><a href="#">Забыли
                                    логин?</a></small>
                            </div>
                            <div className="form-group py-3">
                                <label htmlFor="InputPass">Пароль</label>
                                <input type="password" name="password"
                                       className={`form-control ${validations.password ? "is-valid" : errors.password ? "is-invalid" : ""}`}
                                       id="InputAccountPassword"
                                       aria-describedby="AccountPassHelp"
                                       onChange={handleInputChange}
                                       required/>
                                <span className="text-danger">{errors.password}</span>
                                <small id="AccountPassHelp" className="form-text text-muted small"><a href="#">Забыли
                                    пароль?</a></small>
                            </div>
                            <div className="form-check py-3">
                                <input type="checkbox" name="learn_me" className="form-check-input"
                                       id="learn_me" required/>
                                <label className="form-check-label small" htmlFor="confirm">Запомнить
                                    меня</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Отмена
                        </button>
                        <button type="button" name="submit" id="account" className="btn btn-primary"
                                onClick={handleSubmit}>Войти
                        </button>
                    </div>
                    <div className="text-center bg-whiter">
                        <p className='text-danger text-center' id='error_auth' style={{display: 'none'}}>Введенные данные неверные(</p>
                        <p className='text-success text-center' id='success_auth' style={{display: token ? "block" : 'none'}}>Вы успешно вошли в аккаунт!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;