import {Settings} from "../settings";
import {isThisTouchDevice} from "../helpers";
import {Link} from "react-router-dom";
import React from "react";
import {useLanguage} from "../hooks/hooks";

export function Legend(props: {
    settings: Settings,
}) {
    const {settings} = props
    const isTouchDevice = isThisTouchDevice()
    const language = useLanguage(settings.language)

    return <div className="legend">
        <span><Link className={"button"} to={"/"}>{language.backBtn}</Link></span>
        {
            isTouchDevice ? (
                <>
                    <span>
                        <button className="button"
                                >
                            {language.firstShotBtn.replace("{firstTimeForShot}", settings.firstTimeForShot.toString())}
                        </button>
                    </span>
                    <span><button className="button" >{language.endOfRack}</button></span>
                    <span>Tap - { }</span>
                    <span>{language.nextSwipe}</span>
                    <span>{language.tapExtension} </span>
                </>) : (<>
                <span>{language.nextPlayer}</span>
                <span>{language.extension}</span>
                <span>Space - { }</span>
                <span>
                    1 - {language.firstShotBtn.replace("{firstTimeForShot}", settings.firstTimeForShot.toString())}
                </span>
                <span>
                    2 - {language.timeForShotLegend.replace("{timeForShot}", settings.timeForShot.toString())}
                </span>
                <span>{language.endOfRackKey}</span>
            </>)}
    </div>;
}