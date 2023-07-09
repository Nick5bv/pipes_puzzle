interface setTileValueProps {
    x: number
    y: number
    setTiles: (tiles: string[][]) => void
    socket: WebSocket
    titleSize: number
}

const setTileValue = ({ x, y, setTiles, socket, titleSize }: setTileValueProps): void  => {
    const currentX: number = Math.floor(x / titleSize)
    const currentY: number = Math.floor(y / titleSize)
    if (socket.readyState !== socket.OPEN) {
        return
    }
    socket.send(`rotate ${currentX} ${currentY}`)
    socket.send('map')
    socket.onmessage = ((event: MessageEvent) => {
        const currentTiles = (event.data || '')
            .split('\n')
            .slice(1, -1)
            .map((line: string) => {
                return line.split('')
            })
        setTiles(currentTiles)
    })
}

export default setTileValue