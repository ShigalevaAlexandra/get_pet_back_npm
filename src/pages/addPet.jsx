import Footer from "../components/footer";
import Header from "../components/header";
import AddPetForm from "../components/addPetForm";

const AddPet = () => {
    return (
        <div className="main_background font_family">
            <Header/>
            <main>
                <AddPetForm/>
            </main>
            <Footer/>
        </div>
    );
}

export default AddPet;