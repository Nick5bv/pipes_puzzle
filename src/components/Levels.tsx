import React from "react";
import Level from "./Level";
import styled from "styled-components";

const LevelsWrapper = styled.section`
    display: flex;
    justify-content: center;
`

interface LevelsProps {
    availableLevels: number
    setActiveLevel: (level: number) => void
}

const Levels: React.FC<LevelsProps> = ({ availableLevels, setActiveLevel }: LevelsProps) => {
    const emptyLevelsArray = Array.from({ length: availableLevels })

    return (
        <LevelsWrapper>
            {
                emptyLevelsArray.map((item, index) => (
                    <Level
                        key={index}
                        level={index + 1}
                        onClick={setActiveLevel}
                    />
                ))
            }
        </LevelsWrapper>
    )
}

export default Levels