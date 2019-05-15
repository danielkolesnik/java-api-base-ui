import React from 'react';
import {connect} from "react-redux";

class Teachers extends React.Component {

    render() {
        return (
            <div>TEACHERS PAGE</div>
        )
    }
}

export default connect(
    state => ({
        ...state.teachers
    }),
    null
)(Teachers);
