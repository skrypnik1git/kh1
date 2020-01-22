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
                            All unanswered questions will be counted as uncorrect. Do you want to continue?
                        </div>
                        <div className="cover-btns">
                            <Link className="btn btn-success btn-lg border-white" to='/result'>
                                Yes
                            </Link >
                            <input type="button" value="Cancel" className="btn btn-danger btn-lg border-white" onClick={onClose}>
                            </input>
                        </div>
                    </div>
                </div>
            ) : null
    }
}