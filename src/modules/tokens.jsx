const Token = () => {
    const token = localStorage.getItem("token");
    return token && token !== 'null'
}
export default Token;