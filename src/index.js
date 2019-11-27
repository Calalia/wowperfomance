import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import apiService from './services/apiservice'


const CharacterForm = () => {
    const [nameState, setNameState] = useState([])
    const [serverState, setServerState] = useState([])
    const [regionState, setRegionState] = useState([])


    const handleSubmit = (event) => {
        console.log(event)
        event.preventDefault();
        apiService.fetchCharacter({
            charaterName: nameState,
            serverName: serverState,
            serverRegion: regionState
        })
    }

    return (
        < form onSubmit={handleSubmit} >
            <label>
                Name:
          <input type="text" value={nameState} onChange={(event) => {setNameState(event.target.value)}} />
            </label>
            <label>
                Server:
          <input type="text" value={serverState} onChange={(event) => {setServerState(event.target.value)}} />
            </label>
            <label>
                Region:
          <input type="text" value={regionState} onChange={(event) => {setRegionState(event.target.value)}} />
            </label>
            <input type="submit" value="Submit" />
        </form >
    )
}

const App = () => {
    const [zones, setZones] = useState([])
    const [selectedZone, selectZone] = useState([])
    const [selectedBoss, selectBoss] = useState([])
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        apiService.getAllZones().then(initialZones => { setZones(initialZones) })
        apiService.getAllCharacters().then(initialchars => { setCharacters(initialchars) })

    }, [])

    const rows = () => {
        return (
            <select onChange={(event) => {
                selectZone(event.currentTarget.value)
            }}>+
            {zones.map(zone => {
                return (<option key={zone.id} value={zone.id} >{zone.name}</option>)
            }
            )}+</select>)
    }
    const rows1 = () => {
        return (
            <select onChange={(event) => {
                selectBoss(event.currentTarget.value)
            }}>+
            {zones.reduce((output,zone) => {
                if (selectedZone === zone.id) {
                    return zone.encounters.map((encounter) => {
                        return (<option key={encounter.bossid} value={encounter.bossid} >{encounter.bossName}</option>)
                    })
                } else return output
            }, [])}
                }+</select>)
    }

    const rows2 = () => {
        characters.map(note =>
            <ul>
                {note.charaterName}
                fights participated: {note.rankings.filter(e => e.bossid === selectedBoss).length}
            </ul>
        )
        
    }

    return (
        <div>
            <h1>Rankings</h1>
            {rows()}
            {rows1()}
            <span />
            {rows2()}
            <CharacterForm/>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root'))