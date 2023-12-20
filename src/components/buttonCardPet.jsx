import React from "react";

import Register from "./deleteCardPet";
import Auth from "./refactorCardPet";

const ButtonCardPet = (props) => {

    return (
        <div className="d-flex flex-row flex-wrap m-3 my_cards top_border_radius" style={{overflow: "hidden",  maxWidth: "25vw"}}>
            <img src={'https://pets.сделай.site' + (props.data.photos || props.data.photos1)} className="top_border_radius_img card-img-top" alt="cardPet"/>
            <ul className="list-group list-group-flush">
                <li className="list-group-item main_color_text"><b className="back_color_text">Статус: </b>{props.data.id}</li>
                <li className="list-group-item py-3">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#ModalDeleteCardPet">Удалить</button>
                </li>
                <li className="list-group-item py-3">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#ModalRefactorCardPet">Редактировать</button>
                </li>
            </ul>
        </div>
    );
}

export default ButtonCardPet;