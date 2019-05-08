
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// local dependencies
import { Spinner as ImageSpinner } from '../images';

// configuration
export const TYPE = {
    MIN_HEIGHT: 'MIN_HEIGHT',
    SPINNER: 'SPINNER',
    BOX: 'BOX',
};

/**
 * Preloader
 *
 * @param {Object} props
 * @public
 */
class Preloader extends PureComponent {
    render () {
        const { type, active, children, height, ...attr } = this.props;
        // NOTE do nothing
        if (!active) { return children; }
        // NOTE show preloader
        switch (type) {
            case TYPE.SPINNER: return (<ImageSpinner style={{ width: '20px' }} {...attr} />);
            case TYPE.BOX: return (<BoxPreloader {...attr} />);
            case TYPE.MIN_HEIGHT: return (<BoxPreloader style={{ minHeight: `${(height*0.6)||90}px`, marginTop: `${(height*0.4)||60}px` }} {...attr} />);
            default: return (<DefPreloader/>);
        }
    }
}

Preloader.propTypes = {
    active: PropTypes.bool,
    height: PropTypes.number,
    type: PropTypes.oneOf(Object.keys(TYPE).map(key => TYPE[key])),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.element,
        PropTypes.node
    ]),
};

Preloader.defaultProps = {
    type: void(0),
    active: false,
    height: void(0),
    children: '',
};

export default Preloader;

/**
 * Prepared image spinner
 */
export function Spinner (props) {
    return <Preloader type={TYPE.SPINNER} { ...props } />;
}

/**
 * Prepared image boxHolder
 */
export function BoxHolder (props) {
    return <Preloader type={TYPE.BOX} { ...props } />;
}

/**
 * Prepared for boxes default preloader
 *
 * @param {Object} props
 * @private
 */
function BoxPreloader (props) {
    return (<div className="box-preloader">
        <div id="SPW" {...props}>
            <div id="SP_1" className="sp"> </div> <div id="SP_2" className="sp"> </div> <div id="SP_3" className="sp"> </div> <div id="SP_4" className="sp"> </div>
            <div id="SP_5" className="sp"> </div> <div id="SP_6" className="sp"> </div> <div id="SP_7" className="sp"> </div> <div id="SP_8" className="sp"> </div>
        </div>
    </div>);
}

/**
 * default preloader like in public index html
 *
 * @private
 */
function DefPreloader () {
    return (<div className="def-preloader">
        <div id="SPW">
            <div id="SP_1" className="sp"> </div> <div id="SP_2" className="sp"> </div> <div id="SP_3" className="sp"> </div> <div id="SP_4" className="sp"> </div>
            <div id="SP_5" className="sp"> </div> <div id="SP_6" className="sp"> </div> <div id="SP_7" className="sp"> </div> <div id="SP_8" className="sp"> </div>
        </div>
    </div>);
}
