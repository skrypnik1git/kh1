import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import ModalWindow from '../components/ModalWindow.js'
import Select from '../components/Select.js'
import RadioInput from '../components/RadioInput.js'
import Checkbox from '../components/Checkbox.js'
import TextInput from '../components/TextInput.js'
import { questionsList } from '../questionsList.js'
import { getAnswers } from '../helpers'


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
    
    onChange = e => {
        const answers = getAnswers(e, questionsList)
        this.saveToSessionStorage(answers)
    }
    
    onSubmit = e => {
        e.preventDefault()
        const {undoneQuestions} = getAnswers(e, questionsList)
        console.log(undoneQuestions)
        undoneQuestions > 0 ?
        this.setState({isModalOpen: true}) : this.props.history.push('/result');
    }

    saveToSessionStorage = answers => {
        sessionStorage.setItem("answers", JSON.stringify(answers));
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
            <form onSubmit={this.onSubmit} onChange={this.onChange} className='d-flex flex-column justify-content-center align-items-center'>
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
                <button className='btn btn-success btn-lg border-white mt-5 mb-5'>Get Result</button>
            </form>
            <ModalWindow 
            isOpen={this.state.isModalOpen}
            onClose={() => this.showModal(false)}
            />
            </>
    )}
}

export default withRouter(Questions)