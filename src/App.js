import {Routes, Route} from 'react-router-dom';

import Main from "./pages/main";
import AddPet from "./pages/addPet";
import SearchPet from "./pages/searchPet";
import UserProfiie from "./pages/userProfile";
import OneCardPage from "./pages/oneCardPet";

import '../src/MyCss/myCSS.css';


function App() {
  return (
      <div className="App">
          <Routes>
            <Route path="/" element = {<Main/>}/>
            <Route path="/addPet" element = {<AddPet/>}/>
            <Route path="/searchPet" element = {<SearchPet/>}/>
            <Route path="/userProfile" element = {<UserProfiie/>}/>
            <Route path="/petCard/:id" element = {<OneCardPage/>}/>
          </Routes>
      </div>
  );
}

export default App;
