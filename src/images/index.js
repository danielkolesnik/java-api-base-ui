
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// local dependencies
import upload from './upload.svg';
import defImg from './def-image.svg';
import settingsGif from './settings.gif';
import loginPage from './login-page.jpg';
import spinnerRed from './spinner-red.svg';
import spinnerBlack from './spinner-black.svg';
import spinnerWhite from './spinner-white.svg';
import defaultAvatar from './default_avatar.svg';

export class DefImage extends PureComponent {
    src = () => this.props.src || this.props.defaultSrc;

    alt = () => this.props.alt || this.props.defaultAlt;

    title = () => this.props.title || this.props.defaultTitle;

    className = () => this.props.className || this.props.defaultClassName;

    style = () => Object.assign({}, this.props.defaultStyle, this.props.style);

    render () {
        return <img
            src={this.src()}
            alt={this.alt()}
            title={this.title()}
            style={this.style()}
            className={this.className()}
        />;
    }
}
// Check
DefImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    defaultSrc: PropTypes.string,
    defaultAlt: PropTypes.string,
    defaultTitle: PropTypes.string,
    defaultStyle: PropTypes.object,
    defaultClassName: PropTypes.string,
};
// Def
DefImage.defaultProps = {
    src: null,
    alt: null,
    title: null,
    style: {},
    className: null,
    defaultSrc: defImg,
    defaultAlt: 'image',
    defaultClassName: '',
    defaultTitle: 'image',
    defaultStyle: {},
};

export const LoginPageImage = props => (
    <DefImage
        defaultSrc={loginPage}
        defaultAlt="Healthene"
        defaultTitle="Login page"
        {...props}
    />
);
// TODO to known logo ???
export const Logo = props => (
    <div className="complex-logo" {...props}>
        University
    </div>
);

export const Avatar = props => (
    <DefImage
        defaultAlt="User"
        defaultTitle="User"
        defaultSrc={defaultAvatar}
        defaultStyle={{ borderRadius: '50%' }}
        {...props}
    />
);

export const CloudImage = props => (
    <DefImage
        defaultAlt="Upload to cloud"
        defaultTitle="Upload to cloud"
        defaultSrc={upload}
        {...props}
    />
);

export const SettingGif = props => (
    <DefImage
        defaultAlt="Settings"
        defaultTitle="Settings"
        defaultSrc={settingsGif}
        {...props}
    />
);

export const SpinnerWhite = props => (
    <DefImage
        defaultAlt="Loading"
        defaultTitle="Loading"
        defaultSrc={spinnerWhite}
        {...props}
    />
);

export const SpinnerBlack = props => (
    <DefImage
        defaultAlt="Loading"
        defaultTitle="Loading"
        defaultSrc={spinnerBlack}
        {...props}
    />
);

export const SpinnerRed = props => (
    <DefImage
        defaultAlt="Loading"
        defaultTitle="Loading"
        defaultSrc={spinnerRed}
        {...props}
    />
);

/**
 * Wrapped spinners
 */
export function Spinner ({ black, white, ...attr }) {
    if (white) { return <SpinnerWhite {...attr} />; }
    if (black) { return <SpinnerBlack {...attr} />; }
    return <SpinnerRed {...attr} />;
}
// Check
Spinner.propTypes = {
    black: PropTypes.bool,
    white: PropTypes.bool,
};
// Def
Spinner.defaultProps = {
    black: false,
    white: false,
};
