import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from 'react-responsive';
import './App.css';
import Modal from 'react-modal';
import DesactivarPolizaAlert from "./Desactivar";
import React from "react";

const newArray = [] as any[];
let isTabletOrMobile: boolean = false;
let startTime: number = Date.now();
let response: Object = {};
let endTime: number;
let pintarX: number;
let pintarY: number;

declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
    }

    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
        mozRequestFullScreen?: () => Promise<void>;
    }
}


const App = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    isTabletOrMobile = useMediaQuery({ query: '(max-width: 37.5em)' })

    const mobile: number = (width % 2 === 0) ? width / 10 : width / 9;
    const DIMENSION_SIZE: number = isTabletOrMobile ? mobile : width / 10;
    const [cantidad, setCantidad] = useState((Math.ceil(width / DIMENSION_SIZE) * Math.ceil(height / DIMENSION_SIZE)));

    const [sequence, setSequence] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState<string>('red');
    const [matrix, setMatrix] = useState<any>({});
    const [contador, setContador] = useState<number>(cantidad);
    const [cantidadX, setCantidadX] = useState<number>((Math.ceil(width / DIMENSION_SIZE)));
    const [cantidadY, setCantidadY] = useState<number>((Math.ceil(height / DIMENSION_SIZE)));
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [show, setShow] = useState<boolean>(false);
    const rootElement = document.documentElement;


    const draw = () => {
        let can = canvasRef.current as HTMLCanvasElement;
        let context = can?.getContext('2d') as CanvasRenderingContext2D;
        context.clearRect(0, 0, width, height);
        context.lineWidth = 1;
        context.strokeStyle = "gray";
        for (let x = 0; x < width; x += DIMENSION_SIZE) {
            for (let y = 0; y < height; y += DIMENSION_SIZE) {
                context.strokeRect(x + 1, y + 1, DIMENSION_SIZE, DIMENSION_SIZE);
            }
        }
        renderRectangulos();
    }

    useEffect(() => {
        let can = canvasRef.current as HTMLCanvasElement;
        let context = can?.getContext('2d') as CanvasRenderingContext2D;
        let animateFrameId: number = 0;
        const loop = () => {
            draw();
            animateFrameId = window.requestAnimationFrame(loop)
        }
        loop();
        return () => {
            context.clearRect(0, 0, width, height);
            window.cancelAnimationFrame(animateFrameId);
            // window.removeEventListener("resize", () => {
            //     setWidth(window.innerWidth);
            //     setHeight(window.innerHeight);
            // });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height, cantidadY, cantidadX]);

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange, false);
        rootElement.style.setProperty("--refresh", 'contain');

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange, false);
            rootElement.style.setProperty("--refresh", 'initial');
        }
    }, []);

    console.log(`object`, rootElement.style.getPropertyValue("--refresh"));

    const handleVisibilityChange = () => {
        if (document.visibilityState !== 'visible') {
            let nav: string = getBrowserInfo();
            if (!nav.toLowerCase().includes('safari')) {
                window.location.reload();
            }
        }
        console.log(`nav.userAgent`, getBrowserInfo());
    }

    const detectOS = () => {
        const platform = navigator.platform.toLowerCase(),
            iosPlatforms = ['iphone', 'ipad', 'ipod', 'ipod touch'];

        if (platform.includes('mac')) return 'MacOS';
        if (iosPlatforms.includes(platform)) return 'iOS';
        if (platform.includes('win')) return 'Windows';
        if (/android/.test(navigator.userAgent.toLowerCase())) return 'Android';
        if (/linux/.test(platform)) return 'Linux';

        return 'unknown';
    }

    const getBrowserInfo = () => {
        let ua = navigator.userAgent;
        let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        return M[1];
    };

    useEffect(() => {
        if (contador === 0) {
            endTime = new Date().getTime();
            let timeOut = endTime - startTime;
            response = {
                checkoutId: "f2c0f1be-7240-11ec-90d6-0242ac120003",
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
                tiles: newArray
            }
            console.log(`response`, response);
            alert(`Acabo la prueba`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contador]);

    console.log(`cantidadX`, cantidadX);
    console.log(`cantidadY`, cantidadY);
    console.log(`contador`, contador);

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

    const renderRectangulos = () => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
        for (let x = 0; x < cantidadX; x++) {
            for (let y = 0; y < cantidadY; y++) {
                if (matrix[`${x},${y}`]?.touch === true) {
                    context.fillStyle = matrix[`${x},${y}`]?.color;
                    context.fillRect(x * DIMENSION_SIZE, y * DIMENSION_SIZE, DIMENSION_SIZE - 1, DIMENSION_SIZE - 1);
                }
            }

        }
    }

    const getFullScreenElement = () => {
        console.log(document.documentElement.getElementsByTagName('canvas')[0]);
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;
    }


    const toggleFullScreen = () => {
        const container: HTMLElement = document.getElementById("canvas");
        if (container.requestFullscreen) {    //Empezando por la estándar
            container.requestFullscreen();
            console.log('Estandar')
        } else if (container.webkitRequestFullscreen) {    //Webkit (Safari, Chrome y Opera 15+)
            console.log(`webkit`)
            container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {   //Firefox
            console.log('mozRequestFullScreen')
            container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {    //Internet Explorer 11+
            console.log('msRequestFullscreen', container.msRequestFullscreen)
            container.msRequestFullscreen();
        }
    }

    const desactivarModalProducto = () => {
        return (
            <Modal
                isOpen={show === false}
                onRequestClose={() => {
                    setShow(true);
                    toggleFullScreen();
                    window.addEventListener("resize", () => {
                        setWidth(window.innerWidth);
                        setHeight(window.innerHeight);
                        setCantidadX(Math.ceil(window.innerWidth / DIMENSION_SIZE));
                        setCantidadY(Math.ceil(window.innerHeight / DIMENSION_SIZE));
                        if (detectOS() === 'iOS') {
                            setCantidad( (Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE)) - Math.ceil(window.innerWidth / DIMENSION_SIZE));
                            setContador( (Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE)) - Math.ceil(window.innerWidth / DIMENSION_SIZE));
                        } else {
                            setCantidad( (Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE)));
                            setContador( (Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE)));
                        }
                    });
                    // window.addEventListener('fullscreenchange', () => {
                    //     setWidth(window.innerWidth);
                    //     setHeight(window.innerHeight);
                    //     setCantidadX(Math.ceil(window.innerWidth / DIMENSION_SIZE));
                    //     setCantidadY(Math.ceil(window.innerHeight / DIMENSION_SIZE));
                    //     setCantidad(Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE));
                    //     setContador(Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE));
                    // });
                }}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '20px',
                        width: isTabletOrMobile ? '80%' : '50%',
                        padding: isTabletOrMobile ? '5px' : '20px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                }}>
                <DesactivarPolizaAlert
                    desactivarPressed={() => {
                        setShow(true);
                        toggleFullScreen();
                        // window.addEventListener('fullscreenchange', () => {
                        //     setWidth(window.innerWidth);
                        //     setHeight(window.innerHeight);
                        //     setCantidadX(Math.ceil(window.innerWidth / DIMENSION_SIZE));
                        //     setCantidadY(Math.ceil(window.innerHeight / DIMENSION_SIZE));
                        //     setCantidad(Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE));
                        //     setContador(Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE));
                        // });
                        console.log(`getFullScreen`, getFullScreenElement());
                        window.addEventListener("resize", () => {
                            setWidth(window.innerWidth);
                            setHeight(window.innerHeight);
                            setCantidadX(Math.ceil(window.innerWidth / DIMENSION_SIZE));
                            setCantidadY(Math.ceil(window.innerHeight / DIMENSION_SIZE));
                            if (detectOS() === 'iOS') {
                                setCantidad( (Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE)) - Math.ceil(window.innerWidth / DIMENSION_SIZE));
                                setContador( (Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE)) - Math.ceil(window.innerWidth / DIMENSION_SIZE));
                            } else {
                                setCantidad( (Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE)));
                                setContador( (Math.ceil(window.innerWidth / DIMENSION_SIZE) * Math.ceil(window.innerHeight / DIMENSION_SIZE)));
                            }
                        });
                        console.log('entra por aca')
                    }}
                />
            </Modal>
        )
    }

    const onMouseDown = (event: React.MouseEvent) => {
        if (isDrawing) return;
        setSequence(sequence + 1);
        setIsDrawing(true);
        setColor(getColorRandom());
        event.preventDefault();
    }

    const onMouseMove = (event: React.MouseEvent) => {
        if (!isDrawing) return
        pintarX = Math.floor(event.pageX / DIMENSION_SIZE);
        pintarY = Math.floor(event.pageY / DIMENSION_SIZE);
        render(pintarX, pintarY);
        event.preventDefault();
    }

    const onMouseUp = (event: React.MouseEvent) => {
        if (!isDrawing) return;
        setIsDrawing(false);
        event.preventDefault();
    }

    const onTouchStart = (event: React.TouchEvent) => {
        if (isDrawing) return;
        setSequence(sequence + 1);
        setIsDrawing(true);
        setColor(getColorRandom());
        event.preventDefault();
    }

    const onTouchMove = (event: React.TouchEvent) => {
        if (!isDrawing) return;
        let pintarX = Math.floor(event.touches[0].pageX / DIMENSION_SIZE);
        let pintarY = Math.floor(event.touches[0].pageY / DIMENSION_SIZE);
        render(pintarX, pintarY);
        event.preventDefault();
    }

    const onTouchEnd = (event: React.TouchEvent) => {
        if (!isDrawing) return;
        setIsDrawing(false);
        event.preventDefault();
    }

    const getColorRandom = (): string => {
        let hexadecimal: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        let colorRandom: string = "#";
        for (let i = 0; i < 6; i++) {
            let posArray: number = Math.floor(Math.random() * hexadecimal.length);
            colorRandom += hexadecimal[posArray]
        }
        return colorRandom;
    }

    return (
        <div id="contenedor">
            <canvas
                ref={canvasRef}
                id="canvas"
                width={width}
                height={height}
                // style={{ zoom: 'reset', overscrollBehaviorY: 'contain', overscrollBehavior: 'contain' }}
                className='contenedor'
                onMouseDown={(event: React.MouseEvent) => onMouseDown(event)}
                onMouseMove={(event: React.MouseEvent) => onMouseMove(event)}
                onMouseUp={(event: React.MouseEvent) => onMouseUp(event)}
                onTouchMove={(event: React.TouchEvent) => onTouchMove(event)}
                onTouchStart={(event: React.TouchEvent) => onTouchStart(event)}
                onTouchEnd={(event: React.TouchEvent) => onTouchEnd(event)}
            />
            {desactivarModalProducto()}
        </div>
    )
}
export default App;
