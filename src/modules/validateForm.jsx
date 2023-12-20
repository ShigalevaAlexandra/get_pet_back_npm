const userNameValid = (value) => {
    const error = !value.trim()
        ? "*Обязательное поле"
        : !/^[а-яА-ЯёЁ\s-]+$/.test(value)
            ? "Допустимые символы: кириллица, пробел, дефис"
            : "";
    return error;
}

const userPhoneValid = (value) => {
    const error = !value.trim()
        ? "*Обязательное поле"
        :  !/^[+7][0-9]+$/.test(value)
            ? "Поле имеет формат +79999999999"
            : value.length < 12 || value.length > 12
                ? "Номер состоит из 12 символов"
                : "";
    return error;
}

const userEmailValid = (value) => {
    const error = !value.trim()
        ? "*Обязательное поле"
        : !/^\S+@\S+\.\S+$/.test(value)
            ? "Неверный формат email"
            : "";
    return error;
}

const userPassAuthValid = (value) => {
    const error = !value.trim()
        ? "*Введите пароль"
        : !/^[a-zA-Z0-9]+$/.test(value)
            ? "Введите пароль"
            : !/[0-9]{1,}/.test(value)
                ? "Введите пароль"
                : value.length < 7
                    ? "Введите пароль"
                    : "";
    return error;
}

const userPassValid = (value) => {
    const error = !value.trim()
        ? "*Придумайте пароль"
        : !/^[a-zA-Z0-9]+$/.test(value)
            ? "Пароль не безопасный"
            : !/[0-9]{1,}/.test(value)
                ? "Пароль должен иметь хотя бы одну цифру"
                : value.length < 7
                    ? "Пароль не безопасный"
                    : "";
    return error;
}

const userPassConfigValid = (value, value2) => {
    const error = !value.trim()
        ? "*Подтвердите пароль"
        : value !== value2
            ? "Пароли не совпадают"
            : "";
    return error;
}

const configValid = (value) => {
    const error = !value ? "Необходимо согласие на обработку персональных данных" : "";
    return error;
}

const petPhotoValid = (value) => {
    const error = value.length === 0 ? "Необходимо выбрать файл" : ""
    return error
}

const valueValid = (name, value) => {
    return !value.trim() ? `*Обязательное поле` : ""
}

export {
    userNameValid,
    userPhoneValid,
    userEmailValid,
    userPassAuthValid,
    userPassValid,
    userPassConfigValid,
    configValid,
    petPhotoValid,
    valueValid
}