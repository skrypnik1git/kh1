import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

const questionsList = [
    {
        type: 'textInput',
        questionText: '1+1?',
        corectAnswer: '2',
        name: 'qstn1'
    },
    {
        type: 'checkbox',
        questionText: '2+2 and 1+1?',
        labels: [1,2,3,4,5],
        corectAnswer: ['2', '4'],
        name: 'qstn2'
    },
    {
        type: 'radio',
        questionText: '3*3?',
        labels: [7,8,9,10],
        corectAnswer: '9',
        name: 'qstn3'
    },
    {
        type: 'select',
        questionText: '5+15?',
        options: [10,20,30,40],
        corectAnswer: '20',
        name: 'qstn4'
    }
]

class Questions extends Component {
    state = {
        isModalOpen: false,
        initialValues: {},
    }

    componentDidMount() {
        const initialValues = JSON.parse(sessionStorage.getItem('answers'));
        if (!initialValues) {
            return false;
        }

        this.setState({ initialValues });
    }


    showModal = isModalOpen => this.setState({ isModalOpen })

    checkAnswersForCheckbox = (userAnswers, correctAnswers) => {
        let countOfCorrectAnswers = 0
        userAnswers.forEach(asnwer => {
            correctAnswers.forEach(correctAnswer => {
                if (asnwer === correctAnswer) {
                    countOfCorrectAnswers++
                }
            })
        })
        
        return countOfCorrectAnswers === correctAnswers.length ? true : false
    }
    
    onChange = e => {
        const answers = this.getAnswers(e)
        this.saveToSessionStorage(answers)
    }
    
    onSubmit = e => {
        e.preventDefault()
        const {undoneQuestions} = this.getAnswers(e)
        console.log(undoneQuestions)
        undoneQuestions > 0 ?
        this.setState({isModalOpen: true}) : this.props.history.push('/result');
    }

    saveToSessionStorage = answers => {
        sessionStorage.setItem("answers", JSON.stringify(answers));
        // sessionStorage.setItem("changed", true);
    }

    getAnswers = e => {
        const answers = {
            correctAnswer: 0,
            uncorrectAnswer: 0,
            undoneQuestions: 0
        };
        
        const chekers = {
            textInput: (field, fieldName, correctAnswer) => {
                answers[fieldName]=field.value
                field.value ?
                field.value === correctAnswer ?
                answers.correctAnswer++ : answers.uncorrectAnswer++
                :
                answers.undoneQuestions++
            },
            checkbox: (fields, fieldName, correctAnswer) => {
                answers[fieldName] = [];
                for (let i = 0; i < fields.length; i++) {
                    if (fields[i].checked) {
                        answers[fieldName].push(fields[i].value)
                    }
                }
                
                answers[fieldName].length ?
                this.checkAnswersForCheckbox(answers[fieldName], correctAnswer) ?
                answers.correctAnswer++ : answers.uncorrectAnswer++
                :
                answers.undoneQuestions++

                answers[fieldName] = answers[fieldName].join(',')
            },
            radio: (fields, fieldName, correctAnswer) => {
                for (let i = 0; i < fields.length; i++) {
                    if (fields[i].checked) {
                        answers[fieldName] = fields[i].value
                        fields[i].value === correctAnswer ?
                        answers.correctAnswer++ : answers.uncorrectAnswer++
                        return
                    }
                }
                answers.undoneQuestions++
            },
            select: (fields, fieldName, correctAnswer) => {
                for (let i = 0; i < fields.length; i++) {
                    if (fields[i].selected && fields[i].value ) {
                        answers[fieldName]= fields[i].value
                        fields[i].value === correctAnswer ?
                        answers.correctAnswer++ : answers.uncorrectAnswer++
                        return
                    }
                }
                answers.undoneQuestions++
            }
        }
        
        questionsList.forEach( question => {
            const { elements } = e.currentTarget;
            const checker = chekers[question.type]
            checker(elements[question.name], question.name, question.corectAnswer)
            }
        )

        return answers;
    }

    render() {
        const questionsMap = {
            textInput: TextInput,
            checkbox: Checkbox,
            radio: RadioInput,
            select: Select
        };

        return (
            <>
            <form onSubmit={this.onSubmit} onChange={this.onChange}>
                { 
                    questionsList.map( (question,idx) => {
                        const TagName = questionsMap[question.type];
                        const { initialValues } = this.state;
                        const initialValue = initialValues[question.name];

                        return <TagName 
                                    {...question} 
                                    initialValue={initialValue} 
                                    key={`${question.type}${idx}`}
                                />
                    })
                }
                <button>Submit</button>
            </form>
            <ModalWindow 
            isOpen={this.state.isModalOpen}
            onClose={() => this.showModal(false)}
            />
            </>
    )}
}

export default withRouter(Questions)

class TextInput extends Component {
    render() {
        const { questionText, name, initialValue } = this.props;

        return (
            <div>
                <p>{questionText}</p>    
                <input
                    type="text"
                    size="30"
                    name={name}
                    defaultValue={initialValue || ''}
                ></input>
            </div>
        )
    }
}

class Checkbox extends Component {
    state = {
        checkedFields: [],
    }

    static getDerivedStateFromProps(props, state) {
        if (props.initialValue && !state.checkedFields.length) {
            const checkedFields = props.initialValue.split(',');
            return { checkedFields };
        }
        return null;
    }

    onChange = e => {
        const { checked, value } = e.currentTarget;
        const { checkedFields } = this.state;
        
        if (!checked) {
            checkedFields.splice(checkedFields.indexOf(value), 1);
        } else {
            checkedFields.push(value)
        }

        this.setState({ checkedFields });
    }

    render() {
        const { questionText, labels, name } = this.props;
        const { checkedFields } = this.state;

        return (
            <div>
                <p>{questionText}</p>
                {labels.map((label, idx) => {
                    const isChecked = checkedFields.includes(String(label))

                    return (
                            <div key={`${name}${idx}`}>
                                <label htmlFor={`answer_${label}`}>{label}</label>
                                <input
                                    type="checkbox"
                                    name={name}
                                    id={`answer:${label}`}
                                    value={label}
                                    checked={isChecked}
                                    onChange={this.onChange}
                                ></input>
                            </div>
                        )
                })}
            </div>
        )
    }
}

class RadioInput extends Component {
    render() {
        const { questionText, labels, name } = this.props;
        // const name = this.props.questionText.replace(/ /g, '')
        // const selectedValue = localStorage.getItem(name);
        return (
            <div>
                <p>{questionText}</p>
                {labels.map( (label,idx) => {
                    // const isChecked = Number(selectedValue) === label
                    return (
                        <div key={`${name}${idx}`}>
                            <label htmlFor={`answer_${label}`}>{label}</label>
                            <input 
                                type="radio" 
                                value={label} 
                                name={name} 
                                id={`answer_${label}`}
                                // checked={isChecked}
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
        const { questionText, options, name } = this.props;
        return (
            <div>
                <p>{questionText}</p>
                <select name={name} defaultValue={''}>
                    <option key={`${name}_placeholder`} value='' disabled >Choose your answer</option>
                    {options.map( (option,idx) => {
                       return <option key={`${name}${idx}`} value={option}>{option} </option>
                    })}
                </select>
            </div>
        )
    }
}
class ModalWindow extends Component {

    render() {
        const { isOpen, onClose } = this.props;
        return isOpen ? (
                <div>
                    <div className="cover-div">
                    </div>
                    <div className="confirmation">
                        <div className="text-for-cover">
                            Delete this Task?
                        </div>
                        <div className="cover-btns">
                            <Link className="btn blue-btn" to='/result'>
                                Ok
                            </Link >
                            <input type="button" value="Cancel" className="btn blue-red" onClick={onClose}>
                            </input>
                        </div>
                    </div>
                </div>
            ) : null
    }
}