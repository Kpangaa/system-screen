import Lottie from 'react-lottie';
import MainButton from '../../generalComponents/MainButton/MainButton';
import errorPago from '../../../assets/lotties/errorPago.json';
import './ModalTimerSystemDamage.css';


interface Props {
  desactivarPressed?: () => void;
  onNewTry: () => void;
  onSkipped: () => void;
  onFailed: () => void;
  challengeId: string;
}

const ModalTimerSystemDamage = ({ onNewTry, onSkipped, onFailed, challengeId }: Props) => {


  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>

       <div style={{ marginTop: 50, marginBottom: 40}}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: errorPago,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            height={100}
            width={120}
            isStopped={false}
            isPaused={false}
          />
       </div>
        <h1 className='title-principal'>¿Tuviste algún inconveniente?</h1>
        <p className='title-secundary'>No pudimos verificar tu pantalla</p>
        <p className='parrafo-principal'>Por favor, probá una de las siguientes opciones:</p>
        <p>{challengeId}</p>

        <div style={{ width: '90%', marginTop: 5}} >
          <MainButton
            id='modal-comenzar-boton'
            text='INTENTAR DE NUEVO'
            onButtonPressed={() => { onNewTry() }}
            altStyle3
          />
        </div>

        <div style={{ width: '90%', marginTop: 20}} >
          <MainButton
            id='modal-comenzar-boton'
            text='REALIZAR PROCESO DE FORMA MANUAL'
            onButtonPressed={() => { onSkipped() }}
            altStyle4
          />
        </div>

        <div style={{ width: '90%',marginTop: 20}} >
          <MainButton
            id='modal-comenzar-boton'
            text='ASEGURAR SIN DAÑO DE PANTALLA'
            onButtonPressed={() => { onFailed() }}
            altStyle5
          />
        </div>

      </div>

    </div>
  );
}

export default ModalTimerSystemDamage;