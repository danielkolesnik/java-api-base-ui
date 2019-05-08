
// outsource dependencies
import Select from 'react-select';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Row, Col, MenuItem, Dropdown } from 'react-bootstrap';

// local dependencies
import { STATUS } from '../constants/spec';
import { Humanize, filters } from './filter';

export class SearchFilter extends PureComponent {
    handleApply = (value) => {
        const { current, disabled, applyFilter } = this.props;
        if (disabled) { return; }
        applyFilter(value, current);
    };

    render () {
        const { current, value, filters, statuses, disabled, onFilterChange, onInputChange, clear } = this.props;
        const FilterValue = filterValueComponent(current);
        return (<Row className="search-filter">
            <Col xs={7} className="search-filter-value">
                <FilterValue
                    clear={clear}
                    value={value}
                    type={current}
                    disabled={disabled}
                    statuses={statuses}
                    submit={this.handleApply}
                    onInputChange={onInputChange}
                    onSelectChange={this.handleApply}
                />
            </Col>
            <Col xs={5} className="search-filter-filter">
                <FilterList
                    current={current}
                    filters={filters}
                    disabled={disabled}
                    onChange={onFilterChange}
                />
            </Col>
        </Row>);
    }
}

export default SearchFilter;

// Check
SearchFilter.propTypes = {
    current: PropTypes.any.isRequired,
    filters: PropTypes.array.isRequired,
    clear: PropTypes.func.isRequired,
    applyFilter: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    statuses: PropTypes.array,
    disabled: PropTypes.bool,
};
// Def
SearchFilter.defaultProps = {
    value: '',
    disabled: false,
    statuses: [STATUS.PUBLISHED, STATUS.UNPUBLISHED, STATUS.PENDING, STATUS.REVOKED, STATUS.APPROVED, STATUS.DELETED],
};

class FilterList extends PureComponent {
    render () {
        const { current, filters, disabled, onChange } = this.props;
        return (<Dropdown id="filtersDropdown" vertical block disabled={disabled}>
            <Dropdown.Toggle vertical="true" block disabled={disabled} style={{ borderRadius: '4px' }}>
                <i className="fa fa-filter" aria-hidden="true"> </i>
                &nbsp;<Humanize tag="strong" text={current} />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: '100%' }}>
                {filters.map((item, index) => (<MenuItem
                    key={index}
                    eventKey={index}
                    active={current === item}
                    onClick={() => !disabled&&onChange(item)}
                >
                    <Humanize text={item} />
                </MenuItem>))}
            </Dropdown.Menu>
        </Dropdown>);
    }
}

// Check
FilterList.propTypes = {
    current: PropTypes.any.isRequired,
    filters: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};
// Def
FilterList.defaultProps = {
    disabled: false,
};

/**
 * different value component based on selected filter type
 *
 * @param {String} type
 * @private
 */
function filterValueComponent (type) {
    switch (type) {
        default: return TextFilter;
        case 'status': return StatusFilter;
    }
}

class TextFilter extends PureComponent {
    handleInputChange = event => {
        const { onInputChange, disabled } = this.props;
        event.preventDefault();
        if (disabled) { return; }
        const value = String(event.target.value).trimStart();
        onInputChange(value);
    };

    handleSubmit = event => {
        const { submit, value, disabled } = this.props;
        event.preventDefault();
        if (disabled) { return; }
        submit(value);
    };

    handleClear = event => {
        const { clear, disabled } = this.props;
        event.preventDefault();
        if (disabled) { return; }
        clear(event);
    };

    render () {
        const { value, disabled } = this.props;
        return (<form autoComplete="off" name="searchFilterForm" onSubmit={this.handleSubmit}>
            <div className="form-group offset-bottom-0">
                <div className="input-group">
                    <input
                        name="search"
                        value={value}
                        autoComplete="off"
                        disabled={disabled}
                        placeholder="Search"
                        className="form-control"
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="search" className="input-group-addon" style={{ padding: 0 }}>
                        <button
                            type="submit"
                            disabled={disabled}
                            className="btn btn-default"
                            style={{ border: 0, borderRadius: 0 }}
                        >
                            <i className="fa fa-search" aria-hidden="true"> </i>
                        </button>
                    </label>
                    {!value?(''):(<i
                        aria-hidden="true"
                        onClick={this.handleClear}
                        className="fa fa-times search-clear"
                        style={{ position: 'absolute', top: '10px', right: '48px', cursor: 'pointer', zIndex: 5 }}
                    >
                    </i>)}
                </div>
            </div>
        </form>);
    }
}

// Check
TextFilter.propTypes = {
    clear: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.any,
};
// Def
TextFilter.defaultProps = {
    disabled: false,
    value: ''
};

class StatusFilter extends PureComponent {
    handleSubmit = event => {
        const { submit, value, disabled } = this.props;
        event.preventDefault();
        if (disabled) { return; }
        submit(value);
    };

    render () {
        const { value, statuses, disabled, onSelectChange } = this.props;
        return (<form autoComplete="off" name="searchFilterForm" onSubmit={this.handleSubmit}>
            <div className="form-group offset-bottom-0">
                <Select
                    multi={false}
                    name="search"
                    value={value}
                    autoComplete="off"
                    simpleValue={true}
                    disabled={disabled}
                    placeholder="Search"
                    onChange={onSelectChange}
                    className="search-filter-select"
                    options={statuses.map(item => ({ value: item, label: filters.humanize(item) }))}
                    arrowRenderer={() => (
                        <button
                            type="button"
                            className="btn btn-default"
                            style={{ marginRight: '-6px' }}
                        >
                            <span className="caret"> </span>
                        </button>
                    )}/>
            </div>
        </form>);
    }
}
// Check
StatusFilter.propTypes = {
    onSelectChange: PropTypes.func.isRequired,
    statuses: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.any,
};
// Def
StatusFilter.defaultProps = {
    disabled: false,
    value: null
};
