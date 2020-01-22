import React, {Component} from 'react';
import logo from '../images/logo.png'

export default class Header extends Component {
    render() {
        return (
            <div className='d-flex pt-4 pb-4 justify-content-around align-items-center bg-white header'>
                    <img src={logo} alt='' className='h-75'></img>
                    <h1 className='text-center text-green text-uppercase font-weight-bold'>
                        Pass the Exam to be a Kharkiv man!
                    </h1>
            </div>
        )
    }
}