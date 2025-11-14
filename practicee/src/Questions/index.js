import React, { act, useEffect, useState } from 'react'
import ActiveQuestion from './ActiveQuestion';
import response from './resp.json'
import MyScore from './MyScore';


const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleReset = () => {
        setAnswers({})
        setIsSubmitted(false)
        setActiveIdx(0)
    }

    const onNext = () => {
        setActiveIdx(prev => prev + 1);
    }

    const onPrev = () => {
        setActiveIdx(prev => prev - 1);
    }

    const onOptionSelect = (ans) => {
        setAnswers(prev => ({...prev, [activeIdx]: ans}))

    }

    const onSubmit=() => {
        setIsSubmitted(true)
    }
 

    useEffect(() => {
        setQuestions(response.results)
        setLoading(false)
        setError(null)
    }, [])

    if(error || !questions.length) {
        <div>Something went wrong</div>
    }
    if(loading) {
        <div>Loading....</div>
    }

    return (
        <div style={{maxWidth: '600px', margin: '16px auto'}}>
            <div style={{display:'flex',gap: '16px', justifyContent: 'space-between', alignItems:'center'}}>
                <h3>Voting</h3>
                <p>{`Solved ${Object.keys(answers).length}/${questions?.length}`}</p>
            </div>
            {isSubmitted 
            ? <MyScore onReset={handleReset} answers={answers} questions={questions}/> 
            : <ActiveQuestion 
                activeIdx={activeIdx} 
                data={questions[activeIdx]}
                onNext={onNext}
                onPrev={onPrev}
                onSubmit={onSubmit}
                onOptionSelect={onOptionSelect}
                totalQuestions={questions.length}
                answers={answers}
            />}
        </div>
    )
}

export default Questions