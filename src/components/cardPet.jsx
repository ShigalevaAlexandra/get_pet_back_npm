import React from "react";

import {Link} from "react-router-dom";

const CardPet = (props) => {

    return (
        <div className="m-3 my_cards top_border_radius" style={{overflow: "hidden",  maxWidth: "25vw"}}>
            {props.data === null?<></>:<img src={'https://pets.сделай.site' + (props.data.photos || props.data.photos1)} className="top_border_radius_img card-img-top" alt="cardPet"/>}
            <ul className="list-group list-group-flush">
                <li className="list-group-item main_color_text"><b className="back_color_text">id: </b>{props.data.id}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Имя нашедшего: </b>{props.data.name}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Телефон для связи: </b>{props.data.phone}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Вид животного: </b>{props.data.kind}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Описание: </b>{props.data.description}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Номер чипа: </b>{props.data.mark}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Район: </b>{props.data.district}</li>
                <li className="list-group-item main_color_text" id="date"><b className="back_color_text">Дата: </b>{props.data.date}</li>
                <li className="list-group-item py-3"><button type="button" className="btn btn-primary"><Link to={"/petCard/" + props.data.id} className="text-white text-decoration-none">Подробнее >></Link></button></li>
            </ul>
        </div>
    );
}

export default CardPet;