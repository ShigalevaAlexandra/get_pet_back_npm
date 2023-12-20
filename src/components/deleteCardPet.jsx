import React from "react";
import {useState} from "react";

const ClickDelete = (props) => {
    fetch(`https://pets.сделай.site/api/users/orders/${props.data.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`;
    }).then(result => {
        console.log(result)
        setCardPet(result)
    }).catch(error => console.log('error', error));
}