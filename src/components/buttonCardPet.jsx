import React from "react";
import {useState} from "react";

import ModalRefactorCard from "../components/modalRefactor";

const RefactorCard = ({ label, name, value, type = 'text', onChange = () => {} }) => (
    <>
        <label>{label}</label>
        {type !== 'file' &&
            <input className="m-2" type={type} name={name} value={value} onChange={onChange} />
        }
    </>
)

const ButtonsCard = (props) => {
    const [showModal, setShowModal] = useState(false);
    const DeleteClick = () => {
        setShowModal(true);
    }
    const CloseСlick = () => {
        setShowModal(false);
    }

    const handlerDelete = () => {
        fetch(`https://pets.сделай.site/api/users/orders/${props.data.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => response.json()).then(result => {
            console.log(result);
            CloseСlick();
            window.location.reload()
        }).catch(error => console.log('error', error));
    }

    const CancelClick = () => <button className={`m-auto btn btn-${editable && "danger" || "primary"} mb-2 my-5`} onClick={() => {
        setEditable(!editable)
        if (editable) setLocalData(backup)
    }}>{editable ? 'Отменить' : 'Редактировать'}</button>

    const Remove = () => <button className="m-auto btn btn-danger mb-2 my-2" onClick={DeleteClick}>Удалить</button>
    const [editable, setEditable] = useState(false);
    const [localData, setLocalData] = useState({ ...props.data });
    const [backup, setBackup] = useState({...localData})

    const handlerSave = () => {
        fetch(`https://pets.сделай.site/api/pets/${props.data.id}`, {
            method: "POST",
            body: new FormData(document.getElementById('update')),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => response.json()).then(result => {
            console.log(result);
            setEditable(false)
            setBackup(localData)
        }).catch(error => console.log('error', error));
    }

    const readOnly = () => (
        <>
            <ul className="list-group list-group-flush">
                <li className="list-group-item main_color_text"><b className="back_color_text">id: </b>{localData.id}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Имя нашедшего: </b>{localData.name}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Телефон для связи: </b>{localData.phone}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Вид животного: </b>{localData.kind}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Описание: </b>{localData.description}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Номер чипа: </b>{localData.mark}</li>
                <li className="list-group-item main_color_text"><b className="back_color_text">Район: </b>{localData.district}</li>
                <li className="list-group-item main_color_text" id="date"><b className="back_color_text">Дата: </b>{localData.date}</li>
            </ul>
        </>
    );

    const refactorInfo = () => (
        <form id='update' style={{ display: "flex", flexDirection: "column" }}>
            <RefactorCard label="Фото:" type="file"/>
            <input className="m-2" type="file" accept="image/*" name="photos1"/>
            <RefactorCard label="Описание:" name="description" value={localData.description || ''} onChange={(e) => setLocalData({ ...localData, [e.target.name]: e.target.value })} />
            <RefactorCard label="Номер чипа:" name="mark" value={localData.mark || ''} onChange={(e) => setLocalData({ ...localData, [e.target.name]: e.target.value })} />
        </form>
    )

    return (
        <div className="my-2">
            <div className="m-3 my_cards top_border_radius" style={{overflow: "hidden",  maxWidth: "25vw"}}>
                <img src={'https://pets.сделай.site' + (props.data.photos || props.data.photos1)} className="top_border_radius_img card-img-top" alt="cardPet" />
                {['active', 'onModeration'].includes(props.data.status) ? (
                    <ul className="list-group list-group-flush">
                        {editable ? refactorInfo() : readOnly()}
                        {editable && <button className="m-auto btn btn-primary mb-2 mt-2" onClick={handlerSave}>Сохранить</button>}
                        <CancelClick />
                        {!editable && <Remove/>}
                    </ul>
                ) : (
                    readOnly()
                )}
            </div>
            <ModalRefactorCard
                show={showModal}
                closeModal={CloseСlick}
                confirm={handlerDelete}
                primaryClass="danger"
                primaryText={"Удалить"}
                secondaryText={"Отмена"}
                title="Подтверждение удаления"
                body="Удалить объявление?"
            />
        </div>
    );
}

export default ButtonsCard;