import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [array, setArray] = useState([]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("plants"))) {
            setArray(JSON.parse(localStorage.getItem("plants")));
        }
    }, [])

    const toRow = (a) => {
        let daysPassed = Math.floor((new Date().getTime() - new Date(a.Date).getTime()) / 86400000);

        let daysPassedDisplay = daysPassed > 0 ? daysPassed === 1 ? <span>{daysPassed} day passed</span> : <span>{daysPassed} days passed</span> : <></>;
        let style = daysPassed >= 9 ? {backgroundColor: "#570000"} : daysPassed >= 7 ? {backgroundColor: "red"} : daysPassed >= 5 ? {backgroundColor: "orange"} : {};

        const newDate = (e) => {
            array.find(a => a.Id === parseInt(e.target.value)).Date = new Date();
            setArray(s => {
                return [...s]
            })
            localStorage.setItem("plants", JSON.stringify(array));
        }

        return (
            <div key={a.Id} style={style}>
                <span>{a.Name}</span>
                {daysPassedDisplay}
                <button value={a.Id} onClick={newDate}>Watered</button>
            </div>
        )
    }

    const arrayShow = array.map(a => toRow(a));

    const addPlant = () => {
        array.push({
            Id: array.length,
            Name: "Test plant"
        })
        setArray(a => {
            return [...a]
        })

        localStorage.setItem("plants", JSON.stringify(array));
    }

    return (
        <div className='App'>
            <div className="homepage content">
                <h1>Plant tracker</h1>
                <div>
                    <button onClick={addPlant}>Add</button>
                </div>
                {arrayShow}

            </div>
        </div>
    )
}

export default App;
