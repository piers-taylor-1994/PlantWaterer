import './App.scss';
import { useEffect, useState } from 'react';
import { Add, Close } from './Icons';

function App() {
    const [array, setArray] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("plants"))) {
            setArray(JSON.parse(localStorage.getItem("plants")));
        }
    }, [])

    const toRow = (a) => {
        let daysPassed = Math.floor((new Date().getTime() - new Date(a.Date).getTime()) / 86400000);

        let daysPassedDisplay = daysPassed === 1 ? <span className='days'>{daysPassed} day passed</span> : daysPassed === 0 || daysPassed > 1 ? <span className='days'>{daysPassed} days passed</span> : <></>;
        let style = daysPassed >= 9 ? { backgroundColor: "#570000" } : daysPassed >= 7 ? { backgroundColor: "red" } : daysPassed >= 5 ? { backgroundColor: "orange" } : daysPassed >= 0 ? { backgroundColor: "green" } : {};
        let nameStyle = !daysPassed && daysPassed !== 0 ? { gridRow: "1/3" } : {};

        const newDate = (e) => {
            array.find(a => a.Id === parseInt(e.target.value)).Date = new Date();
            setArray(s => {
                return [...s]
            })
            localStorage.setItem("plants", JSON.stringify(array));
        }

        return (
            <div key={a.Id} style={style} className='row'>
                <span style={nameStyle}>{a.Name}</span>
                {daysPassedDisplay}
                <button value={a.Id} onClick={newDate}>Watered</button>
            </div>
        )
    }

    const arrayShow = array.map(a => toRow(a));

    function Modal() {
        const [plantName, setPlantName] = useState("");

        const addPlant = () => {
            array.push({
                Id: array.length,
                Name: plantName
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
                    <h2>Add plant</h2>
                    <label>
                        Name:
                        <br />
                        <input type='text' onChange={(e) => setPlantName(e.target.value)} />
                    </label>
                    <div className='button-container'>
                        <button onClick={addPlant}>Submit</button>
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
                    <h1>Plant tracker</h1>
                    <div onClick={() => setShowModal(true)}>
                        <Add />
                    </div>
                </div>
                {modal}
                <div className='array-container'>
                    {arrayShow}
                </div>
            </div>
        </div>
    )
}

export default App;
