import {Routes, Route} from 'react-router-dom';

import Main from "./pages/main";
import AddPet from "./pages/addPet";
import SearchPet from "./pages/searchPet";

import '../src/MyCss/myCSS.css';

function App() {
  return (
      <div className="App">
          <Routes>
            <Route path="/" element = {<Main/>}/>
            <Route path="/addPet" element = {<AddPet/>}/>
            <Route path="/searchPet" element = {<SearchPet/>}/>
          </Routes>
      </div>
  );
}

export default App;
