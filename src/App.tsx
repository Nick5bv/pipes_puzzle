import React, { useState, useEffect, useRef, CanvasHTMLAttributes, MouseEvent } from 'react';
import './App.css';
import { socket } from './socket';


const App: React.FC = () => {
    const [tiles, setTiles] = useState<string[][]>([]);
    const [weightGrid, setWeightGrid] = useState<number>(0)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const TILE_SIZE = 60;
    const HEIGHT_OF_GRID = tiles.length * TILE_SIZE
    const WEIGHT_OF_GRID = weightGrid * TILE_SIZE
    const initialCanvasProperties: CanvasHTMLAttributes<HTMLCanvasElement> = {
        height: HEIGHT_OF_GRID,
        width: WEIGHT_OF_GRID
    }

    const draw = (): void => {
        clearCanvas();
        for (let i = 0; i < tiles.length; i++ ) {
            for (let j = 0; j < tiles[i].length; j++) {
                if (tiles[i][j] && ctx) {
                    ctx.strokeText(tiles[i][j], i * TILE_SIZE, j * TILE_SIZE)
                }
            }
        }
    }

    const clearCanvas = (): void => {
        if (ctx) {
            ctx.clearRect(0, 0, HEIGHT_OF_GRID, WEIGHT_OF_GRID);
        }

    }

    useEffect(() => {
        socket.addEventListener('open', (event) => {
            socket.send(`new 1`)
            socket.send('map')
            socket.onmessage = ((event: MessageEvent) => {
                const currentTiles = (event.data || '')
                    .split('\n')
                    .slice(1, -1)
                    .map((line: string) => {
                        if (line.length > weightGrid) {
                            setWeightGrid(line.length)
                        }
                        return line.split('')
                    })

                setTiles(currentTiles)

                console.log(tiles)
            })
        });
    }, []);

    useEffect(draw, [tiles]);

    const onCanvasClick = ({ nativeEvent: { offsetX, offsetY } }: MouseEvent): void => {
        changeTileValue(offsetX, offsetY)
    }

    const changeTileValue = (x: number, y: number): void => {
        const currentX: number = Math.floor(x / TILE_SIZE)
        const currentY: number = Math.floor(y / TILE_SIZE)
        console.log(currentX, currentY)
    }

    return (
        <div className="App">
            <canvas
                className={'canvas'}
                ref={canvasRef}
                {...initialCanvasProperties}
                onClick={onCanvasClick}
            />
        </div>
    );
}

export default App;
