import './App.scss';
import { useEffect, useState } from 'react';
import { Add, Close } from './Icons';
import { Format } from './dates';

function App() {
    const [array, setArray] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("plants"))) {
            setArray(JSON.parse(localStorage.getItem("plants")));
        }
    }, [])

    const newDate = (e) => {
        array.find(a => a.Id === parseInt(e.target.value)).Date = new Date();
        setArray(s => {
            return [...s]
        })
        localStorage.setItem("plants", JSON.stringify(array));
    }

    const deleteRow = (id) => {
        let trackingArray = array;
        trackingArray = trackingArray.filter(a => a.Id !== id);
        localStorage.setItem("plants", JSON.stringify(trackingArray));
        setArray(trackingArray);
    }

    const toPlantRow = (a) => {
        let daysPassed = a.Date ? Math.floor((new Date().getTime() - new Date(a.Date).getTime()) / 86400000) : -1;
        let daysPassedDisplay = daysPassed === 1 ? <span className='days'>{daysPassed} day passed</span> : daysPassed === 0 || daysPassed > 1 ? <span className='days'>{daysPassed} days passed</span> : <></>;
        let style = daysPassed >= 9 ? { backgroundColor: "#570000" } : daysPassed >= 7 ? { backgroundColor: "red" } : daysPassed >= 5 ? { backgroundColor: "orange" } : daysPassed >= 0 ? { backgroundColor: "green" } : { "backgroundColor": "grey" };

        return (
            <div key={a.Id} style={style} className='row'>
                <h3>{a.Name}</h3>
                <div className='submit-container'><button value={a.Id} onClick={newDate}>Watered</button></div>
                <div className='delete-container' onClick={() => deleteRow(a.Id)}><Close /></div>
                <div><span>{daysPassedDisplay}</span></div>
            </div>
        )
    }

    const toOtherRow = (a) => {
        return (
            <div key={a.Id} style={{ "backgroundColor": "grey" }} className='row'>
                <h3>{a.Name}</h3>
                <div className='submit-container'><button value={a.Id} onClick={newDate}>Update</button>                    </div>
                <div className='delete-container' onClick={() => deleteRow(a.Id)}><Close /></div>
                <div><span>{a.Date ? Format(a.Date).dateTime : ""}</span></div>
            </div>
        )
    }

    const plantArrayShow = array.filter(a => a.Type === "plant" || !a.Type).map(a => toPlantRow(a));
    const otherArrayShow = array.filter(a => a.Type === "other").map(a => toOtherRow(a));

    function Modal() {
        const [plantName, setTrackerName] = useState("");
        const [trackerType, setTrackerType] = useState("plant");

        const addTracker = () => {
            array.push({
                Id: array.length,
                Name: plantName,
                Type: trackerType
            })
            setArray(a => {
                return [...a]
            })

            localStorage.setItem("plants", JSON.stringify(array));
            setShowModal(false);
        }

        return (
            <div className='modal'>
                <div className='modal-main'>
                    <div className='button-container button-container-exit' onClick={() => setShowModal(false)}>
                        <Close />
                    </div>
                    <h2>Add a tracker</h2>
                    <div className='inputs-container'>
                        <div className='radio-container' onChange={(e) => setTrackerType(e.target.value)}>
                            <label className='radio-label'>
                                Plant
                                <input type="radio" value="plant" name='type' defaultChecked />
                            </label>
                            <label className='radio-label'>
                                Other
                                <input type="radio" value="other" name='type' />
                            </label>
                        </div>
                        <label>
                            Name:
                            <br />
                            <input type='text' onChange={(e) => setTrackerName(e.target.value)} />
                        </label>
                        <div className='button-container'>
                            <button onClick={addTracker}>Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const modal = showModal ? <Modal /> : <></>;

    return (
        <div className='App'>
            <div className="homepage content">
                <div className='header-container'>
                    <h1>Tracker</h1>
                    <div onClick={() => setShowModal(true)}>
                        <Add />
                    </div>
                </div>
                {modal}
                <div className='array-container'>
                    {plantArrayShow.length > 0 ? <h2>Plants</h2> : <></>}
                    {plantArrayShow}
                    {otherArrayShow.length > 0 ? <h2>Other</h2> : <></>}
                    {otherArrayShow}
                </div>
            </div>
        </div>
    )
}

export default App;
