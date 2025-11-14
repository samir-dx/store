import React, { useEffect, useRef, useState } from 'react'

const getAnalog = (d, total=2) => String(Math.floor(d)).padStart(total,'0')
const formatTime = (ms) => {
    let secs =getAnalog((ms/1000)%60);
    let mins= Math.floor((ms/(1000*60))%60);
    let hrs= Math.floor((ms/(1000*60 * 60))%24);
    let formattedMs = getAnalog((ms/10)%100);
    console.log(mins,ms,  'mins??')
    let formattedStr = "";

    if(hrs) {
        formattedStr+= `${getAnalog(hrs)} : `;
    }

    return `${formattedStr}${getAnalog(mins)} : ${secs} : ${formattedMs}`
}


const Stopwatch = () => {
    const [isPaused, setIsPaused] = useState(true);
    const [timePassed, setTimePassed] = useState(0);
    const [recordList, setRecordList] = useState([])

    const intervalRef = useRef(null);


    const handleReset = () => {
        setIsPaused(true);
        setTimePassed(0);
        setRecordList([])
        clearInterval(intervalRef.current)
    }

    const handleRecord = ()=> {
        setRecordList(prev => {
            const lastObj = prev[prev.length - 1] || {time: timePassed}
            const newObj = {time: timePassed, diff: timePassed - lastObj.time};

            return [...prev, newObj]
        })
    }

    useEffect(() => {
        if(!isPaused) {
            intervalRef.current = setInterval(() => {
                setTimePassed(prev => prev + 10)
            }, 10)
        }

        return () => {
            clearInterval(intervalRef.current);
        }
    }, [isPaused])

    
    return (
        <div style={{maxWidth: '600px', margin: '12px auto'}}>
            <h1 style={{fontFamily: 'monospace'}}>{formatTime(timePassed)}</h1>
            <button onClick={() => setIsPaused(prev => !prev)}>{isPaused? 'Play' : "Pause"}</button>
            {!isPaused && <button onClick={handleRecord}>Record</button>}
            <button onClick={handleReset}>Reset</button>
            {recordList.length > 0 && <table style={{margin: '12px auto'}}>
                    <thead>
                        <tr><th>Sr No</th>
                        <th>Diff</th>
                        <th>Total time</th></tr>
                    </thead>
                    <tbody>
                        {recordList.toReversed().map(({time, diff}, idx) => {
                            return <tr style={{background: (recordList.length-idx) % 2 ? 'white': '#d3d3d3'}}>
                                <td>{getAnalog(recordList.length - idx)}</td>
                                <td>+{formatTime(diff)}</td>
                                <td>{formatTime(time)}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Stopwatch