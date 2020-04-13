import React from 'react';

const BLANK = () => (
    <div>BLANK Module</div>
);

export default {
    routeProps: {
        path: '/blank',
        component: BLANK
    },
    name: 'BLANK',
}