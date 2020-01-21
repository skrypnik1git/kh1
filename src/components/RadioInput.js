import React, {Component} from 'react';

export default class RadioInput extends Component {
    state = {}

    static getDerivedStateFromProps(props, state) {
        if (props.initialValue && !state.checkedFields) {
            const checkedFields = props.initialValue;
            return { checkedFields };
        }
        return null;
    }

    onChange = e => {
        const { value } = e.currentTarget;
        let { checkedFields } = this.state;
        checkedFields = value;
        this.setState({ checkedFields });
    }
    
    render() {
        const { questionText, labels, name } = this.props;
        const { checkedFields } = this.state;
        return (
            <div>
                <p>{questionText}</p>
                {labels.map( (label,idx) => {
                    const isChecked = String(checkedFields) === String(label)
                    return (
                        <div key={`${name}${idx}`}>
                            <label htmlFor={`answer_${label}`}>{label}</label>
                            <input 
                                type="radio" 
                                value={label} 
                                name={name} 
                                id={`answer_${label}`}
                                onChange={this.onChange}
                                checked={isChecked}
                            ></input>
                        </div>
                    )
                })}
            </div>
        )
    }
}