import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const Score = ({ buildParts: { buildParts } }) => {

    const [score, setScore] = useState(0);

    useEffect(() => {
        if (buildParts) {
            let total = 0;

            buildParts.hardwares.forEach((hardware) => {
                if (hardware.hardware.hardwareValue) {
                    total += hardware.hardware.hardwareValue;
                }
            });

            setScore(total);
        }
    }, [buildParts]);

    return (
        <div className="container form-group">
            <h4 className="font-italic">Total Score: {score}</h4>
        </div>
    );
};

const mapStateToProps = (state) => ({
    buildParts: state.buildParts
});

export default connect(mapStateToProps)(Score);