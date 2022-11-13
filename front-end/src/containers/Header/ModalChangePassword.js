import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import { languages } from "../../utils/constant";
import CommonUtils from '../../utils/CommonUtils';
import { toast } from 'react-toastify'
import { changePasswordService } from '../../services/userService';



class ModalCreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    toggle = () => {
        this.props.toggleisOpenModal();
    }


    onChangeInput = (e, id) => {
        let copyState = { ...this.state };

        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValideInput = () => {
        let isValid = true;
        let arrCheck = [
            'oldPassword',
            'confirmPassword',
            'newPassword',
        ];

        for (let i = 0; i < arrCheck.length; i++) {

            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error('Missing required field: ' + arrCheck[i],
                    {
                        theme: 'colored'
                    })
                break;
            }
        }

        return isValid;
    }

    handleChangePassword = async () => {
        let isValid = this.checkValideInput();

        if (isValid === false) return;

        // fire redux action
        let res = await changePasswordService({
            id: this.props.userInfo.id,
            email: this.props.userInfo.email,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
        });

        if (res && res.errCode === 0) {
            toast.success(res.errMessage, {
                theme: "colored"
            });
            this.toggle();
        } else {
            toast.error(res.errMessage, {
                theme: "colored"
            });
        }

    }

    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="xs"
                style={{ marginTop: "100px" }}
            >
                <ModalHeader toggle={() => this.toggle()} className="close">
                    <FormattedMessage id="home-header.change-password" />
                </ModalHeader>
                <ModalBody>
                    <form className='col-12'>
                        <h2 className="text-center mb-5">
                            <FormattedMessage id="home-header.change-password" />
                        </h2>
                        <div className='row'>
                            <div className="form-group col-12">
                                <label>
                                    <FormattedMessage id="home-header.old-password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="oldPassword"
                                    name="oldPassword"
                                    onChange={(e) => { this.onChangeInput(e, 'oldPassword') }}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-12">
                                <label>
                                    <FormattedMessage id="home-header.new-password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    name="newPassword"
                                    onChange={(e) => { this.onChangeInput(e, 'newPassword') }}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-12">
                                <label>
                                    <FormattedMessage id="home-header.confirm-password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={(e) => { this.onChangeInput(e, 'confirmPassword') }}
                                />
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>

                    <Button
                        color="success px-2"
                        onClick={() => {
                            this.handleChangePassword()
                        }}>
                        <FormattedMessage id="manage-user.save" />
                    </Button>
                    <Button
                        color="danger px-2"
                        onClick={() => {
                            this.toggle()
                        }}>
                        <FormattedMessage id="manage-user.close" />
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);



