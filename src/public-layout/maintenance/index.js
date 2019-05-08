
// outsource dependencies
import React from 'react';

// local dependencies
import { FasIcon } from '../../components/fa-icon';
import CenteredBox from '../../components/centered-box';

/**
 * Maintenance page
 */
export default function () {
    return (<CenteredBox style={{ width: '640px', maxWidth: '80%' }}>
        <div className="text-center my-3">
            <h1 className="mb-3">
                <sup>
                    <FasIcon icon="cog" size="2x" spin className="text-info" />
                </sup>
                <FasIcon icon="cog" size="5x" spin className="text-purple" />
                <FasIcon icon="cog" size="lg" spin className="text-success" />
            </h1>
            <div className="text-bold text-lg mb-3">SITE IS UNDER MAINTENANCE</div>
            <p className="lead m-0">We&#39;ll back online shortly!</p>
        </div>
    </CenteredBox>);
}
