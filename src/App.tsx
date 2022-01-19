import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from 'react-responsive';
import './App.css';

const width: number = window.innerWidth;
const height: number = window.innerHeight;
let isTabletOrMobile: boolean = false;
const newArray = [] as any[];
let startTime: number = Date.now();

const App = () => {
    isTabletOrMobile = useMediaQuery({ query: '(max-width: 37.5em)' })

    const mobile: number = (width % 2 === 0) ? width / 10 : width / 9;
    const DIMENSION_SIZE: number = isTabletOrMobile ? mobile : width / 10;
    let cantidad: number = (Math.ceil(width / DIMENSION_SIZE) * Math.ceil(height / DIMENSION_SIZE));

    const [sequence, setSequence] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState<string>('red');
    const [matrix, setMatrix] = useState<any>({});
    const [contador, setContador] = useState<number>(cantidad);

    const cantidadX: number = (Math.ceil(width / DIMENSION_SIZE));
    const cantidadY: number = (Math.ceil(height / DIMENSION_SIZE));
    const canvasRef = useRef<HTMLCanvasElement>(null);

    let response: Object = {};
    let pintarX: number;
    let pintarY: number;
    let endTime: number;


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

    // screen.orientation.lock('portrait');

    // document.addEventListener('fullscreenchange', () => {
    //     if (!document.fullscreenElement) {
    //         screen.orientation.lock('portrait');
    //         console.log(`OLAAAA`)
    //     }
    // })

    // var goFS = document.getElementById("canvas");
    // goFS.addEventListener('click', function () {
    //     document.body.requestFullscreen();
    //     console.log(`entro aca`)
    // }, false);


    useEffect(() => {
        let can = canvasRef.current as HTMLCanvasElement;
        let context = can?.getContext('2d') as CanvasRenderingContext2D;
        let animateFrameId: number = 0;
        const loop = () => {
            draw();
            animateFrameId = window.requestAnimationFrame(loop)
        }
        loop();
        // document.addEventListener('touchmove', () => {}, {passive: false})
        return () => {
            context.clearRect(0, 0, width, height);
            window.cancelAnimationFrame(animateFrameId);
        }
    }, [width, height]);

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
    }, [contador]);


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

    const handleClick = () => {
        var goFS = document.getElementById("goFS");
        goFS.addEventListener("click", function () {
            var container = document.getElementById("canvas");
            container.requestFullscreen();
        }, false);
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
        let hexadecimal: string[] = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
        let colorRandom: string = "#";
        for (let i = 0; i < 6; i++) {
            let posArray: number = Math.floor(Math.random() * hexadecimal.length);
            colorRandom += hexadecimal[posArray]
        }
        return colorRandom;
    }

    window.scrollTo(0,1);

    return (
        <div>
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
            {/* <button id="goFS" onClick={() => handleClick()}>Go to FullScreen</button> */}
        </div>
    )
}
export default App;
