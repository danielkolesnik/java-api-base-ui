
// outsource dependencies
import React from 'react';
import { connect } from 'react-redux';

// local dependencies
import TYPE from './types';
import AlertError from '../../components/alert-error';
import CenteredBox from '../../components/centered-box';
import {historyPush} from "../../store";
import {TEACHERS} from "../../constants/routes";
import {Button} from "reactstrap";

/**
 * Connected welcome page example
 *
 * @public
 */
export default connect(
    // mapStateToProps
    state => ({ ...state.welcome }),
    // mapDispatchToProps
    dispatch => ({
        show: () => dispatch({ type: TYPE.SHOW }),
        clear: () => dispatch({ type: TYPE.CLEAR }),
    })
)(({ errorMessage, show, clear }) => (
    <CenteredBox style={{ width: '600px' }}>
        <div className="row offset-bottom-6">
            <h2 className="col-xs-12 text-center">
                Teachers
            </h2>
        </div>
        <div className="row offset-bottom-6">
            <div className="col-xs-12">
                <Button block color="success" onClick={() => historyPush(TEACHERS.LINK())}>
                    <i className="fa fa-fast-backward" aria-hidden="true"> </i>&nbsp;Let's go!
                </Button>
            </div>
        </div>
        <AlertError active title={'Error:'} message={errorMessage} onChange={clear}/>
    </CenteredBox>
));
