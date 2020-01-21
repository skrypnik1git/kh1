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