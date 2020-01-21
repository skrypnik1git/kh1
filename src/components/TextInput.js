import React, {Component} from 'react';

export default class TextInput extends Component {
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