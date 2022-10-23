import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions, languages } from '../../../utils/constant';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import Lightbox from 'react-image-lightbox';
import * as actions from "../../../store/actions";
import CommonUtils from '../../../utils/CommonUtils';
import { toast } from 'react-toastify';
import { createNewSpecialtyService } from '../../../services/userService';
import MaterialTable from 'material-table';
import _ from 'lodash';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImgUrl: '',
            isOpen: false,
            id: '',
            descMarkdown: '',
            descHTML: '',
            avatar: '',
            name: '',
            specialtyList: {},
            specialEdit: {},
            action: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    componentDidUpdate() {

    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            descMarkdown: text,
            descHTML: html
        })
    }

    openPreviewImg = () => {
        if (!this.state.previewImgUrl)
            return;

        this.setState({
            isOpen: true
        })
    }


    handleChangeImg = async (e) => {
        let file = e.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectURrl,
                avatar: base64
            })
        }
    }


    handleChangeInput = (e, id) => {
        let copyState = { ...this.state };

        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValideInput = () => {
        let isValid = true;
        let arrCheck = [
            'name',
            'descMarkdown',
        ];

        for (let i = 0; i < arrCheck.length; i++) {

            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required field: ' + arrCheck[i]);
                break;
            }
        }

        return isValid;
    }

    handleCreateSpecialty = () => {
        let isValid = this.checkValideInput();
        if (isValid === false) return;

        this.props.createNewSpecialty(this.state);
        this.setState({
            name: '',
            descMarkdown: '',
            descHTML: '',
            avatar: '',
            previewImgUrl: '',
        })
    }

    handleSaveSpecialty = () => {
        let isValid = this.checkValideInput();
        if (isValid === false) return;

        this.props.editSpecialty({
            id: this.state.id,
            name: this.state.name,
            descMarkdown: this.state.descMarkdown,
            descHTML: this.state.descHTML,
            avatar: this.state.avatar,
        })

        this.setState({
            name: '',
            descMarkdown: '',
            descHTML: '',
            avatar: '',
            previewImgUrl: '',
        })
    }

    handleCancel = () => {
        this.setState({
            name: '',
            descMarkdown: '',
            descHTML: '',
            avatar: '',
            previewImgUrl: '',
        })
    }


    render() {

        let { specialtyList } = this.props;

        if (specialtyList && specialtyList.length > 0) {
            specialtyList.map((item, i) => {
                if (item && item.image) {
                    item.avatar = new Buffer(item.image, 'base64').toString('binary');
                }
            })
        }
        return (
            <div className='manage-specialty-container'>
                <div className='container-content'>
                    <div className='title'>
                        <FormattedMessage id="manage-specialty.title" />
                    </div>
                    <div className='col-12 mt-5'>
                        <div className='row'>
                            <div className='col-8 form-group'>
                                <label>
                                    <FormattedMessage id="manage-specialty.specialty-name" />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='name'
                                    onChange={(e) => this.handleChangeInput(e, 'name')}
                                    value={this.state.name}
                                />
                            </div>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="manage-specialty.avatar" />
                                </label>
                                <div>
                                    <input
                                        type="file"
                                        id="previewImg"
                                        hidden
                                        onChange={(e) => {
                                            this.handleChangeImg(e)
                                        }}
                                    />
                                    <label htmlFor='previewImg' className='btn btn-primary w-100'>
                                        Upload
                                        <i className='fas fa-upload ml-2'></i>
                                    </label>
                                    <div className='w-100 form-control center'
                                        style={{
                                            height: "100px",
                                            backgroundImage: `url(${this.state.previewImgUrl})`,
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {
                                            this.openPreviewImg()
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-5 mb-5'>
                            <div className='col-12'>
                                <label>
                                    <FormattedMessage id="manage-specialty.specialty-detail" />
                                </label>
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.descMarkdown}
                                />
                            </div>
                        </div>

                        <div className='row mt-5 mb-5'>
                            <div className='col-12'>
                                {
                                    this.state.action === CRUDActions.EDIT
                                        ? <button
                                            className='btn btn-success float-right'
                                            onClick={() => this.handleSaveSpecialty()}
                                        >
                                            <FormattedMessage id="manage-specialty.save" />
                                        </button>
                                        :
                                        <button
                                            className='btn btn-primary float-right'
                                            onClick={() => this.handleCreateSpecialty()}
                                        >
                                            <FormattedMessage id="manage-specialty.create" />
                                        </button>
                                }

                                <button
                                    className='btn btn-secondary float-right mr-3'
                                    onClick={() => this.handleCancel()}
                                >
                                    <FormattedMessage id='manage-specialty.cancel' />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='user-redux-body'>
                        <div className='container-content'>
                            <div className='col-12 mt-5 mb-5'>
                                <div className='p-0'
                                    style={{ height: "400px", width: "100%", }}
                                >
                                    <MaterialTable
                                        title="Specialty Table"
                                        columns={[
                                            { title: 'ID', field: 'id' },
                                            { title: 'Name', field: 'name' },
                                            {
                                                title: 'Avatar', field: 'url', render: rowData => <div
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: '50%',
                                                        backgroundImage: `url(${rowData.avatar})`,
                                                        backgroundSize: "contain",
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundPosition: "center",
                                                    }} />
                                            },
                                            { title: 'Created At', field: 'createdAt' },
                                            { title: 'Updated At', field: 'updatedAt' },
                                        ]}
                                        data={specialtyList}
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {
                                                    this.setState({
                                                        id: rowData.id,
                                                        name: rowData.name,
                                                        descMarkdown: rowData.descMarkdown,
                                                        descHTML: rowData.descHTML,
                                                        avatar: '',
                                                        previewImgUrl: rowData.avatar,
                                                        action: CRUDActions.EDIT
                                                    })
                                                }
                                            },
                                            {
                                                icon: 'delete',
                                                tooltip: 'Delete',
                                                onClick: async (event, rowData) => {
                                                    if (window.confirm(`Are you sure you want to delete specialty id: ${rowData.id}`)) {
                                                        this.props.deleteSpecialty(rowData.id);
                                                    }
                                                },
                                            }
                                        ]}
                                    // options={{
                                    //     actionsColumnIndex: -1
                                    // }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.isOpen === true && (
                            <Lightbox
                                mainSrc={this.state.previewImgUrl}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        specialtyList: state.admin.specialties
    };

};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecitaltyStart()),
        createNewSpecialty: (data) => dispatch(actions.createSpecialtyStart(data)),
        deleteSpecialty: id => dispatch(actions.deleteSpecialtyStart(id)),
        editSpecialty: (data) => dispatch(actions.editSpecialtyStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
