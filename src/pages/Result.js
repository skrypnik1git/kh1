import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Result extends Component {
    tryAgain = () => {
        sessionStorage.clear()
    }

    counterOfcorrectAnswers = () => { 
        if (sessionStorage.getItem('answers')) {
            const {correctAnswer} = JSON.parse(sessionStorage.getItem('answers'))
            return `You got ${correctAnswer} correct answer${correctAnswer <= 1 ? '' : 's'}`
        }
        return `You got 0 correct answers`
    }

    render() {
        return (
            <div>
                <div>
                    {this.counterOfcorrectAnswers()} 
                </div>
                <div>
                    <Link to='/' onClick={this.tryAgain}>
                        Try Again
                    </Link>
                </div>
            </div>
        )
    }
}