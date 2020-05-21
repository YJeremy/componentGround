import React from 'react';
import { flexH, flexHC, flexV } from '@/utils/flex';

const StartingSituation = props => {
    const { Graph } = props;

    return (
        <div
            style={{
                minHeight: '300px',
                width: '100%',
                height: '100%',
                padding: '0 .3em',
            }}
        >
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: '5px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    margin: '.5em auto .2em',
                    textAlign: 'center',
                    lineHeight: '2',
                }}
            >
                <span>开工情况</span>
            </div>
            <div
                style={{
                    maxWidth: '100%',
                    height: '250px',
                    background: '#ffffff',
                    borderRadius: '5px',
                    padding: '.5em auto .2em',
                    textAlign: 'center',
                    ...flexH,
                    ...flexHC
                }}
            >
                {Graph}
            </div>
        </div>
    );
};
export default StartingSituation;
