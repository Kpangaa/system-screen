interface Props {
    id: string;
    desactivarPressed: any;
}


const DesactivarPolizaAlert = ({ id, desactivarPressed}: Props) => {
    

    return (
      <div className="desactivarPolizaAlert-container">
          <p className="desactivarPolizaAlert-container-text">¿Confirmás que querés desactivar tu seguro?</p>
          <button
              id={id}
              onClick={() => {desactivarPressed()}}
                className="desactivarPolizaAlert-container-button">
                Desactivar
            </button>
      </div>
    );
  }
  
  export default DesactivarPolizaAlert;