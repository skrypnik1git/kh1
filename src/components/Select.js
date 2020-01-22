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
            <div className='row mt-5 questionContainer w-100 mh-200px col-11 col-md-8 flex-column justify-content-center align-items-center'>
                <p className='w-75 text-break text-center mt-2 mb-4 font-weight-bold'>{questionText}</p>
                <select name={name} value={checkedFields ? checkedFields : ''} onChange={this.onChange} className='form-control w-50'>
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