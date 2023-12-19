import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {RegisterRequest} from "../modules/requests";
import {userNameValid, userPhoneValid, userEmailValid, userPassValid, userPassConfigValid, configValid} from "../modules/validateForm";

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        confirm: false,
    });

    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        confirm: "",
    });

    const [validations, setValidations] = useState({
        name: false,
        phone: false,
        email: false,
        password: false,
        password_confirmation: false,
        confirm: false,
    });

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        const inputValue = type === "checkbox" ? checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));

        let error = "";
        switch (name) {
            case "name":
                error = userNameValid(inputValue);
                break;
            case "phone":
                error = userPhoneValid(inputValue);
                break;
            case "email":
                error = userEmailValid(inputValue);
                break;
            case "password":
                error = userPassValid(inputValue);
                break;
            case "password_confirmation":
                error = userPassConfigValid(inputValue, formData.password);
                break;
            case "confirm":
                error = configValid(inputValue);
                break;
        }
        setValidations((prev) => ({...prev, [name]: !error}));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    }

    const handleSubmit = () => {
        const nameError = userNameValid(formData.name);
        const phoneError = userPhoneValid(formData.phone);
        const emailError = userEmailValid(formData.email);
        const passwordError = userPassValid(formData.password);
        const passwordConfirmationError = userPassConfigValid(formData.password_confirmation, formData.password);
        const confirmError = configValid(formData.confirm);

        if (
            nameError ||
            phoneError ||
            emailError ||
            passwordError ||
            passwordConfirmationError ||
            confirmError
        ) {
            setErrors({
                name: nameError,
                phone: phoneError,
                email: emailError,
                password: passwordError,
                password_confirmation: passwordConfirmationError,
                confirm: confirmError,
            });
        } else {
            RegisterRequest(new FormData(document.getElementById("register")), (status) => {
                if (status === 204) {
                    document.getElementById("success_register").style.display = "block";
                    document.getElementById("fail_register").style.display = "none";
                    navigate('/login')
                } else {
                    document.getElementById("fail_register").style.display = "block";
                    document.getElementById("success_register").style.display = "none";
                }
            });
        }
    };

    return (
        <div className="modal fade" id="ModalRegistration" tabIndex="-1" role="dialog"
             aria-labelledby="ModalRegistrationLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header header_and_footer">
                        <h5 className="modal-title back_color_text larger_text"
                            id="ModalRegistrationLabel"><b>Регистрация</b></h5>
                        <button type="button" className="close" data-bs-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="main_color_text" name="reg" id="register">
                            <div className="form-group py-3">
                                <label htmlFor="InputName" className="form-label">Имя</label>
                                <input type="text" name="name" className={`form-control ${validations.name ? "is-valid" : errors.name ? "is-invalid" : ""}`}
                                       id="userName" aria-describedby="nameHelp"
                                       placeholder="ваше имя"
                                       onChange={handleInputChange}
                                       required/>
                                <small className="form-text text-muted small">{errors.name}</small>
                            </div>
                            <div className="form-group py-3">
                                <label htmlFor="InputPhone">Моб. телефон</label>
                                <input type="tel" name="phone" className={`form-control ${validations.phone ? "is-valid" : errors.phone ? "is-invalid" : ""}`}
                                       id="InputPhone" aria-describedby="phoneHelp"
                                       placeholder="+79999999999"
                                       onChange={handleInputChange}
                                       required/>
                                <small className="form-text text-muted small">{errors.phone}</small>
                            </div>
                            <div className="form-group py-3">
                                <label htmlFor="InputEmail">E-mail</label>
                                <input type="email" name="email" className={`form-control ${validations.email ? "is-valid" : errors.email ? "is-invalid" : ""}`}
                                       id="InputEmail" aria-describedby="emailHelp"
                                       placeholder="user@user.ru"
                                       onChange={handleInputChange}
                                       required/>
                                <small className="form-text text-muted small">{errors.email}</small>
                            </div>
                            <div className="form-group py-3">
                                <label htmlFor="InputPassword">Пароль</label>
                                <input type="password" name="password" className={`form-control ${validations.password ? "is-valid" : errors.password ? "is-invalid" : ""}`}
                                       id="InputPassword" aria-describedby="PassHelp"
                                       onChange={handleInputChange}
                                       required/>
                                <small className="form-text text-muted small">{errors.password}</small>
                                    <p>Пароль должен содержать:</p>
                                    <p>- цифры (0-9)</p>
                                    <p>- строчные буквы (a-z)</p>
                                    <p>- заглавные буквы (A-Z)</p>
                            </div>
                            <div className="form-group py-3">
                                <label htmlFor="InputPasswordConfig">Подтверждение пароля</label>
                                <input type="password" name="password_confirmation"
                                       className={`form-control ${validations.password_confirmation ? "is-valid" : errors.password_confirmation ? "is-invalid" : ""}`}
                                       id="InputPasswordConfig"
                                       aria-describedby="passConfigHelp"
                                       onChange={handleInputChange}
                                       required/>
                                <small className="form-text text-muted small">{errors.password_confirmation}</small>
                            </div>
                            <div className="form-check py-3">
                                <input type="checkbox" name="confirm" className={`form-check-input ${validations.confirm ? "is-valid" : ""}`}
                                       id="config"
                                       onChange={handleInputChange}
                                       required/>
                                <label className="form-check-label small"
                                       htmlFor="confirm">Принять <a
                                    href="https://10.rkn.gov.ru/docs/10/Pravila_obrabotki_PD.pdf">согласие
                                    на обработку персональных данных</a></label>
                                <small className="form-text text-muted small">{errors.confirm}</small>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Отмена
                        </button>
                        <button type="button" name="submit" id="registration"
                                className="btn btn-primary" onClick={handleSubmit}>Создать аккаунт
                        </button>
                    </div>
                    <div className="text-center bg-whiter">
                        <p className='text-center text-success' id='success_register' style={{ display: "none" }}>Вы успешно зарегистрированы!</p>
                        <p className='text-center text-danger' id='fail_register' style={{ display: "none" }}>Ошибка регистрации(</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;