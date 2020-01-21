import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class ModalWindow extends Component {

    render() {
        const { isOpen, onClose } = this.props;
        return isOpen ? (
                <div>
                    <div className="cover-div">
                    </div>
                    <div className="confirmation">
                        <div className="text-for-cover">
                            Delete this Task?
                        </div>
                        <div className="cover-btns">
                            <Link className="btn blue-btn" to='/result'>
                                Ok
                            </Link >
                            <input type="button" value="Cancel" className="btn blue-red" onClick={onClose}>
                            </input>
                        </div>
                    </div>
                </div>
            ) : null
    }
}