
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// NOTE development only !!!
// library.add(fas);
// library.add(fab);
// library.add(far);
// console.log('library', library);
// console.log('fas', fas);
// console.log('fab', fab);
// console.log('far', far);

// NOTE production connected icons make sure in the repo wos not present development (unused) icons
library.add(
    fas.faCog,
    fas.faCogs,
    fas.faBars,
    fas.faHome,
    fas.faUsers,
    fas.faTimes,
    fas.faSearch,
    fas.faUserCog,
    fas.faEnvelope,
    fas.faChartLine,
    fas.faSignOutAlt,
    fas.faUniversalAccess,
    fas.faExclamationTriangle,
    fas.faChalkboardTeacher
);
library.add(
    far.faEnvelope,
    far.faBell,
    far.faCircle,
);
library.add(
    fab.faGoogle
);

export class FasIcon extends PureComponent {
    render () {
        const { icon, ...attr } = this.props;
        return <FontAwesomeIcon icon={['fas', icon]} {...attr} />;
    }
}
FasIcon.propTypes = { icon: PropTypes.string.isRequired };

export class FarIcon extends PureComponent {
    render () {
        const { icon, ...attr } = this.props;
        return <FontAwesomeIcon icon={['far', icon]} {...attr} />;
    }
}
FarIcon.propTypes = { ...FasIcon.propTypes };

export class FabIcon extends PureComponent {
    render () {
        const { icon, ...attr } = this.props;
        return <FontAwesomeIcon icon={['fab', icon]} {...attr} />;
    }
}
FabIcon.propTypes = { ...FasIcon.propTypes };

export default FontAwesomeIcon;
