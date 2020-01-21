import React, {Component} from 'react';

export default class Select extends Component {
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
        checkedFields = value
        this.setState({ checkedFields });
    }
    
    render() {
        const { questionText, options, name } = this.props;
        const { checkedFields } = this.state;
        return (
            <div>
                <p>{questionText}</p>
                <select name={name} value={checkedFields ? checkedFields : ''} onChange={this.onChange}>
                    <option key={`${name}_placeholder`} value='' disabled >Choose your answer</option>
                    {options.map( (option,idx) => {
                       return <option 
                                key={`${name}${idx}`} 
                                value={option}
                                
                              >
                                {option}
                              </option>
                    })}
                </select>
            </div>
        )
    }
}