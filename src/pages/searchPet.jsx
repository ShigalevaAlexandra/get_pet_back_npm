import Footer from "../components/footer";
import Header from "../components/header";
import SearchForm from "../components/searchPetForm";

const SearchPet = () => {
    return (
        <div className="main_background font_family">
            <Header/>
            <main>
                <SearchForm/>
            </main>
            <Footer/>
        </div>
    );
}

export default SearchPet;