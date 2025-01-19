import React, {useRef, useState} from "react";
import {useLanguage} from "../hooks/hooks";
import {useSettings} from "../settings";
import {useNavigate} from "react-router-dom";
import {LanguageToggle} from "./LanguageToggle";

export function InitScreen() {
    console.log('render InitScreen')
    const [settings, saveSettings] = useSettings()
    const [formState, setFormState] = useState(settings)
    const language = useLanguage(settings.language)

    let navigate = useNavigate();

    const formRef = useRef(null);

    const extractForm = (form: HTMLFormElement) => {
        const player1Name = form.player1Name.value
        const player2Name = form.player2Name.value
        const raceTo = form.raceTo.value

        return {
            player1Name,
            player2Name,
            raceTo,
        }
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!formRef.current) {
            return
        }
        const newSettings = {...settings, ...extractForm(formRef.current)}
        setFormState(newSettings)
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const newSettings = extractForm(form)
        saveSettings({...settings, ...newSettings})
        localStorage.removeItem("score")
        navigate('/pool')
    }

    return (
        <div>
            <div className={"header"}>
                <h1>
                    {language.settings}
                </h1>
            </div>
            <form ref={formRef} onSubmit={onSubmitHandler}>

                <label> {language.player1Name} </label>
                <input onChange={onChangeHandler} type="text" value={formState.player1Name}
                       name="player1Name" required/>

                <label> {language.player2Name} </label>
                <input onChange={onChangeHandler} type="text" value={formState.player2Name}
                       name="player2Name" required/>

                <label> {language.raceTo} </label>
                <input onChange={onChangeHandler} type="number" min={1} max={100} value={formState.raceTo}
                       name="raceTo"/>

                <div className="start-game">
                    <input className="button" type="submit" value={language.go}/>
                </div>
            </form>

            <LanguageToggle settings={settings} saveSettings={saveSettings}/>
        </div>
    )
}