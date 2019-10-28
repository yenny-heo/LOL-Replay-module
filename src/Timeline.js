import React from 'react';
import './Timeline.css'
import { identifier } from '@babel/types';

class Timeline extends React.Component {


    _loadTimeline = () => {
        const { timeline, time, party } = this.props;
        const timelinelist = timeline.slice(0).reverse().map((data, i) => {
            return data.map((t, j) => {
                if (time < 99 - i) return null;
                if (t.type === "BUILDING_KILL") {
                    if (t.team === 200) {//RED TEAM
                        if (time === 99 - i)
                            return <div key={j} className="New">{99 - i}분:
                            <img src="./red_turret.png" alt="redTurret"></img> Red Turret Destoyed!</div>
                        else return <div key={j} className="Old">{99 - i}분:
                        <img src="./red_turret.png" alt="redTurret"></img> Red Turret Destoyed!</div>
                    }
                    else {//BLUE TEAM
                        if (time === 99 - i)
                            return <div key={j} className="New">{99 - i}분:
                            <img src="./blue_turret.png" alt="blueTurret"></img> Blue Turret Destoyed!</div>
                        else return <div key={j} className="Old">{99 - i}분:
                        <img src="./blue_turret.png" alt="blueTurret"></img> Blue Turret Destoyed!</div>
                    }
                }
                else if (t.type === "CHAMPION_KILL") {
                    let killerChamp = party.participants[t.killer - 1].championId;
                    let victimChamp = party.participants[t.victim - 1].championId;
                    let killerSrc = `./icon/${killerChamp}.png`
                    let victimSrc = `./icon/${victimChamp}.png`
                    let killerClass, victimClass;
                    if (t.killer <= 5) {
                        killerClass = "BlueTeam"; victimClass = "RedTeam";
                    }
                    else {
                        killerClass = "RedTeam"; victimClass = "BlueTeam";
                    }
                    if (time === 99 - i)
                        return <div key={j} className="New">{99 - i}분:
                        <img src={killerSrc} alt="killer" className={killerClass}></img>
                            Killed
                        <img src={victimSrc} alt="victim" className={victimClass}></img>
                        </div>
                    else return <div key={j} className="Old">{99 - i}분:
                    <img src={killerSrc} alt="killer" className={killerClass}></img>
                        Killed
                    <img src={victimSrc} alt="victim" className={victimClass}></img>
                    </div>
                }
            })
        })
        return timelinelist;

    }
    _victory = () => {
        const { party } = this.props;
        const win = party.teams;
        if (win[0].win === "Win") {
            return <div className="New">🔵 Blue Team WIN!</div>
        } else {
            return <div className="New">🔴 Red Team WIN!</div>
        }

    }


    render() {
        return (
            <div className="Container2">
                <div className="TimelineTitle">T I M E L I N E</div>
                <div className="Timeline">
                    {(this.props.time === this.props.gamelength) ? this._victory() : null}
                    {this._loadTimeline()}
                </div>
            </div>
        )
    }
}
export default Timeline;