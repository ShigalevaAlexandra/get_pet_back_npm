import React from "react";
import {useState, useEffect} from "react";

import {ProfileRequest, RegisterRequest} from "../modules/requests";
import {userNameValid, userPhoneValid, userEmailValid, userPassValid, configValid, userPassConfigValid, petPhotoValid, valueValid} from "../modules/validateForm";

const AddPetForm = () => {
    const [profile, setProfile] = useState({ data: { user: [{ email: "", phone: "", name: "" }] } });

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        confirm: false,
        photos1: "",
        kind: "",
        district: "",
        mark: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        confirm: "",
        photos1: "",
        kind: "",
        district: "",
        mark: "",
        description: ""
    });

    const [validations, setValidations] = useState({
        name: false,
        phone: false,
        email: false,
        password: false,
        password_confirmation: false,
        confirm: false,
        photos1: false,
        kind: false,
        district: false,
        mark: false,
        description: false
    });

    const handlerInput = (e) => {
        const { name, value, type, checked, files } = e.target;
        const inputValue = type === "checkbox" ? checked : type === 'file' ? files : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));

        let error = "";
        switch (name) {
            case "name": error = userNameValid(inputValue); break;
            case "phone": error = userPhoneValid(inputValue); break;
            case "email": error = userEmailValid(inputValue); break;
            case "password": error = userPassValid(inputValue); break;
            case "password_confirmation": error = userPassConfigValid(inputValue, formData.password); break;
            case "confirm": error = configValid(inputValue); break;
            case "photos1": error = petPhotoValid(inputValue); break;
            case "kind": error = valueValid('Вид', inputValue); break;
            case "district": error = valueValid('Район', inputValue); break;
            case "mark": error = valueValid('Клеймо', inputValue); break;
            case "description": error = valueValid('Описание', inputValue); break;
        }
        setValidations((prev) => ({ ...prev, [name]: !error }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    }

    useEffect(() => {
        ProfileRequest(profile, setProfile)
    }, []);

    const request = (data) => {
        fetch("https://pets.сделай.site/api/pets", { method: "POST", body: data })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.data.status === 'OK') {
                    document.getElementById('success_add').style.display = 'block';
                    document.getElementById('fail_add').style.display = 'none';
                }
                else {
                    document.getElementById('success_add').style.display = 'none';
                    document.getElementById('fail_add').style.display = 'block';
                }
            })
            .catch(error => console.log('error', error));
    }

    const handlerSubmit = () => {
        document.getElementById("fail").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("fail_add").style.display = "none";
        document.getElementById("success_add").style.display = "none";

        const nameError = userNameValid(formData.name);
        const phoneError = userPhoneValid(formData.phone);
        const emailError = userEmailValid(formData.email);
        const passwordError = document.getElementById('register').hasAttribute('open') ? userPassValid(formData.password) : "";
        const passwordConfirmationError = document.getElementById('register').hasAttribute('open') ? userPassConfigValid(formData.password_confirmation, formData.password) : "";
        const confirmError = configValid(formData.confirm);
        const photos1Error = petPhotoValid(formData.photos1)
        const kindError = valueValid('Вид', formData.kind)
        const districtError = valueValid('Район', formData.district)
        const markError = valueValid('Клеймо', formData.mark)
        const descriptionError = valueValid('Описание', formData.description)

        if (
            nameError ||
            phoneError ||
            emailError ||
            passwordError ||
            passwordConfirmationError ||
            confirmError || photos1Error || kindError || districtError || markError || descriptionError

        ) {
            setErrors({
                name: nameError,
                phone: phoneError,
                email: emailError,
                password: passwordError,
                password_confirmation: passwordConfirmationError,
                confirm: confirmError,
                photos1: photos1Error,
                kind: kindError,
                district: districtError,
                mark: markError,
                description: descriptionError
            });
        } else {
            const data = new FormData(document.getElementById("addPetForm"))
            if (!document.getElementById('register').hasAttribute('open')) {
                data.delete('password')
                data.delete('password_confirmation')
            }
            else { // Попробовать зарегаться
                RegisterRequest(data);
            }
            request(data)
        }
    };

    return (
        <main>
            <div className="mx-5 px-5 py-5 search my-5">
                <h5 className="py-4 back_color_text">Добавить объявление ->></h5>
                <form name="addPets" id="addPetForm">
                    <div className="form-group py-3">
                        <label htmlFor="InputNameForAdd" className="form-label main_color_text">Имя пользователя</label>
                        <input type="text" className={`form-control sear_text ${validations.name ? "is-valid" : errors.name ? "is-invalid" : ""}`}
                               onChange={handlerInput} id="userName" name="name"
                               defaultValue={profile.name} aria-describedby="InputNameForAddHelp" placeholder="Ваше имя"
                               required />
                        <small className="text-danger">{errors.name}</small>
                    </div>
                    <div className="form-group py-3">
                        <label htmlFor="InputPhoneForAdd" className="main_color_text">Моб. телефон</label>
                        <input type="tel" className={`form-control sear_text ${validations.phone ? "is-valid" : errors.phone ? "is-invalid" : ""}`}
                               onChange={handlerInput} id="userPhone" name='phone'
                               defaultValue={profile.phone} aria-describedby="InputNameForAddHelp" placeholder="+79999999999"
                               required />
                        <small className="text-danger">{errors.phone}</small>
                    </div>
                    <div className="form-group py-3">
                        <label htmlFor="InputEmailForAdd" className="form-label main_color_text">E-mail</label>
                        <input  type="email" className={`form-control sear_text ${validations.email ? "is-valid" : errors.email ? "is-invalid" : ""}`}
                               onChange={handlerInput} id="email" name="email"
                                defaultValue={profile.email} aria-describedby="InputEmailForAddHelp" placeholder="Ваш E-mail"
                                required />
                        <small className="text-danger">{errors.email}</small>
                    </div>
                    <details id='register' className="my-5">
                        <h2 className="text-center py-4 back_color_text">Регистрация</h2>
                        <div className="row mb-3">
                            <label htmlFor="password" className="col-form-label main_color_text">Пароль</label>
                            <div className="col-sm-10 w-100">
                                <input type="password" className={`form-control m-auto ${validations.password ? "is-valid" : errors.password ? "is-invalid" : ""}`}
                                       onChange={handlerInput} id="password" name="password" />
                                <small className="text-danger">{errors.password}</small>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="password_confirmation" className="col-form-label main_color_text">Подтвердите пароль</label>
                            <div className="col-sm-10 w-100">
                                <input type="password" className={`form-control m-auto ${validations.password_confirmation ? "is-valid" : errors.password_confirmation ? "is-invalid" : ""}`}
                                       onChange={handlerInput} id="password_confirmation" name="password_confirmation" />
                                <small className="text-danger">{errors.password_confirmation}</small>
                            </div>
                        </div>
                        <summary className="btn btn-primary" style={{ "listStyleType": "none" }}>Регистрация</summary>
                    </details>
                    <div className="row mb-3">
                        <label htmlFor="photo1" className="col-form-label main_color_text">Фото №1</label>
                        <div className="col-sm-10 py-3">
                            <input className={`form-control sear_text ${validations.photos1 ? "is-valid" : errors.photos1 ? "is-invalid" : ""}`}
                                   onChange={handlerInput} id="photos1" type="file" accept="image/*" name="photos1" required />
                            <small className="text-danger">{errors.photos1}</small>
                        </div>
                        <label htmlFor="photo2" className="col-form-label main_color_text">Фото №2</label>
                        <div className="col-sm-10 py-3">
                            <input className="form-control sear_text" id="photo2" type="file" accept="image/*" name="photos2" />
                        </div>
                        <label htmlFor="photo3" className="col-form-label main_color_text">Фото №3</label>
                        <div className="col-sm-10 py-3">
                            <input className="form-control sear_text" id="photo3" type="file" accept="image/*" />
                        </div>
                    </div>
                    <div className="form-group py-3">
                        <label htmlFor="kindPet" className="col-form-label main_color_text">Вид</label>
                        <div className="col-sm-10 py-3">
                            <input className={`form-control sear_text ${validations.kind ? "is-valid" : errors.kind ? "is-invalid" : ""}`}
                                   onChange={handlerInput} id="kindPet" name="kind" />
                            <small className="text-danger">{errors.kind}</small>
                        </div>
                    </div>
                    <div className="form-group py-3">
                        <label htmlFor="districtPet" className="col-form-label main_color_text">Район</label>
                        <div className="col-sm-10 py-3">
                            <input className={`form-control sear_text ${validations.district ? "is-valid" : errors.district ? "is-invalid" : ""}`}
                                   onChange={handlerInput} id="districtPet" name="district" />
                            <small className="text-danger">{errors.district}</small>
                        </div>
                    </div>
                    <div className="form-group py-3">
                        <label htmlFor="markPet" className="col-form-label main_color_text">Номер чипа (если есть)</label>
                        <div className="col-sm-10 py-3">
                            <input className={`form-control sear_text ${validations.mark ? "is-valid" : ""}`}
                                   onChange={handlerInput} id="markPet" name="mark" />
                        </div>
                    </div>
                    <div className="form-group py-3">
                        <label htmlFor="descriptionPet" className="col-form-label main_color_text">Описание</label>
                        <div className="col-sm-10 py-3">
                            <input className={`form-control sear_text ${validations.description ? "is-valid" : errors.description ? "is-invalid" : ""}`}
                                   onChange={handlerInput} id="descriptionPet" name="description" />
                            <small className="text-danger">{errors.description}</small>
                        </div>
                    </div>
                    <div className="form-check py-5">
                        <input className={`form-check-input ${validations.confirm ? "is-valid" : ""}`}
                               onChange={handlerInput} type="checkbox" id="confirm" name="confirm" required />
                        <label className="form-check-label small" htmlFor="confirm">
                            Принять <a href="https://10.rkn.gov.ru/docs/10/Pravila_obrabotki_PD.pdf">согласие на обработку персональных данных</a>
                        </label>
                        <p className="text-danger align-content-between">{errors.confirm}</p>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handlerSubmit}>Добавить объявление</button>
                </form>
                <p className='text-center text-success' id='success' style={{ display: "none" }}>Вы успешно зарегистрированы!</p>
                <p className='text-center text-danger' id='fail' style={{ display: "none" }}>Ошибка регистрации(</p>
                <p className='text-center text-success' id='success_add' style={{ display: "none" }}>Объявление успешно добавлено!</p>
                <p className='text-center text-danger' id='fail_add' style={{ display: "none" }}>Ошибка добавления объявления(</p>
            </div>
        </main>
    );
}

export default AddPetForm;