
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import Edit from './edit';
import List from './list';
import { USERS } from '../../constants/routes';

class Users extends PureComponent {
    render () {
        const { location } = this.props;
        return (<Grid fluid id="users">
            <Row>
                <Col xs={12}>
                    <Switch>
                        <Route path={USERS.LIST} component={List} />
                        <Route path={USERS.EDIT} component={Edit} />
                        {/* OTHERWISE */}
                        <Redirect to={{ pathname: USERS.LIST, state: { from: location } }}/>
                    </Switch>
                </Col>
            </Row>
        </Grid>);
    }
}
// Check
Users.propTypes = {
    location: PropTypes.object.isRequired,
};

export default Users;
