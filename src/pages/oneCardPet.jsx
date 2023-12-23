import React from "react";
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/footer";
import Header from "../components/header";
import CardOnePet from "../components/cardOnePet";

const OneCardPage = () => {
    const [petData, setPetData] = useState({ data: { pet: [] } });
    useEffect(() => request(petData, setPetData), []);
    const {id} = useParams();

    const request = (petData, setPetData) => {
        var requestData = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://pets.сделай.site/api/pets/" + id, requestData)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setPetData(result);
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div className="main_background font_family">
            <Header />
                <main className="one_pet_my">
                    <div className="card_one_pet">
                        <CardOnePet data={petData.data.pet}/>
                    </div>

                </main>
            <Footer />
        </div>
    );
}

export default OneCardPage;