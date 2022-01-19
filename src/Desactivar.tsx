const DesactivarPolizaAlert = (props: any) => {
    return (
      <div className="desactivarPolizaAlert-container">
          <p className="desactivarPolizaAlert-container-text">¿Confirmás que querés desactivar tu seguro?</p>
          <button
              id='Continuar Boton'
              onClick={() => props.desactivarPressed()}
          > Comenzar</button>
      </div>
    );
  }
  
  export default DesactivarPolizaAlert;