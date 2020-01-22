import React, {Component} from 'react';

export default class TextInput extends Component {
    render() {
        const { questionText, name, initialValue } = this.props;

        return (
            <div className='row mt-5 questionContainer w-100 mh-200px col-11 col-md-8 flex-column justify-content-center align-items-center'>
                <p className='w-75 text-break text-center mt-2 mb-4 font-weight-bold'>{questionText}</p>    
                <input
                    type="text"
                    size="30"
                    name={name}
                    defaultValue={initialValue || ''}
                    className='mb-3 form-control w-50'
                ></input>
            </div>
        )
    }
}