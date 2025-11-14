import React, { useMemo } from 'react'
import './index.css'


const shuffle = (arr) => {
	return arr.toSorted((a, b) => 0.5 - Math.random())
}

const ActiveQuestion = ({
    activeIdx,
    totalQuestions,
    data,
    onNext,
    onPrev,
    onSubmit,
    onOptionSelect,
	answers
}) => {

    const isFirst=!activeIdx;
    const isLast=activeIdx === totalQuestions - 1;
	const {question, correct_answer, incorrect_answers=[]} = data || {};

	const allOptions = useMemo(() => {
		return shuffle([correct_answer, ...incorrect_answers])
	}, [correct_answer, incorrect_answers]);

	return (
		<div className='question-ctr'>
			<div className='question-heading'>
				<p>{`Question ${activeIdx + 1} of ${totalQuestions}`}</p>
				<div className='btn-ctr'>
					{!isFirst && <button onClick={onPrev}>Prev</button>}
					{isLast 
					? <button onClick={onSubmit}>Submit</button> 
					: <button onClick={onNext}>Next</button>}
				</div>
			</div>
			<div style={{textAlign: 'left'}}>
				<h4>{question}</h4>
				<ul className='option-ctr'>
					{allOptions.map((opt) => {
						return <li style={{textAlign: 'left'}}>
							<input checked={answers?.[activeIdx] === opt} onChange={(e) => {
								const isChecked = e.target.checked;
								if(isChecked) {
									onOptionSelect(opt)
								}
							}} name={`${activeIdx}-radio`} type='radio' id={`${activeIdx}-${opt}`}/>
							<label htmlFor={`${activeIdx}-${opt}`} >{opt}</label>
							</li>
					})}
				</ul>
			</div>
		</div>
	)
}

export default ActiveQuestion