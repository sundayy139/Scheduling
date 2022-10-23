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
import MaterialTable from 'material-table';
import _ from 'lodash';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImgUrl: '',
            previewLogoUrl: '',
            isOpen: false,
            isOpenLg: false,
            id: '',
            descMarkdown: '',
            descHTML: '',
            avatar: '',
            lg: '',
            name: '',
            address: '',
            action: '',
            selectedProvince: '',
            listProvince: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllClinic();
        this.props.getAllRequiedInfo();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {
            let { resProvince } = this.props.allRequiredInfo;
            let dataSelectProvince = this.buildInputSelect(resProvince, "PROVINCE")
            this.setState({
                listProvince: dataSelectProvince,
            })
        }

        if (prevProps.allRequiredInfo !== this.props.allRequiredInfo) {
            let { resProvince } = this.props.allRequiredInfo;
            let dataSelectProvince = this.buildInputSelect(resProvince, "PROVINCE")
            this.setState({
                listProvince: dataSelectProvince,
            })
        }

    }

    buildInputSelect = (inputData, type) => {
        let result = [];
        let { lang } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                if (type === "PROVINCE") {
                    let object = {};
                    let labelVi = `${item.value_VI}`;
                    let labelEn = `${item.value_EN}`;
                    object.label = lang === languages.VI ? labelVi : labelEn;
                    object.value = item.key;
                    result.push(object);
                }
            })
        }

        return result;
    }

    handleSelectChangeInfo = async (selectedOptions, name) => {
        let stateName = name.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOptions;
        this.setState({
            ...copyState
        })
    };

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

    handleChangeLogo = async (e) => {
        let file = e.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURrl = URL.createObjectURL(file);
            this.setState({
                previewLogoUrl: objectURrl,
                lg: base64
            })
        }
    }

    openPreviewLogo = () => {
        if (!this.state.previewLogoUrl)
            return;

        this.setState({
            isOpenLg: true
        })
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
            'address',
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

        this.props.createNewClinic({
            name: this.state.name,
            address: this.state.address,
            descMarkdown: this.state.descMarkdown,
            descHTML: this.state.descHTML,
            avatar: this.state.avatar,
            lg: this.state.lg,
            previewImgUrl: this.state.previewImgUrl,
            provinceId: this.state.selectedProvince.value,
        });

        this.setState({
            name: '',
            address: '',
            descMarkdown: '',
            descHTML: '',
            avatar: '',
            lg: '',
            previewLogoUrl: '',
            previewImgUrl: '',
            selectedProvince: ''
        })

    }

    handleSaveSpecialty = () => {
        let isValid = this.checkValideInput();
        if (isValid === false) return;

        this.props.editClinic({
            id: this.state.id,
            name: this.state.name,
            address: this.state.address,
            provinceId: this.state.selectedProvince.value,
            descMarkdown: this.state.descMarkdown,
            descHTML: this.state.descHTML,
            avatar: this.state.avatar,
            lg: this.state.lg,
        })

        this.setState({
            name: '',
            address: '',
            selectedProvince: '',
            descMarkdown: '',
            descHTML: '',
            avatar: '',
            lg: '',
            previewImgUrl: '',
            previewLogoUrl: '',
            action: CRUDActions.CREATE,
        })
    }

    handleCancel = () => {
        this.setState({
            name: '',
            address: '',
            selectedProvince: '',
            descMarkdown: '',
            descHTML: '',
            avatar: '',
            lg: '',
            previewImgUrl: '',
            previewLogoUrl: '',
            action: CRUDActions.CREATE,
        })
    }



    render() {

        let { clinicList, lang } = this.props;
        let { listProvince } = this.state;

        if (clinicList && clinicList.length > 0) {
            clinicList.map((item, i) => {
                if (item && item.image) {
                    item.avatar = new Buffer(item.image, 'base64').toString('binary');
                }
            })
        }

        if (clinicList && clinicList.length > 0) {
            clinicList.map((item, i) => {
                if (item && item.logo) {
                    item.lg = new Buffer(item.logo, 'base64').toString('binary');
                }
            })
        }

        return (
            <div className='manage-specialty-container'>
                <div className='container-content'>
                    <div className='title'>
                        <FormattedMessage id="manage-clinic.title" />
                    </div>
                    <div className='col-12 mt-5'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-clinic.name-clinic" />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='name'
                                    onChange={(e) => this.handleChangeInput(e, 'name')}
                                    value={this.state.name}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-clinic.address-clinic" />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='address'
                                    onChange={(e) => this.handleChangeInput(e, 'address')}
                                    value={this.state.address}
                                />
                            </div>

                        </div>

                        <div className='row'>
                            <div className='col-4 form-group'>
                                <label>
                                    <FormattedMessage id="manage-doctor.doctor-province" />
                                </label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.handleSelectChangeInfo}
                                    options={this.state.listProvince}
                                    placeholder={lang === languages.VI ? "Chọn tỉnh" : "Select province"}
                                    name="selectedProvince"
                                />
                            </div>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="manage-clinic.logo" />
                                </label>
                                <div>
                                    <input
                                        type="file"
                                        id="previewLogo"
                                        hidden
                                        onChange={(e) => {
                                            this.handleChangeLogo(e)
                                        }}
                                    />
                                    <label htmlFor='previewLogo' className='btn btn-primary w-100'>
                                        Upload
                                        <i className='fas fa-upload ml-2'></i>
                                    </label>
                                    <div className='w-100 form-control center'
                                        style={{
                                            height: "100px",
                                            backgroundImage: `url(${this.state.previewLogoUrl})`,
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {
                                            this.openPreviewLogo()
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="manage-clinic.avatar" />
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
                                    <FormattedMessage id="manage-clinic.clinic-detail" />
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
                                            <FormattedMessage id="manage-clinic.save" />
                                        </button>
                                        :
                                        <button
                                            className='btn btn-primary float-right'
                                            onClick={() => this.handleCreateSpecialty()}
                                        >
                                            <FormattedMessage id="manage-clinic.create" />
                                        </button>
                                }

                                <button
                                    className='btn btn-secondary float-right mr-3'
                                    onClick={() => this.handleCancel()}
                                >
                                    <FormattedMessage id='manage-clinic.cancel' />
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
                                            { title: 'Address', field: 'address' },
                                            {
                                                title: 'Logo', field: 'url', render: rowData => <div
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: '50%',
                                                        backgroundImage: `url(${rowData.lg})`,
                                                        backgroundSize: "contain",
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundPosition: "center",
                                                    }} />
                                            },
                                            {
                                                title: 'Image', field: 'url', render: rowData => <div
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
                                        data={clinicList}
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {

                                                    let selectedProvince = listProvince.find((item) => {
                                                        return item && item.value === rowData.provinceId
                                                    })

                                                    this.setState({
                                                        id: rowData.id,
                                                        name: rowData.name,
                                                        address: rowData.address,
                                                        provinceId: rowData.provinceId,
                                                        selectedProvince: selectedProvince,
                                                        descMarkdown: rowData.descMarkdown,
                                                        descHTML: rowData.descHTML,
                                                        avatar: '',
                                                        previewImgUrl: rowData.avatar,
                                                        previewLogoUrl: rowData.lg,
                                                        action: CRUDActions.EDIT
                                                    })
                                                }
                                            },
                                            {
                                                icon: 'delete',
                                                tooltip: 'Delete',
                                                onClick: async (event, rowData) => {
                                                    if (window.confirm(`Are you sure you want to delete specialty id: ${rowData.id}`)) {
                                                        this.props.deleteClinic(rowData.id);
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

                    {
                        this.state.isOpenLg === true && (
                            <Lightbox
                                mainSrc={this.state.previewLogoUrl}
                                onCloseRequest={() => this.setState({ isOpenLg: false })}
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
        clinicList: state.admin.clinics,
        allRequiredInfo: state.admin.allRequiredData
    };

};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinicStart()),
        createNewClinic: (data) => dispatch(actions.createClinicStart(data)),
        deleteClinic: id => dispatch(actions.deleteClinicStart(id)),
        editClinic: (data) => dispatch(actions.editClinicStart(data)),
        getAllRequiedInfo: () => dispatch(actions.fetchRequiredDoctorInfoStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
