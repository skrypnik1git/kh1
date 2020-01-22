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
            <div className='mt-5 questionContainer mh-200px col-11 col-md-8 flex-column'>
                <p className='text-break text-center mt-2 mb-4 font-weight-bold'>{questionText}</p>
                <div className='d-flex flex-column align-items-start'>
                    {labels.map( (label,idx) => {
                        const isChecked = String(checkedFields) === String(label)
                        return (
                            <div className='d-flex flex-row-reverse align-items-center' key={`${name}${idx}`}>
                                <label className='mb-0 ml-2 text-break text-center' htmlFor={`answer_${label}`}>{label}</label>
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
            </div>
        )
    }
}