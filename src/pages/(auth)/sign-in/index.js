import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    contructor(props) {
        super(props);
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
}

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);