import React from "react";
import {useNavigate} from "react-router-dom";

const CardPet = (props) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-row flex-wrap m-3 my_cards top_border_radius" style={{overflow: "hidden",  maxWidth: "25vw"}} onClick={() => {
            navigate("/card", { state: props.data.id })
        }}>
            <img src={'https://pets.сделай.site' + (props.data.photos || props.data.photos1)} className="top_border_radius_img card-img-top" alt="cardPet"/>
            <ul className="list-group list-group-flush">
                <li className="list-group-item main_color_text"><b className="back_color_text">id: </b>{props.data.id}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Вид животного: </b>{props.data.kind}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Описание: </b>{props.data.description}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Номер чипа: </b>{props.data.mark}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Район: </b>{props.data.district}</li>
                <li className="list-group-item main_color_text" id="date"><b className="back_color_text">Дата: </b>{props.data.date}</li>
            </ul>
        </div>
    );
}

export default CardPet;