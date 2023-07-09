import React, { RefObject } from 'react'
interface drawCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement>,
    height: number,
    width: number,
    tiles: string[][],
    titleSize: number
}

const drawCanvas = ({canvasRef, height, width, tiles, titleSize }: drawCanvasProps): void => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
        ctx.clearRect(0, 0, height, width);
        for (let i = 0; i < tiles.length; i++) {
            for (let j = 0; j < tiles[i].length; j++) {
                if (tiles[i][j]) {
                    ctx.strokeText(
                        tiles[i][j],
                        j * titleSize + titleSize / 2,
                        i * titleSize + titleSize / 2
                    );
                }
            }
        }
    }
};

export default drawCanvas