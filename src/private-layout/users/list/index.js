
// outsource dependencies
import React from 'react';
import { connect } from 'react-redux';
import { Row, Table } from 'react-bootstrap';

// local dependencies
import { LIST } from '../types';
import { historyPush } from '../../../store';
import { USERS } from '../../../constants/routes';
import SortIcon from '../../../components/sort-icon';
import { Humanize } from '../../../components/filter';
import RowSelect from '../../../components/row-select';
import TableActions from '../../../components/table-actions';
import { PERMISSION, STATUS } from '../../../constants/spec';
import { AllowedActionList } from '../../../components/allowed-action';

// configure
export const allowedFilters = ['name', 'email', 'phone', 'status', 'lastModifiedByName'];
export const allowedSort = ['email', 'phone', 'name', 'createdBy.name', 'createdDate', 'lastModifiedBy.name', 'lastModifiedDate', 'enabled'];
/**
 *
 *
 * @public
 */
export default () => (<div>
    <Row> <h3 className="col-xs-12"> User List </h3> </Row>
    <Row> <TableConnected /> </Row>
</div>);

/**
 * Connect table wrapper
 *
 * @param {Object} props
 * @public
 */
const TableConnected = connect(
    state => ({ ...state.users.list }),
    dispatch => ({
        clear: () => dispatch({ type: LIST.CLEAR }),
        init: () => dispatch({ type: LIST.INITIALIZE }),
        clearError: () => dispatch({ type: LIST.META, errorMessage: null }),
        changePage: page => dispatch({ type: LIST.CHANGE_PAGE, page }),
        changeSize: size => dispatch({ type: LIST.CHANGE_SIZE, size }),
        clearFilter: () => dispatch({ type: LIST.CLEAR_FILTER }),
        selectAll: () => dispatch({ type: LIST.SELECT_ALL }),
        selectOne: item => dispatch({ type: LIST.SELECT_ONE, item }),
        onInputFilterChange: value => dispatch({ type: LIST.FILTER, value }),
        onFilterChange: field => dispatch({ type: LIST.APPLY_FILTER, value: '', field }),
        applyFilter: (value, field) => dispatch({ type: LIST.APPLY_FILTER, value, field }),
        changeStatus: (status, selected) => dispatch({ type: LIST.CHANGE_STATUS, status, selected }),
    })
)(({ selected, list, meta, pagination, filter, selectAll, selectOne, changeStatus, ...attr }) => (
    <TableActions
        {...attr}
        selected={selected}
        filters={allowedFilters}
        filterValue={filter.value}
        currentFilter={filter.field}
        disabled={meta.expectAnswer}
        size={Number(pagination.size)}
        page={Number(pagination.page)}
        errorMessage={meta.errorMessage}
        createPermission={PERMISSION.USER.CREATE}
        totalPages={Number(pagination.totalPages)}
        create={() => historyPush(USERS.LINK_EDIT())}
        actions={[
            {
                label: 'Enable selected',
                permission: PERMISSION.USER.ENABLE,
                action: selected => changeStatus(STATUS.ENABLED, selected)
            },
            {
                label: 'Disable selected',
                permission: PERMISSION.USER.DISABLE,
                action: selected => changeStatus(STATUS.DISABLED, selected)
            },
        ]}>
        <Table className="cbc-table" striped bordered condensed hover>
            <thead>
                <tr>
                    <RowSelect disabled={meta.expectAnswer} checked={selected.length} onClick={selectAll}/>
                    <SortConnected type="alphabet" field="email"> Email </SortConnected>
                    <SortConnected type="order" field="phone"> Phone </SortConnected>
                    <SortConnected type="alphabet" field="name"> Name </SortConnected>
                    <th> Roles </th>
                    {/*<SortConnected type="alphabet" field="createdBy.name"> Creator </SortConnected>*/}
                    {/*<SortConnected type="order" field="createdDate"> Creation </SortConnected>*/}
                    <SortConnected type="alphabet" field="lastModifiedBy.name"> Editor </SortConnected>
                    <SortConnected type="order" field="lastModifiedDate"> Editing </SortConnected>
                    <SortConnected style={{ width: '90px' }} field="enabled"> Enabled </SortConnected>
                    <th style={{ width: '130px' }}> </th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (<tr key={index}>
                    <RowSelect
                        disabled={meta.expectAnswer}
                        onClick={() => selectOne(item)}
                        checked={selected.indexOf(item) > -1}
                    />
                    <td> { item.email } </td>
                    <td> { item.phone } </td>
                    <td> { item.name } </td>
                    <td> <Humanize text={ (item.roles||[]).map(i => i.name).join() } /> </td>
                    {/*<td> { item.creator.name } </td>*/}
                    {/*<td> { item.created } </td>*/}
                    <td> { item.editor.name } </td>
                    <td> { item.updated } </td>
                    <td className="text-center"><i className={`fa ${item.enabled?'fa-check fa-lg text-green':'fa-ban fa-lg text-red'}`} aria-hidden="true"> </i> </td>
                    <td> <AllowedActionList className="btn-cbc" icon="fa fa-cogs" name="Options" actions={[
                        {
                            label: 'Edit',
                            permission: PERMISSION.USER.UPDATE,
                            action: () => historyPush(USERS.LINK_EDIT({ id: item.id }))
                        },
                        {
                            label: 'Enable',
                            permission: PERMISSION.USER.ENABLE,
                            action: () => changeStatus(STATUS.ENABLED, [{ id: item.id }])
                        },
                        {
                            label: 'Disable',
                            permission: PERMISSION.USER.DISABLE,
                            action: () => changeStatus(STATUS.DISABLED, [{ id: item.id }])
                        },
                    ]}/> </td>
                </tr>))}
            </tbody>
        </Table>
    </TableActions>
));

/**
 * Header th view with sorting
 *
 * @param {Object} props
 * @public
 */
const SortConnected = connect(
    state => ({
        sort: state.users.list.sort,
        disabled: state.users.list.meta.expectAnswer,
    }),
    dispatch => ({ changeSort: field => dispatch({ type: LIST.CHANGE_SORT, field }) })
)(({ field, sort, disabled, type = 'sort', changeSort, children, ...attr }) => (
    <th {...attr} className={`text-nowrap interactive dark${disabled?' disabled':''}`} onClick={e => !disabled&&changeSort(field, sort)}>
        <SortIcon type={type} status={ field === sort.field ? Number(sort.direction) : null }> {children} </SortIcon>
    </th>
));
