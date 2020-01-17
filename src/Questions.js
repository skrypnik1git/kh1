import React, {Component} from 'react';

const questionsList = [
    {
        type: 'textInput',
        questionText: '1+1?',
        corectAnswer: '2'
    },
    {
        type: 'checkbox',
        questionText: '2+2 and 1+1?',
        labels: [1,2,3,4,5],
        corectAnswer: '2'
    },
    {
        type: 'radio',
        questionText: '3*3?',
        labels: [7,8,9,10],
        corectAnswer: '9'
    },
    {
        type: 'select',
        questionText: '5+15?',
        options: [10,20,30,40],
        corectAnswer: '20'
    }
]

// const result = {
//     correct: 0,
//     uncorrect: 0
// }

export default class Questions extends Component {
    onSubmit = e => {
        // e.preventDefault();
        for (let i = 0; i < e.currentTarget.elements['huy'].length; i++) {
            if (e.currentTarget.elements['huy'][i].checked) {
                console.log(e.currentTarget.elements['huy'][i].value)
            }
        }
    }
    render() {
        console.log(111)
        return (
            <form onSubmit={this.onSubmit} onChange={this.onSubmit}>
           { questionsList.map( question => {
               console.log(question)
                switch(question.type) {
                    case 'textInput':
                        return <TextInput questionText={question.questionText}/>;
                        break;
                    case 'checkbox':
                        return <Checkbox questionText={question.questionText} labels={question.labels}/>;
                        break;
                    case 'radio':
                        return <RadioInput questionText={question.questionText} labels={question.labels}/>;
                        break;
                    case 'select':
                        return <Select questionText={question.questionText} options={question.options}/>;
                        break; 
                }
            })
            }
            <button>Submit</button>
            </form>
    )}
}

class TextInput extends Component {
    render() {
        return (
            <div>
                <p>{this.props.questionText}</p>    
                <input type="text" size="30"></input>
            </div>
        )
    }
}

class Checkbox extends Component {
    render() {
        return (
            <div>
                <p>{this.props.questionText}</p>
                {this.props.labels.map( label => {
                    return <input type="checkbox" name={'huy'} id={`answer:${label}`} value={label}></input>
                })}
            </div>
        )
    }
}

class RadioInput extends Component {
    render() {
        const name = this.props.questionText.replace(/ /g, '')
        const selectedValue = localStorage.getItem(name);
        
        return (
            <div style={{ display: 'flex' }}>
                <p>{this.props.questionText}</p>
                {this.props.labels.map( label => {
                    const isChecked = Number(selectedValue) === label

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor={`answer_${label}`}>{label}</label>
                            <input 
                                type="radio" 
                                value={label} 
                                name={name} 
                                id={`answer_${label}`}
                                checked={isChecked}
                            ></input>
                        </div>
                    )
                })}
            </div>
        )
    }
}

class Select extends Component {
    render() {
        return (
            <div>
                <p>{this.props.questionText}</p>
                <select>
                    {this.props.options.map( option => {
                       return <option value={option}>{option}</option>
                    })}
                </select>
            </div>
        )
    }
}