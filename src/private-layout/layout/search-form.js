
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
// local dependencies
import TYPE from './types';
import { FasIcon } from '../../components/fa-icon';

class SearchForm extends PureComponent {
    /**
     * catch when status of form did change to visible and setup focus for input
     */
    componentDidUpdate (prevProps) {
        // NOTE only on start showing form
        if (prevProps.showSearch === false && this.props.showSearch === true) {
            this.inputElement.focus();
        }
    }

    handleCancel = () => this.props.cancel();

    handleKeyDown = e => {
        if (e.keyCode === 27) {
            this.handleCancel();
        }
    };

    handleChange = e => this.props.change(e.target.value);

    handleSubmit = e => {
        e.preventDefault();
        this.props.submit();
    };

    render () {
        const { showSearch, searchInput } = this.props;
        return (<form
            role="search"
            autoComplete="off"
            onSubmit={this.handleSubmit}
            onKeyDown={this.handleKeyDown}
            className={`navbar-form${!showSearch ? '' : ' open' }`}
        >
            <div className="form-group">
                <input
                    type="text"
                    value={searchInput}
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="Type and hit enter ... or escape to cancel"
                    ref={ref => { this.inputElement = ref; }}
                />
                <FasIcon icon="times" tag="div" className="navbar-form-close" onClick={this.handleCancel} />
            </div>
            <button className="d-none" type="submit">Submit</button>
        </form>);
    }
}
// Check
SearchForm.propTypes = {
    submit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    searchInput: PropTypes.string.isRequired,
    showSearch: PropTypes.bool.isRequired,
};
// Export
export default connect(
    state => ({
        showSearch: state.layout.showSearch,
        searchInput: state.layout.searchInput,
    }),
    dispatch => ({
        cancel: () => dispatch({ type: TYPE.DATA, showSearch: false, /*searchInput: null*/ }),
        change: value => dispatch({ type: TYPE.DATA, searchInput: value }),
        submit: () => dispatch({ type: TYPE.SUBMIT_SEARCH_FORM }),
    })
)(SearchForm);
