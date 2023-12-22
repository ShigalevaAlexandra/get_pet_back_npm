import React from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import UserProfileInfo from "../components/userProfileInfo";
import Footer from "../components/footer";
import Header from "../components/header";

import Token from "../modules/tokens";

const UserProfiie = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!Token()) {
            console.log("Необходимо войти в аккаунт")
            navigate("/");
        }
    })
    return (
        <div className="main_background font_family">
            <Header />
            <main>
                <UserProfileInfo/>
            </main>
            <Footer />
        </div>
    );
}

export default UserProfiie;