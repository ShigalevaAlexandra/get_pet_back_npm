import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {FustSearchRequest} from "../modules/requests";

let countChange = 0

const FustSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cardPet, setCardPet] = useState({ data: { orders: [] } })
    const navigate = useNavigate();

    const submitSearch = (e) => {
        e.preventDefault()
        console.log(searchTerm);
        navigate("/searchPet", { state: { query: searchTerm } });
    };

    const onChange = (e) => {
        setSearchTerm(e.target.value)
        if (e.target.value.length > 3) {
            if (countChange > 0) {
                document.getElementById("noSearch").id = 'pets'
                countChange = 0
            }
            setTimeout(() => FustSearchRequest(e.target.value, cardPet, setCardPet), 1000)
        }
        else {
            if (countChange === 0) {
                document.getElementById("pets").id = 'noSearch'
            }
            countChange++
        }
    }

    const options = new Set()
    cardPet.data.orders.map((order) => {
        if (options.size < 5) {
            options.add(order.description)
            return <option value={order.description}></option>
        }
    })
    const countOptions = []
    for (const option of options.keys()) {
        countOptions.push(<option value={option}></option>)
    }

    return (
        <div className="mx-5 px-5 py-5 search my-5">
            <h5 className="py-2 back_color_text">Быстрый поиск по объявлениям ->></h5>
            <form className="d-flex" role="search" onSubmit={submitSearch}>
                <input
                    className="form-control me-2 opacity-50"
                    type="search"
                    placeholder="поиск..."
                    aria-label="Search"
                    list="pets"
                    value={searchTerm}
                    onChange={onChange}
                />
                <datalist id="pets">
                {countOptions}
                </datalist>
                <button className="btn btn-primary" type="submit">Поиск</button>
            </form>
        </div>
    );
}

export default FustSearch;