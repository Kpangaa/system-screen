import './ModalSuccessFullSystemDamage.css';
import Lottie from 'react-lottie';
import exitoSuccesSystemDamage from '../../../assets/lotties/exitoSuccesSystemDamage.json';
import conffetis from '../../../assets/lotties/conffetis.json';
import MainButton from '../../generalComponents/MainButton/MainButton';



interface Props {
    onPassed: () => void;
}

const ModalSuccessFullSystemDamage = ({ onPassed }: Props) => {


    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>

                <div style={{ marginTop: 30, marginBottom: 40 }}>
                <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: conffetis,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }}
                        height={95}
                        width={180}
                        isStopped={false}
                        isPaused={false}
                    />
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: exitoSuccesSystemDamage,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }}
                        height={120}
                        width={120}
                        isStopped={false}
                        isPaused={false}
                    />
                </div>
                <h1 className='title-succes-principal'>¡Felicidades!</h1>
                <h2 className='title-succes-secondary'>Tu pantalla está en perfecto estado</h2>
                <p className='title-succes-parrafo'>Podés continuar asegurando tu celular</p>

                <div style={{ width: '90%', marginTop: 80}} >
                    <MainButton
                        id='modal_start_boton'
                        text='CONTINUAR'
                        onButtonPressed={() => { onPassed() }}
                        altStyle3
                    />
                </div>

            </div>

        </div>
    );
}

export default ModalSuccessFullSystemDamage;