import React, {useState} from 'react';
import Levels from './components/Levels';
import Game from './components/Game';
import { AVAILABLE_LEVELS, SOCKET_URL } from './constants';
import styled from "styled-components";

const AppWrapper = styled.section`
      background: linear-gradient(297.5deg,#0e3554 10.17%,#0a2942 94.99%);
      min-height: 100vh;
`

const App: React.FC = () => {
    const [activeLevel, setActiveLevel] = useState<number | null>(null)
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null)

    const onLevelClick = (level: number) => {
        setWebSocket(new WebSocket(SOCKET_URL))
        setActiveLevel(level)
    }

    return (
        <AppWrapper>
            {
                activeLevel && webSocket ? <Game
                    level={activeLevel}
                    socket={webSocket}
                    setActiveLevel={setActiveLevel}
                /> : <Levels
                    setActiveLevel={onLevelClick}
                    availableLevels={AVAILABLE_LEVELS}
                />
            }
        </AppWrapper>
    );
}

export default App;
