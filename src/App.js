import './App.css';
import {useState} from 'react';
import Axios from 'axios';

function App() {

  const [pok, setPok] = useState("");
  const [pokchosen, setPokchosen] = useState(false);
  const [info, setInfo] = useState({
            name: "", 
            species: "", 
            img: "",
            hp: "",
            attack: "",
            defense: "",
            type: "",
  });

  const searchPok = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pok}`)
          .then((res) => {setInfo({
            name: pok, 
            species: res.data.species.name, 
            img: res.data.sprites.other.dream_world.front_default, 
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[1].base_stat,
            type: res.data.types[0].type.name,
          });
       }  
      );
  }
  return (
    <>
      <div className="App">
        <h1>Pokemon Stats</h1>
        <div className="form-group">
          <label htmlFor="usr">Search for Pokemon:</label>
          <input type="text" className="form-control" id="usr" onChange={(e) => setPok(e.target.value)} />
        </div>
        <button className="btn btn-warning" onClick={searchPok}>Submit</button>
      </div>

      <div className="displayContainer">
        {
              (pok!==info.name) ?
              ( 
              <>
              <h1> {info.name}</h1>
              <img src={info.img} alt={info.name} />
              <h2>{info.species}</h2>
              <h3>HP: {info.hp}</h3>
              <h3>Attack: {info.attack}</h3>
              <h3>Defense: {info.defense}</h3>
              <h3>Type: {info.type}</h3>
              </>
              ) :null
             
        }
      </div>
    </>
  );
}

export default App;
