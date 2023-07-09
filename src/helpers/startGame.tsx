import { Dispatch, SetStateAction } from "react";

interface startGameProps {
    level: number
    widthGrid: number
    setTiles: Dispatch<SetStateAction<string[][]>>
    setWidthGrid: Dispatch<SetStateAction<number>>
    socket: WebSocket
}

const startGame = ({ level, setTiles, setWidthGrid, widthGrid, socket }: startGameProps): void => {
    socket.addEventListener('open', (event) => {
        socket.send(`new ${level}`)
        socket.send('map')
        socket.onmessage = ((event: MessageEvent) => {
            const currentTiles = (event.data || '')
                .split('\n')
                .slice(1, -1)
                .map((line: string) => {
                    if (line.length > widthGrid) {
                        setWidthGrid(line.length)
                    }
                    return line.split('')
                })
            setTiles(currentTiles)
        })
        return () => {
            socket.close();
        };
    });
}

export default startGame