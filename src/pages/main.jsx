import React from "react";
import {useState, useEffect} from "react";

import Header from "../components/header";
import FustSearch from "../components/fustSearch";
import Slider from "../components/slider"
import CardPet from "../components/cardPet";
import Subscribe from "../components/subscribeNews";
import Footer from "../components/footer";

const Main = () => {
    const [card, setCard] = useState({ data: { orders: [] } });
    useEffect(() => request(card, setCard), []);
    const request = (card, setCard) => {
        fetch("https://pets.сделай.site/api/pets")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setCard(result);
            })
            .catch(error => console.log('error', error));
    }
    const cardsPet = card.data.orders.map((order) => {
        return <CardPet data={order}/>;
    });

    return (
        <div className="main_background font_family">
            <Header/>
            <main>
                <FustSearch/>
                <h2 className="text-center py-2 main_color_text font_family my-5">Найденные животные</h2>
                <Slider/>
                <h2 className="text-center py-2 main_color_text font_family my-5">Карточки найденных животных</h2>
                <div className="d-flex flex-row flex-wrap justify-content-center top_border_radius" id="cardPets">
                    {cardsPet}
                </div>
                <Subscribe/>
            </main>
            <Footer />
        </div>
    );
}

export default Main;