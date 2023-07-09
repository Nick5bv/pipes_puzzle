import React from "react";
import styled from "styled-components";

const LevelButton = styled.button`
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
    background-color: #ffffff;
    color: #2bb673;
      &:hover {
        background-color: #2bb673;
        color: #ffffff;
      }
`

interface LevelProps {
    onClick: (level: number) => void
    level: number
}

const Level: React.FC<LevelProps> = ({ onClick, level }: LevelProps) => {
    return (
        <LevelButton onClick={() => onClick(level)}>{ `level ${level}` }</LevelButton>
    )
}

export default Level