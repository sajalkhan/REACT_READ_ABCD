import React, { useState, useEffect } from 'react';
import alphabets from '../DB/alphabets.json';

const EasyAbcComponent = () => {

    const [state, setState] = useState(
        {
            alphabets: alphabets,
            currentPosition: 0,
            numbersOfClick: 0,
            random: false,
            sound: false
        }
    )

    useEffect(() => {
        let letterSound = document.querySelector(`audio[data-key="letter"]`);
        if (state.numbersOfClick === 0 && !state.sound) {
            letterSound.currentTime = 0;
            letterSound.play();
        }

    }, [state.numbersOfClick, state.currentPosition, state.sound]);

    const switchSound = ()=>{
        setState({ currentPosition: state.currentPosition, numbersOfClick: state.numbersOfClick, random: state.random,sound: !state.sound });
    }

    const switchRandom = () => {
        setState({ currentPosition: state.currentPosition, numbersOfClick: state.numbersOfClick, random: !state.random,sound: state.sound });
    }
    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const playSound = () => {
        let wordSound = document.querySelector(`audio[data-key="word"]`);
        wordSound.currentTime = 0;
        if(!state.sound) wordSound.play();
    }

    const next = () => {

        if (state.random) {
            if (state.numbersOfClick < 2) {
                setState({ currentPosition: state.currentPosition, numbersOfClick: state.numbersOfClick + 1, random: state.random,sound:state.sound })
            }
            else {
                setState({ currentPosition: generateRandomNumber(0, 25), numbersOfClick: 0, random: state.random,sound:state.sound })
            }
        }
        else {
            if (state.numbersOfClick < 2) {
                setState({ currentPosition: state.currentPosition, numbersOfClick: state.numbersOfClick + 1, random: state.random,sound:state.sound })
            }
            else {
                (state.currentPosition < 25) ? setState({ currentPosition: state.currentPosition + 1, numbersOfClick: 0, random: state.random,sound:state.sound }) : setState({ currentPosition: 0, numbersOfClick: 0, random: state.random,sound:state.sound })
            }
        }
        playSound();
    }

    const previous = () => {
        (state.currentPosition > 0) ? setState({ currentPosition: state.currentPosition - 1, numbersOfClick: 0, random: state.random }) : setState({ currentPosition: 25, numbersOfClick: 0, random: state.random,sound:state.sound })
    }

    let showImg = state.numbersOfClick !== 0 ? true : false;
    let showWord = state.numbersOfClick === 2 ? true : false;

    return (
        <div className="game">
            
            <span className="random-label">Random Letters:</span>
            <label className="switch">
                <input type="checkbox" onClick={() => switchRandom()} defaultValue="false" checked={state.random} />
                <div className="slider round"></div>
            </label>

            <span className="random-label">Sound Off:</span>
            <label className="switch">
                <input type="checkbox" onClick={() => switchSound()} defaultValue="false" checked={state.sound} />
                <div className="slider round"></div>
            </label>
            
            <div className="option">
                <div className="fields">
                    <div className="field-block">
                        {alphabets[state.currentPosition].letter}
                    </div>
                    <audio src={alphabets[state.currentPosition].letterSound} data-key="letter" />
                </div>

                <div className="buttons">
                    {state.random ? <button className="button prev" disabled style={{ cursor: "not-allowed",backgroundColor:"#81a683" }}> Previous</button> : <button className="button prev" onClick={() => previous()} > Previous</button>}
                    <button className="button sound" onClick={() => playSound()}> Play Sound Again</button>
                    <button className="button next" onClick={() => next()}> Next</button>
                </div>

                <div className="fields">
                    <div className="field-block">
                        <div className="left-field">
                            {!showImg ? <div className="placeholder-span">Click next to view image</div> :
                                <img src={alphabets[state.currentPosition].image} className="letter-image" alt={alphabets[state.currentPosition].word} />}
                            <audio src={alphabets[state.currentPosition].wordSound} data-key="word" />
                        </div>
                        <div className="right-field">
                            {!showWord ? <div className="placeholder-span">Click next to view Spelling</div> : <div className="word">{alphabets[state.currentPosition].word.toUpperCase()}</div>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EasyAbcComponent;