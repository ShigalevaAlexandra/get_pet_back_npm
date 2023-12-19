import React from "react";
import {useState} from "react";

import {userEmailValid} from "../modules/validateForm";

const SubscribeForm = () => {
    const [formData, setFormData] = useState({email: ""});
    const [errors, setErrors] = useState({email: ""});
    const [validations, setValidations] = useState({email: false});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
        let error = name === "email" ? userEmailValid(value) : ""
        setValidations((prev) => ({ ...prev, [name]: !error }));
        setErrors((prevErrors) => ({...prevErrors, [name]: error}));
    }

    const handleSubmit = () => {
        document.getElementById("fail_subs").style.color = 'white';
        document.getElementById("success_subs").style.color = 'white';
        const emailError = userEmailValid(formData.email);
        if (emailError) {
            setErrors({email: emailError});
        } else {
            // Все данные валидны, выполняем запрос
            request()
        }
    };

    const request = () => {
        fetch("https://pets.сделай.site/api/subscription", {
            method: "POST",
            body: new FormData(document.getElementById("SubscribeForm")) })
            .then(response => response.status).then(result => {
            if (result === 204) {
                document.getElementById("success_subs").style.color = 'green';
                document.getElementById("fail_subs").style.color = 'white';
            }
            else {
                document.getElementById("fail_subs").style.color = 'red';
                document.getElementById("success_subs").style.color = 'white';
            }
            console.log(result);
        }).catch(error => console.log('error', error));
    }

    return (
        <div className="mx-5 px-5 py-5 my_link  my-5">
            <h2 className="text-center py-2 main_color_text">Подписка на новости</h2>
            <form id="SubscribeForm" className="w-50 m-auto p-3 min_width_300">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label main_color_text">Введите адрес электронной почты</label>
                    <input type="email" name="email" className={`form-control ${validations.email ? "is-valid" : errors.email ? "is-invalid" : ""}`} onChange={handleInputChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <span className="text-danger">{errors.email}</span>
                    <div id="emailHelp" className="form-text">*Введеные вами данные не разглашаются</div>
                </div>
                <p onClick={handleSubmit} className="btn btn-primary">Подписаться</p>
            </form>
            <p className='text-center' id='success_subs' style={{ color:"white" }}>Благодарим за подписку!</p>
            <p className='text-center' id='fail_subs' style={{ color:"white" }}>Не удалось подписаться(</p>
        </div>
    );
}

export default SubscribeForm;