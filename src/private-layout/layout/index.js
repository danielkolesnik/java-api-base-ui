
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

// local dependencies
import Header from './header';
import Footer from './footer';
import SideMenu from './side-menu';

class Layout extends PureComponent {
    render () {
        const { children, expanded } = this.props;
        return (<div id="privateLayout" className={expanded ? 'expanded' : 'collapsed'}>
            <Header />
            <SideMenu />
            <main id="content">
                <div className="hide-scroll-bar">
                    { children }
                    <Footer />
                </div>
            </main>
        </div>);
    }
}
// Check
Layout.propTypes = {
    expanded: PropTypes.bool,
    children: PropTypes.element.isRequired,
};
// Def
Layout.defaultProps = {
    expanded: false,
};
// Export
export default connect(
    state => ({ expanded: state.layout.expanded }),
    null
)(Layout);
