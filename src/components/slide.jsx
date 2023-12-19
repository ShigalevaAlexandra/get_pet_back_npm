import React from "react";

const Slide = (props) => {
    return (
        <div className={"carousel-item" + (props.active ? " active" : "")} >
            <img src={'https://pets.сделай.site' + props.data.image} className="d-block w-100 top_border_radius" alt="slide"/>
            <div className="text-center py-4 main_color_text">
                <h5 className="back_color_text"><b>{props.data.kind}</b></h5>
                <p>{props.data.description}</p>
            </div>
        </div>
    );
}

export default Slide;