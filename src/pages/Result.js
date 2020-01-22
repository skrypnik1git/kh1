import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Result extends Component {
    tryAgain = () => {
        sessionStorage.clear()
    }

    counterOfcorrectAnswers = () => { 
        if (sessionStorage.getItem('answers')) {
            const {correctAnswer} = JSON.parse(sessionStorage.getItem('answers'))
            return `You got ${correctAnswer} correct answer${correctAnswer <= 1 ? '' : 's'}!`
        }
        return `You got 0 correct answers!`
    }

    render() {
        return (
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='row mt-5 questionContainer w-100 mh-200px col-12 col-sm-9 col-md-6 flex-column justify-content-center align-items-center font-weight-bold h3'>
                    {this.counterOfcorrectAnswers()} 
                </div>
                <div>
                    <Link to='/' onClick={this.tryAgain} className='btn btn-success btn-lg border-white mt-5 mb-5'>
                        Try Again
                    </Link>
                </div>
            </div>
        )
    }
}