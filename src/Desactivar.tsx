interface Props {
    desactivarPressed: () => void;
}


const DesactivarPolizaAlert = ({ desactivarPressed}: Props) => {
    

    return (
      <div className="desactivarPolizaAlert-container">
          <p className="desactivarPolizaAlert-container-text">Hace click para comenzar la prueba de pantalla rota</p>
          <button
              onClick={() => {desactivarPressed()}}
                className="desactivarPolizaAlert-container-button">
                Comenzar
            </button>
      </div>
    );
  }
  
  export default DesactivarPolizaAlert;