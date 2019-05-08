
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Pagination } from 'react-bootstrap';

class PaginationWrapper extends PureComponent {
    handlePageChange = page => this.props.page !== page && !this.props.disabled && this.props.onChange(page);

    handleFirst = () => this.handlePageChange(0);

    handleLast = () => this.handlePageChange(this.props.total-1);

    handleNext = () => {
        if (this.isNextDisabled()) { return; }
        const { total, page } = this.props;
        this.handlePageChange(total <= page ? total : page+1);
    };

    handlePrev = () => {
        if (this.isPrevDisabled()) { return; }
        const { page } = this.props;
        this.handlePageChange(page <= 0 ? 0 : page-1);
    };

    isNextDisabled = () => {
        const { disabled, total, page } = this.props;
        return disabled || (page+1) >= total;
    };

    isPrevDisabled = () => {
        const { disabled, page } = this.props;
        return disabled || page < 1;
    };

    render () {

        let { page, total, disabled } = this.props;
        if (total > 0 && total < 10) { // SIMPLE
            const items = [];
            let len = total;
            while (len--) {
                items.push({
                    name: items.length+1,
                    value: items.length
                });
            }

            return (<Pagination bsClass="pagination">
                <Pagination.Prev disabled={this.isPrevDisabled()} onClick={this.handlePrev} />
                { items.map((item, index) => (
                    <Pagination.Item
                        key={index}
                        disabled={disabled}
                        active={item.value === page}
                        onClick={() => this.handlePageChange(item.value)}
                    >
                        { item.name }
                    </Pagination.Item>
                ))}
                <Pagination.Next disabled={this.isNextDisabled()} onClick={this.handleNext} />
            </Pagination>);
        } else if (total >= 10) { // COMPLICATED
            --total;
            const items = [], diff = 3;
            let key = 7,
                start = (page-diff) >= 0 ? page - diff : 0,
                end = total <= (page+diff) ? total : page + diff;
            if (total <= (page + diff)) {
                // from end 7 buttons
                for (; key > 0; key --) {
                    items.unshift({ name: end+1, value: end });
                    end--;
                }
            } else {
                // from start 7 buttons
                for (; key > 0; key --) {
                    items.push({ name: start+1, value: start });
                    start++;
                }
            }

            return (<Pagination bsClass="pagination">
                <Pagination.First disabled={page < 1} onClick={this.handleFirst} />
                <Pagination.Prev disabled={this.isPrevDisabled()} onClick={this.handlePrev} />
                { items.map((item, index) => (
                    <Pagination.Item
                        key={index}
                        disabled={disabled}
                        active={item.value === page}
                        onClick={() => this.handlePageChange(item.value)}
                    >
                        { item.name }
                    </Pagination.Item>
                ))}
                <Pagination.Next disabled={this.isNextDisabled()} onClick={this.handleNext} />
                <Pagination.Last disabled={total <= (page+diff)} onClick={this.handleLast} />
            </Pagination>);
        }

        return <EmptyPagination />;
    }
}
// Check
PaginationWrapper.propTypes = {
    page: PropTypes.number,
    total: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};
// Def
PaginationWrapper.defaultProps = {
    page: 0,
    total: 0,
    disabled: false,
};

export default PaginationWrapper;

/**
 *
 * @private
 */
function EmptyPagination () {
    return (<Pagination bsClass="pagination">
        <Pagination.Prev disabled />
        <Pagination.Item active disabled> 1 </Pagination.Item>
        <Pagination.Next disabled />
    </Pagination>);
}
