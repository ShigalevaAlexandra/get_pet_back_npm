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
        <div>
            <div className="main_background font_family">
                <Header />
                <main className="align-content-center">
                    <CardOnePet data={petData.data.pet} center={true} />
                </main>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default OneCardPage;