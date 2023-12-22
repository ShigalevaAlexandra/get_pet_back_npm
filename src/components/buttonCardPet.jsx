import React from "react";
import {useState} from "react";

import ModalRefactorCard from "../components/modalRefactor";

const EditableField = ({ label, name, value, type = 'text', onChange = () => {} }) => (
    <>
        <label>{label}</label>
        {type !== 'file' &&
            <input className="m-2" type={type} name={name} value={value} onChange={onChange} />
        }
    </>
)

const ButtonsCard = (props) => {
    const [showModal, setShowModal] = useState(false);
    const handleDeleteClick = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleConfirmDelete = () => {
        fetch(`https://pets.сделай.site/api/users/orders/${props.data.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => response.json()).then(result => {
            console.log(result);
            handleCloseModal(); // Закрывать модальное окно после удаления
            window.location.reload()
        }).catch(error => console.log('error', error));
    }

    const EditOrCancel = () => <button className={`m-auto btn btn-${editable && "danger" || "primary"} mb-2`} style={{ width: "90%" }} onClick={() => {
        setEditable(!editable)
        if (editable) setLocalData(backup)
    }}>{editable ? 'Отменить' : 'Редактировать'}</button>

    const Remove = () => <button className="m-auto btn btn-danger mb-2" style={{ width: "90%" }} onClick={handleDeleteClick}>Удалить</button>
    const [editable, setEditable] = useState(false);
    const [localData, setLocalData] = useState({ ...props.data });
    const [backup, setBackup] = useState({...localData})

    const handleSave = () => {
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

    const readOnlyView = () => (
        <>
            <h5 className="card-title text-center">{localData.kind}</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Описание: {localData.description}</li>
                <li className="list-group-item">ID: {localData.id}</li>
                <li className="list-group-item">Район: {localData.district}</li>
                <li className="list-group-item">Номер чипа: {localData.mark}</li>
                <li className="list-group-item" id="date">Дата: {localData.date}</li>
            </ul>
        </>
    );

    const editableFields = () => (
        <form id='update' style={{ display: "flex", flexDirection: "column" }}>
            <EditableField label="Фото:" type="file"/>
            <input className="m-2" type="file" accept="image/*" name="photos1"/>
            <EditableField label="Описание:" name="description" value={localData.description || ''} onChange={(e) => setLocalData({ ...localData, [e.target.name]: e.target.value })} />
            <EditableField label="Номер чипа:" name="mark" value={localData.mark || ''} onChange={(e) => setLocalData({ ...localData, [e.target.name]: e.target.value })} />
        </form>
    )

    return (
        <>
            <div className="minContainer card m-3" style={{ maxWidth: "35vw" }}>
                <img src={'https://pets.сделай.site' + (props.data.photos || props.data.photos1)} className="card-img-top" alt="pig" height="300" />
                {['active', 'onModeration'].includes(props.data.status) ? (
                    <div className="card-body" style={{ display: "flex", flexDirection: "column" }}>
                        {editable ? editableFields() : readOnlyView()}
                        {editable && <button className="m-auto btn btn-primary mb-2 mt-2" style={{ width: "90%" }} onClick={handleSave}>Сохранить</button>}
                        <EditOrCancel />
                        {!editable && <Remove/>}
                    </div>
                ) : (
                    readOnlyView()
                )}
            </div>
            <ModalRefactorCard
                show={showModal}
                closeModal={handleCloseModal}
                confirm={handleConfirmDelete}
                primaryClass="danger"
                primaryText={"Удалить"}
                secondaryText={"Отмена"}
                title="Подтверждение удаления"
                body="Вы уверены, что хотите удалить запись?"
            />
        </>
    );
}

export default ButtonsCard;