import { ReactSVG } from 'react-svg';
import './ModalStartSystemDamage.css';
import MainButton from '../../generalComponents/MainButton/MainButton';

interface Props {
  onStartTest: () => void;
}

const ModalStartSystemDamage = ({ onStartTest }: Props) => {


  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>

        <h2 className="title-start-modal">¡Te damos la bienvenida a la verificación!</h2>

        <p className="modal-container-text" >Este proceso no te llevará mucho tiempo.
          Deberás deslizar tus dedos pintando todos los cuadrados que veas hasta completar el total
          de tu pantalla.</p>

        <div style={{ position: 'relative', left: 15, marginBottom: 70 }}>
          {/* <ReactSVG src={systemDamageIcon} /> */}
        </div>


        <div style={{ width: '90%' }} >
          <MainButton
            id='modal-comenzar-boton'
            text='COMENZAR'
            onButtonPressed={() => { onStartTest() }}
          />
        </div>

      </div>

    </div>
  );
}

export default ModalStartSystemDamage;