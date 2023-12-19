import React from "react";
import {useState, useEffect} from "react";

import Slide from "../components/slide";

const Loading = () => {
    return (
        <div className='justify-content-center align-items-center' style={{display: "flex"}} id='load'>
            <div className="spinner-grow text-primary"/>
        </div>
    );
}

const Slider = () => {
    const [slide, setSlide] = useState({ data: { pets: [] } });
    useEffect(() => request(slide, setSlide), []);
    const request = (slide, setSlide) => {
        fetch("https://pets.сделай.site/api/pets/slider")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setSlide(result);

                if (document.getElementById("carouselExampleIndicators")) {
                    document.getElementById("carouselExampleIndicators").style.display = "flex";
                }
                if (document.getElementById("load")) {
                    document.getElementById("load").style.display = "none";
                }
            })
            .catch(error => console.log('error', error));
    }

    const carousel_inner = slide.data.pets.map((pet, index) => {
        return <Slide data={pet} key={index} active={index === 0} />;
    });

    const carousel_indicators = slide.data.pets.map((pet, index) => {
        if (index === 0)
            return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" key={index + 'btn'}></button>;
        else
            return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label={"Slide " + (Number(index) + 1)} key={index + 'btn'}></button>;
    });

    return (
        <div>
            <Loading/>
            <div id="carouselExampleIndicators" className="carousel slide m-auto w-50 p-2 my_carousel"
                 data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {carousel_indicators}
                </div>
                <div className="carousel-inner">
                    {carousel_inner}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Предыдущий</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Следующий</span>
                </button>
            </div>
        </div>
    );
}

export default Slider;

