import React, {
    MouseEvent,
    useRef,
    useEffect,
    useState, Dispatch, SetStateAction
} from 'react'
import styled from 'styled-components';
import drawCanvas from "../helpers/drawCanvas";
import setTileValue from "../helpers/setTileValue";
import { TILE_SIZE } from "../constants";
import startGame from "../helpers/startGame";

const GameWrapper = styled.section`
    display: flex;
    justify-content: center;
`

const CanvasWrapper = styled.section`
    max-width: 80vw;
    max-height: 80vh;
    overflow: scroll;
    background-color: #ffffff;
    margin-top: 6px;
`

const ButtonWrapper = styled.section`
    display: flex;
    justify-content: center;
`

const GameButton = styled.button`
    border: 1px solid #2bb673;
    cursor: pointer;
    display: inline-block;
    border-radius: 4px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    min-width: 150px;
    padding: 16px 22px;
    transition: all .3s ease-in-out;
    margin: 6px;
    background-color: #2bb673;
    color: #ffffff;
      &:hover {
        background-color: #26a166;
        border-color: #26a166;
      }
`

interface GameProps {
    level: number,
    socket: WebSocket,
    setActiveLevel: Dispatch<SetStateAction<number | null>>
}

const Game: React.FC<GameProps> = ({ level = 1, socket, setActiveLevel }) => {
    const [tiles, setTiles] = useState<string[][]>([]);
    const [widthGrid, setWidthGrid] = useState<number>(0)
    const CURRENT_TITLE_SIZE = TILE_SIZE - level * 10

    const HEIGHT_OF_GRID = tiles.length * CURRENT_TITLE_SIZE
    const WIDTH_OF_GRID = widthGrid * CURRENT_TITLE_SIZE
    const canvasRef = useRef<HTMLCanvasElement | null>(null)


    useEffect(() => startGame({
        level,
        widthGrid,
        setWidthGrid,
        setTiles,
        socket
    }), [])

    useEffect(() => drawCanvas({
        canvasRef,
        height: HEIGHT_OF_GRID,
        width: WIDTH_OF_GRID,
        tiles,
        titleSize: CURRENT_TITLE_SIZE
    }), [tiles]);

    const changeTileValue = ({ nativeEvent: { offsetX, offsetY } }: MouseEvent): void => {
        setTileValue({
            x: offsetX,
            y: offsetY,
            setTiles,
            socket,
            titleSize: CURRENT_TITLE_SIZE
        })
    }

    const resetGame = (): void => {
        setActiveLevel(null)
        socket.close()
    }

    const onVerify = (): void => {
        if (socket.readyState !== socket.OPEN) {
            return
        }
        socket.send("verify");
        socket.onmessage = (event) => {
            if (event.data.includes("Incorrect")) {
                alert('Not verified')
            } else {
                alert('Verified')
                socket.close()
            }
        }
    }

    return (
        <>
            <GameWrapper>
                <CanvasWrapper>
                    <canvas
                        className={'canvas'}
                        ref={canvasRef}
                        height={HEIGHT_OF_GRID}
                        width={WIDTH_OF_GRID}
                        onClick={changeTileValue}
                    />
                </CanvasWrapper>
            </GameWrapper>
            <ButtonWrapper>
                <GameButton onClick={onVerify}>Verify</GameButton>
                <GameButton onClick={resetGame}>Back</GameButton>
            </ButtonWrapper>
        </>
    )
}

export default Game