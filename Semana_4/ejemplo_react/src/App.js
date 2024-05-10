import logo from './logo.svg';
import './App.css';
import Boton from './atoms/boton/Boton';
import CustomInput from './atoms/CustomInput/CustomInput';


/*Componenetes funcionales 
    ->funcionales   
    -> class componentes
*/

function App() {
  return (
    <div className="App" >
      <header className="App-header">
        <CustomInput/>
        <Boton titulo="hola" hola= "mundo"/>
        <Boton titulo = "click"/>
        <Boton titulo ="borrar" />
        <Boton titulo = "agregar"/>
      
      </header>
    </div>

  );
}

export default App;
