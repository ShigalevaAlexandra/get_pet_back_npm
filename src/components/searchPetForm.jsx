import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";

import CardsPetsList from "../components/pagination";

import {ProfileRequest} from "../modules/requests";

const SearchForm = () => {
    const location = useLocation();
    const query = location.state?.query
    const [cardPet, setCardPet] = useState({ data: { orders: [] } });
    const [kind, setKind] = useState('')
    const [district, setDistrict] = useState('')

    const searchRequest = (cardPet, setCardPet) => {
        fetch(`https://pets.сделай.site/api/search/order?district=${district}&kind=${kind}`).then(response => response.json())
            .then(result => {
                console.log(result)
                setCardPet(result)
            }).catch(error => console.log('error', error));
    }

    useEffect(() => {
        ProfileRequest(query, cardPet, setCardPet)
    }, [query]);

    return (
        <div>
            <div className="mx-5 px-5 py-5 search my-5">
                <h5 className="py-4 back_color_text">Поиск по объявлениям ->></h5>
                <form name="searchPets">
                    <div className="form-group py-3">
                        <label className="main_color_text" htmlFor="selectArea">Выберите район:</label>
                        <select className="form-control sear_text" id="selectArea" name="selectAreaPets"
                                onChange={(e) => setDistrict(e.target.value)}>
                            <option></option>
                            <option>Адмиралтейский</option>
                            <option>Василеостровский</option>
                            <option>Выборгский</option>
                            <option>Красногвардейский</option>
                            <option>Кронштадтский</option>
                            <option>Московский</option>
                            <option>Невский</option>
                            <option>Петроградский</option>
                            <option>Приморский</option>
                            <option>Центральный</option>
                        </select>
                    </div>
                    <div className="form-group py-3">
                        <label className="main_color_text" htmlFor="formGroupExampleInput">Вид животного:</label>
                        <input type="text" className="form-control sear_text" id="formGroupExampleInput" name="inputPetsVid"
                               onChange={(e) => setKind(e.target.value)} />
                    </div>
                    <div className="form-group py-3">
                        <small className="form-text text-muted small">*Необходимо заполнить хотя бы одно поле</small>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => {
                        searchRequest(cardPet, setCardPet)
                    }}>Поиск</button>
                </form>
            </div>
            <h2 className="text-center py-2 main_color_text">Найденные объявления</h2>
            <CardsPetsList data={cardPet.data.orders} itemsPerPage={6}/>
        </div>
    );
}

export default SearchForm;