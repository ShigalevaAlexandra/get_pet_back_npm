import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import ButtonsCard from "../components/buttonCardPet";

import {ProfileRequest} from "../modules/requests";
import {userEmailValid, userPhoneValid} from "../modules/validateForm";

const UserProfileInfo = () => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState({ email: "", phone: "", name: "", registrationDate: new Date() });
    const [card, setCard] =  useState({ data: { orders: [] } });
    const request = (card, setCard) => {
        fetch("https://pets.сделай.site/api/users/orders", {
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        }).then(response => response.json()).then(result => {
            console.log(result);
            if ('data' in result) {
                if (result.data.orders.length > 0) {
                    document.getElementById("userCards").style.display = 'flex'
                    document.getElementById("noOrders").style.display = 'none'
                    setCard(result)
                }
                else {
                    document.getElementById("userCards").style.display = 'none'
                    document.getElementById("noOrders").style.display = 'block'
                }
            }
        }).catch(error => console.log('error', error));
    }
    useEffect(() => {
        ProfileRequest(profile, setProfile)
        request(card, setCard)
    }, []);

    const requestUpdate = (key) => {
        fetch(`https://pets.сделай.site/api/users/${key}?${key}=${profile[key]}`, {
            method: "PATCH",
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        }).then(response => response.json()).then(result => {
            console.log(result);
            if ('data' in result) {
                document.getElementById(`success_${key}`).style.display = 'block'
            }
        }).catch(error => console.log('error', error));
    }

    const cards = card.data.orders.map((order) => {
        return <ButtonsCard data={order}/>;
    });

    const [errors, setErrors] = useState({phone: "", email: ""});
    const [validations, setValidations] = useState({phone: false, email: false});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setProfile((prevData) => ({...prevData, [name]: value}));

        let error = "";
        switch (name) {
            case "phone": error = userPhoneValid(value); break;
            case "email": error = userEmailValid(value); break;
        }
        setValidations((prev) => ({ ...prev, [name]: !error }));
        setErrors((prevErrors) => ({...prevErrors, [name]: error}));
    }

    const handleSubmit = (key) => {
        document.getElementById('success_phone').style.display = 'none'
        document.getElementById('success_email').style.display = 'none'
        const phoneError = userPhoneValid(profile.phone);
        const emailError = userEmailValid(profile.email);
        if (phoneError || emailError) {
            setErrors({phone: phoneError, email: emailError});
        } else {
            requestUpdate(key)
        }
    };

    return (
        <main>
            <div className="mx-5 px-5 py-5 search  my-5">
                <h5 className="py-4 back_color_text"><b>Информация о пользователе</b></h5>
                <form>
                    <div className="form-group row py-3">
                        <label htmlFor="accNameInf" className="col-sm-2 col-form-label main_color_text">Имя: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext sear_text" id="name" value={profile.name} readOnly />
                        </div>
                    </div>
                    <div className="form-group row py-3">
                        <label htmlFor="accPhoneInf" className="col-sm-2 col-form-label main_color_text">Моб. телефон: </label>
                        <div className="col-sm-10">
                            <input name="phone" type="tel" className={`form-control-plaintext sear_text ${validations.phone ? "is-valid" : errors.phone ? "is-invalid" : ""}`} id="phone" value={profile.phone} onChange={handleInputChange} />
                            <span className="text-danger">{errors.phone}</span>
                            <p className='text-center text-success' id='success_phone' style={{ display: "none" }}>Телефон изменен</p>
                        </div>
                    </div>
                    <button className="btn btn-outline-primary" onClick={() => handleSubmit("phone")}>Изменить</button>
                    <div className="form-group row py-3">
                        <label htmlFor="accEmailInf" className="col-sm-2 col-form-label main_color_text">E-mail: </label>
                        <div className="col-sm-10">
                            <input name="email" type="email" value={profile.email} className={`form-control-plaintext sear_text ${validations.email ? "is-valid" : errors.email ? "is-invalid" : ""}`} id="email" onChange={handleInputChange} />
                            <span className="text-danger">{errors.email}</span>
                            <p className='text-center text-success' id='success_email' style={{ display: "none" }}>Почта изменена</p>
                        </div>
                    </div>
                    <button className="btn btn-outline-primary" onClick={() => handleSubmit("email")}>Изменить</button>
                    <div className="form-group row py-3">
                        <label htmlFor="accDayInf" className="col-sm-2 col-form-label main_color_text">Кол-во дней на нашем сайте: {
                            Math.floor((new Date() - new Date(profile.registrationDate)) / 86400000) || 0
                        }</label>
                    </div>
                    <button onClick={() => {
                        localStorage.setItem("token", null);
                        navigate('/')
                    }
                    } className="btn btn-primary">Выйти</button>
                </form>
            </div>
            <h5 className="py-4 main_color_text text-center"><b>Добавленные объявления</b></h5>
            <p className='text-center sear_text my-5' id='noOrders' style={{ display: 'none' }}>Нет объявлений</p>
            <div className="d-flex flex-row flex-wrap justify-content-center top_border_radius" id='userCards' style={{display:"none"}}>
                {cards}
            </div>
        </main>
    );
}
export default UserProfileInfo;

//Ваш токен 2E5lxROpO2NnZ4nLrHlsmLfzOA1XHTexJbhnxfzsp1mC6WFLD09xa3cKK85pgwbphdIoWc2K4YHmgOe7