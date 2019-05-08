
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

// local dependencies
import Alert from './alert-error';
import PageSize from './page-size';
import Preloader from './preloader';
import Pagination from './pagination';
import is from '../services/is.service';
import SearchFilter from './search-filter';
import { AllowedBtn, AllowedActionList, SKIP_CHECK } from './allowed-action';

/**
 * wrapper for table actions, filters, pagination and page size
 *
 */
class TableActions extends PureComponent {
    render () {
        const {
            children, disabled, errorMessage, clearError, selected, actions,
            statuses, clearFilter, applyFilter, onFilterChange, onInputFilterChange,
            currentFilter, filterValue, filters,
            page, size, totalPages, changePage, changeSize,
            create, createPermission, createText,
        } = this.props;
        return (<Grid fluid>
            <Panel className="bg-muted no-radius">
                <Panel.Body>
                    <Row>
                        { create && (<Col xs={2}>
                            <AllowedBtn
                                block
                                onClick={create}
                                disabled={disabled}
                                action={createPermission}
                            >
                                <i className="fa fa-plus" aria-hidden="true"> </i>
                                &nbsp;{createText}
                                <Preloader type="ICON" active={disabled}/>
                            </AllowedBtn>
                        </Col>) }
                        <Col xs={ create ? 6 : 8 }>
                            <SearchFilter
                                filters={filters}
                                clear={clearFilter}
                                value={filterValue}
                                disabled={disabled}
                                statuses={statuses}
                                current={currentFilter}
                                applyFilter={applyFilter}
                                onFilterChange={onFilterChange}
                                onInputChange={onInputFilterChange}
                            />
                        </Col>
                        <Col xs={2}>
                            {!is.array(actions) ? '' : (
                                <AllowedActionList
                                    name="Actions"
                                    icon="fa fa-list"
                                    disabled={disabled || !selected.length}
                                    actions={actions.map(item => ({ ...item, action: () => item.action(selected) }))}
                                />
                            )}
                        </Col>
                        <Col xs={2} className="text-right">
                            <strong> Show: </strong>&nbsp;
                            <PageSize value={size} disabled={disabled} onChange={changeSize}/>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
            <Row>
                <Col xs={10} xsOffset={1}>
                    <Alert active title={'Error: '} message={errorMessage} onChange={clearError} />
                </Col>
            </Row>
            <Row> <Col xs={12}> { children } </Col> </Row>
            <Row>
                <Col xs={12} className="text-center">
                    <Pagination page={page} total={totalPages} disabled={disabled} onChange={changePage} />
                </Col>
            </Row>
        </Grid>);
    }

    componentDidMount () { this.props.init(); }

    componentWillUnmount () { this.props.clear(); }
}

// Check
TableActions.propTypes = {
    size: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    actions: PropTypes.array,
    filters: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    currentFilter: PropTypes.string.isRequired,
    init: PropTypes.func.isRequired,

    clear: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    changeSize: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    applyFilter: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onInputFilterChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.element,
        PropTypes.node
    ]).isRequired,

    create: PropTypes.func,
    createText: PropTypes.string,
    createPermission: PropTypes.string,

    errorMessage: PropTypes.any,
    filterValue: PropTypes.any,
    disabled: PropTypes.bool,
    statuses: PropTypes.array,
};
// Def
TableActions.defaultProps = {
    actions: [],
    create: void(0),
    createText: 'Create',
    createPermission: SKIP_CHECK,
    disabled: false,
    statuses: void(0),
    filterValue: void(0),
    errorMessage: void(0),
};
// Export
export default TableActions;
