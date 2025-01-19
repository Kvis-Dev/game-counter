import {loadSettings} from "../settings";
import React, {useEffect, useState} from "react";
import {isThisTouchDevice} from "../helpers";
import {useEventListener, useLanguage} from "../hooks/hooks";
import {useSwipeable} from "react-swipeable";
import {PlayerInfo} from "./PlayerInfo";

export function Game() {
    const settings = loadSettings()
    const language = useLanguage(settings.language)

    const restoredScore = localStorage.getItem("score")

    const defaultPlayersState = [{
        'name': settings.player1Name,
        'score': 0,
    }, {
        'name': settings.player2Name,
        'score': 0,
    }]

    if (restoredScore) {
        const [score1, score2] = restoredScore.split(",")
        defaultPlayersState[0].score = parseInt(score1)
        defaultPlayersState[1].score = parseInt(score2)
    }

    const [player, setPlayer] = useState(0)
    const [players, setPlayers] = useState(defaultPlayersState)

    const rememberScore = (players: (typeof defaultPlayersState)) => {
        localStorage.setItem("score", [players[0].score, players[1].score].join(","));
    }

    useEffect(() => {
        rememberScore(players)
    }, [players[0].score, players[1].score])

    const isTouchDevice = isThisTouchDevice()

    const nextPlayerAction = () => {
        setPlayer((player) => {
            return player === 0 ? 1 : 0
        })
    }

    const arrowUpAction = (playerNum:number) => {
        setPlayers((players) => {
            players[playerNum].score++
            return [...players]
        })
    }

    const arrowDownAction = (playerNum:number) => {
        setPlayers((players) => {
                players[playerNum].score--
                return [...players]
            }
        )
    }

    useEventListener('keydown', (event) => {
        event.stopPropagation()
        event.preventDefault()

        let key = (event as KeyboardEvent).code

        switch (key) {
            case 'KeyN':
                nextPlayerAction()
                break

            case 'ArrowRight':
            case 'ArrowLeft':
                nextPlayerAction()
                break
            case 'ArrowUp':
                arrowUpAction(player)
                break
            case 'ArrowDown':
                arrowDownAction(player)
                break
        }
    });

    let rootComponentSelectors = ['html', 'body', '#root']
    useEffect(() => {
        for (let rootComponentSelector of rootComponentSelectors) {
            const item = document.querySelector(rootComponentSelector) as HTMLElement
            if (item) {
                item.style.overflow = "hidden";
            }
        }
        return () => {
            for (let rootComponentSelector of rootComponentSelectors) {
                const item = document.querySelector(rootComponentSelector) as HTMLElement
                if (item) {
                    item.style.overflow = "auto"
                }
            }
        }
    })

    const onSwipe = (eventData:any, playerNum:number) => {
        if (eventData.dir === 'Left' || eventData.dir === 'Right') {
            nextPlayerAction()
        }
        if (eventData.dir === 'Up') {
            arrowUpAction(playerNum)
        }
        if (eventData.dir === 'Down') {
            arrowDownAction(playerNum)
        }
    }

    const swipeHandlers0 = useSwipeable({
        onSwiped: (eventData) => {
            onSwipe(eventData, 0)
        }
    });

     const swipeHandlers1 = useSwipeable({
        onSwiped: (eventData) => {
            onSwipe(eventData, 1)
        }
    });

    return (
        <div className="info-display" onClick={() => {
        }}>
            <div className="players">
                <div className={'back-btn'}>
                    &lt;
                </div>
                <div {...swipeHandlers0} onClick={() => {
                    arrowUpAction(0)
                }} className={'player player1'}>
                    <PlayerInfo player={players[0]} active={!isTouchDevice && player === 0}/>
                </div>
                <div className="race-to-info">{language.raceToNum.replace('{raceTo}', settings.raceTo.toString())}</div>
                <div {...swipeHandlers1} onClick={() => {
                    arrowUpAction(1)
                }} className="player player2">
                    <PlayerInfo player={players[1]} active={!isTouchDevice && player === 1}/>
                </div>
            </div>
        </div>
    )
}