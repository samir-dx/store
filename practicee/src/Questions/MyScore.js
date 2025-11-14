import React from 'react'
import './index.css'
const MyScore = ({questions, answers, onReset}) => {

    const score = questions.reduce((acc, {correct_answer}, idx) => {
        return acc + (answers?.[idx] === correct_answer);
    }, 0)
    console.log(questions,answers, score, 'questions???')

  return (
    <div className='flex-container'>
        <p>You scored</p>
        <div className='score-card'>
            <h1 style={{margin: '0', lineHeight: '1', fontSize: '56px'}}>
                {score}
            </h1>
            <h4 style={{marginBottom: '8px', lineHeight: '1'}}>out of {' '} <span style={{fontSize: '30px'}}>{questions.length}</span></h4>
        </div>
        <button onClick={onReset}>Try Again</button>
    </div>
  )
}

export default MyScore