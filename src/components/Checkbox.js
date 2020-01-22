import React, {Component} from 'react';

export default class Checkbox extends Component {
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
            <div className='mt-5 questionContainer mh-200px col-11 col-md-8'>
                <p className='text-break text-center mt-2 mb-4 col-12 font-weight-bold'>{questionText}</p>
                    <div className='d-flex flex-column align-items-start'>
                        {labels.map((label, idx) => {
                            const isChecked = checkedFields.includes(String(label))

                            return (
                                    <div className='d-flex flex-row-reverse align-items-center' key={`${name}${idx}`}>
                                        <label htmlFor={`answer_${label}`} className='mb-0 ml-2 text-break text-center'>{label}</label>
                                        <input
                                            type="checkbox"
                                            name={name}
                                            id={`answer:${label}`}
                                            value={label}
                                            checked={isChecked}
                                            onChange={this.onChange}
                                            className='ml-2'
                                        ></input>
                                    </div>
                                )
                        })}
                    </div>
            </div>
        )
    }
}