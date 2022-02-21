import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { detectOS } from "./util/DetectOS";
import { getBrowserInfo } from "./util/GetBrowserInfo";
import { browserFullScreen } from "./util/BrowserFullScreen";
import ModalStartSystemDamage from "./components/componentViewModal/viewStartModalSystemDamage/ModalStartSystemDamage";
import ModalSuccessFullSystemDamage from "./components/componentViewModal/viewSuccessfullModalSystemDamage/ModalSuccessFullSystemDamage";
import ModalTimerSystemDamage from "./components/componentViewModal/viewTimerModalSystemDamage/ModalTimerSystemDamage";
import { getColorRandom } from "./util/GetColorRandom";
import { screenTestChallenge } from "./components/net/Connector";

function isTouchEvent(e: React.TouchEvent | React.MouseEvent): e is React.TouchEvent {
    return e && 'touches' in e;
}

function isMouseEvent(e: React.TouchEvent | React.MouseEvent): e is React.MouseEvent {
    return e && 'screenX' in e && 'screenY' in e;
}

const newArray = [] as any[];
let isTabletOrMobile: boolean = false;
let startTime: number = new Date().getTime();
let response: Object = {};
let pintarX: number;
let pintarY: number;
let startTest: boolean = false;

declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
        webkitCurrentFullScreenElement?: Element
    }

    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
        mozRequestFullScreen?: () => Promise<void>;
        webkitEnterFullScreen?: () => Promise<void>;
    }
}

export enum ViewModalSystem {
    PASSED = 'PASSED',
    SKIPPED = 'SKIPPED',
    FAILED = 'FAILED',
    PENDING = 'PENDING'
}

const App = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    isTabletOrMobile = useMediaQuery({ query: '(max-width: 37.5em)' })

    const mobile: number = (width % 2 === 0) ? width / 10 : width / 9;
    const DIMENSION_SIZE: number = isTabletOrMobile ? mobile : width / 10;

    const [sequence, setSequence] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState<string>('red');
    const [matrix, setMatrix] = useState<any>({});
    const [contador, setContador] = useState<number>((Math.ceil(width / DIMENSION_SIZE) * Math.ceil(height / DIMENSION_SIZE)));
    const [cantidadX, setCantidadX] = useState<number>((Math.ceil(width / DIMENSION_SIZE)));
    const [cantidadY, setCantidadY] = useState<number>((Math.ceil(height / DIMENSION_SIZE)));
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rootElement = document.documentElement;
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const challengeId = query.get('id');

    /** Variables Modal */
    const [showStartModalSystem, setShowStartModalSystem] = useState<boolean>(false);
    const [showSuccessfullModalSystem, setShowSuccessfullModalSystem] = useState<boolean>(false);
    const [select, setSelect] = useState<number>(0);
    const [viewStatus, setViewStatus] = useState(ViewModalSystem.PENDING);

    useEffect(() => {
        let can = canvasRef.current as HTMLCanvasElement;
        let context = can?.getContext('2d') as CanvasRenderingContext2D;
        let animateFrameId: number = 0;
        const loop = () => {
            drawGrid();
            animateFrameId = window.requestAnimationFrame(loop)
        }
        if (contador !== 0) { loop(); }
        return () => {
            if (context) context.clearRect(0, 0, width, height);
            window.cancelAnimationFrame(animateFrameId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height, cantidadY, cantidadX]);

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange, false);
        let OS = detectOS();
        rootElement.style.setProperty("--refresh", 'contain');
        if (OS === "iOS" || OS === "MacOS") {
            rootElement.style.setProperty("--position", 'fixed');
            rootElement.style.setProperty("--overflow", 'hidden');
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange, false);
            rootElement.style.setProperty("--refresh", 'initial');
            rootElement.style.setProperty("--position", 'initial');
            rootElement.style.setProperty("--overflow", 'initial');
        }
    }, []);

    useEffect(() => {
        const succesTest = async () => {
            if (contador === 0) {
                try {
                    let timeOut = new Date().getTime() - startTime;
                    response = {
                        screen: {
                            width: width,
                            height: height
                        },
                        grid: {
                            x: DIMENSION_SIZE,
                            y: DIMENSION_SIZE
                        },
                        time: timeOut,
                        sequence: sequence,
                        tiles: newArray,
                        status: ViewModalSystem.PASSED
                    }
                    const resp = await axios.put(screenTestChallenge(challengeId), response);
                    setViewStatus(resp.data.status);
                    setShowSuccessfullModalSystem(true);
                } catch (error) {
                    // genericErrorHandler(error);
                    setShowSuccessfullModalSystem(false);
                    setViewStatus(ViewModalSystem.FAILED);
                }
            }
        }
        succesTest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contador, showSuccessfullModalSystem, viewStatus, showStartModalSystem]);

    useEffect(() => {
        if (select === 1 || select === 2) {
            screenTest();
        }
    }, [select]);

    useEffect(() => {
        let timer1: NodeJS.Timeout;
        if (startTest) timer1 = setTimeout(() => { setViewStatus(ViewModalSystem.FAILED); }, 60000)

        return () => {
            clearTimeout(timer1);
        }
    }, [showStartModalSystem]);

    const drawGrid = () => {
        let can = canvasRef.current as HTMLCanvasElement;
        let context = can?.getContext('2d') as CanvasRenderingContext2D;
        if (context !== undefined) {
            context?.clearRect(0, 0, width, height);
            context.lineWidth = 1;
            context.strokeStyle = "gray";
            for (let x = 0; x < width; x += DIMENSION_SIZE) {
                for (let y = 0; y < height; y += DIMENSION_SIZE) {
                    context.strokeRect(x + 1, y + 1, DIMENSION_SIZE, DIMENSION_SIZE);
                }
            }
            renderRectangles();
        }
    }

    const handleVisibilityChange = () => {
        if (document.visibilityState !== 'visible') {
            let nav: string = getBrowserInfo();
            if (!nav.toLowerCase().includes('safari')) {
                window.location.reload();
            }
        }
    }

    const screenTest = async () => {
        try {
            let timeOut = new Date().getTime() - startTime;
            response = {
                screen: {
                    width: width,
                    height: height
                },
                grid: {
                    x: DIMENSION_SIZE,
                    y: DIMENSION_SIZE
                },
                time: timeOut,
                sequence: sequence,
                tiles: newArray,
                status: select === 1 ? ViewModalSystem.SKIPPED : ViewModalSystem.FAILED
            }
            await axios.put(screenTestChallenge(challengeId), response);
        } catch (error) {
            // genericErrorHandler(error);
        }
    }

    const render = (x: number, y: number) => {
        if (matrix[`${x},${y}`]?.touch === undefined) {
            let aux = {
                touchTime: new Date().getMilliseconds(),
                sequence: sequence,
            }
            newArray.push(aux);
            setContador(contador - 1)
            matrix[`${x},${y}`] = {
                color: color,
                touch: true
            };
            setMatrix(matrix);
        }
    }

    const renderRectangles = () => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
        // context.font = "18px Arial";
        // context.fillStyle = "blue";
        // context.fillText(`${contador}`, window.innerWidth - (DIMENSION_SIZE - 5), 0 * DIMENSION_SIZE + (DIMENSION_SIZE / 2));
        for (let x = 0; x < cantidadX; x++) {
            for (let y = 0; y < cantidadY; y++) {
                if (matrix[`${x},${y}`]?.touch === true) {
                    context.fillStyle = matrix[`${x},${y}`]?.color;
                    context.fillRect(x * DIMENSION_SIZE, y * DIMENSION_SIZE, DIMENSION_SIZE - 1, DIMENSION_SIZE - 1);
                }
            }

        }
    }

    const toggleFullScreen = () => {
        const container = canvasRef.current as HTMLCanvasElement;
        browserFullScreen(container);
    }

    const confirmacionModalSystemDamage = () => {
        return (
            <Modal
                isOpen={showStartModalSystem === false}
                style={{
                    content: {
                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '99%',
                        backgroundColor: '#f4f4f4',
                    }
                }}>
                <ModalStartSystemDamage
                    onStartTest={() => {
                        setShowStartModalSystem(true);
                        toggleFullScreen();
                        startTest = true;
                        window.addEventListener("resize", () => {
                            setWidth(window.innerWidth);
                            setHeight(window.innerHeight);
                            setCantidadX(Math.ceil(window.innerWidth / DIMENSION_SIZE));
                            setCantidadY(Math.ceil(window.innerHeight / DIMENSION_SIZE));
                            setContador((Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE)));
                        });
                    }}
                />
            </Modal>
        )
    }

    if (viewStatus === ViewModalSystem.PASSED) {
        return (
            <Modal
                isOpen={viewStatus === ViewModalSystem.PASSED}
                style={{
                    content: {
                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '99%',
                        backgroundColor: '#7963E0',
                    }
                }}>
                <ModalSuccessFullSystemDamage
                    onPassed={() => {
                        setViewStatus(ViewModalSystem.PENDING);
                        navigate(-1)
                    }}
                />
            </Modal>
        )
    }

    if (viewStatus === ViewModalSystem.FAILED) {
        return (
            <Modal
                isOpen={viewStatus === ViewModalSystem.FAILED}
                style={{
                    content: {
                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '99%',
                        backgroundColor: '#FE6B18',
                    }
                }}>
                <ModalTimerSystemDamage
                    onNewTry={() => {
                        setViewStatus(ViewModalSystem.PENDING);
                        window.location.reload();
                    }}
                    onSkipped={() => {
                        setSelect(1);
                        setViewStatus(ViewModalSystem.PENDING);
                        navigate(-1)
                    }}
                    onFailed={() => {
                        setSelect(2);
                        setViewStatus(ViewModalSystem.PENDING);
                        navigate(-1)
                    }}
                />
            </Modal>
        )
    }

    const onDrawStart = (event: React.MouseEvent | React.TouchEvent) => {
        if (isDrawing) return;
        setSequence(sequence + 1);
        setIsDrawing(true);
        setColor(getColorRandom());
        event.preventDefault();
    }

    const onMouseAndTouchMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return
        if (isMouseEvent(event)) {
            pintarX = Math.floor(event.pageX / DIMENSION_SIZE);
            pintarY = Math.floor(event.pageY / DIMENSION_SIZE);
        }
        if (isTouchEvent(event)) {
            pintarX = Math.floor(event.touches[0].pageX / DIMENSION_SIZE);
            pintarY = Math.floor(event.touches[0].pageY / DIMENSION_SIZE);
        }
        render(pintarX, pintarY);
        event.preventDefault();
    }

    const onDrawEnd = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        setIsDrawing(false);
        event.preventDefault();
    }

    return (
        <div>
            <canvas
                ref={canvasRef}
                id="canvas"
                width={width}
                height={height}
                style={{ zoom: 'reset' }}
                onMouseDown={(event: React.MouseEvent) => onDrawStart(event)}
                onMouseMove={(event: React.MouseEvent) => onMouseAndTouchMove(event)}
                onMouseUp={(event: React.MouseEvent) => onDrawEnd(event)}
                onTouchMove={(event: React.TouchEvent) => onMouseAndTouchMove(event)}
                onTouchStart={(event: React.TouchEvent) => onDrawStart(event)}
                onTouchEnd={(event: React.TouchEvent) => onDrawEnd(event)}
            />
            {confirmacionModalSystemDamage()}
        </div>
    )
}
export default (App);
