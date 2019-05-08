/* eslint react/prop-types: "off" */

// outsource dependencies
import React from 'react';

// local dependencies

// TODO developer component to test router features
export default function (props) {

    return (
        <div>
            <div className="row">
                <h3 className="col-10 col-offset-1 text-center top-indent-4">
                    Peg page =)
                </h3>
            </div>
            <div className="row">
                <h3 className="col-10 col-offset-1 text-center top-indent-4">
                    Props
                    <hr/>
                    <code> { JSON.stringify(props) } </code>
                    <hr/>
                </h3>
            </div>
        </div>
    );
}

