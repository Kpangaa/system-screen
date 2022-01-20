interface Props {
    desactivarPressed: () => void;
}


const DesactivarPolizaAlert = ({ desactivarPressed}: Props) => {
    

    return (
      <div className="desactivarPolizaAlert-container">
          <p className="desactivarPolizaAlert-container-text">¿Confirmás que querés desactivar tu seguro?</p>
          <button
              onClick={() => {desactivarPressed()}}
                className="desactivarPolizaAlert-container-button">
                Desactivar
            </button>
      </div>
    );
  }
  
  export default DesactivarPolizaAlert;