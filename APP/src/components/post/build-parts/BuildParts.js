import React from 'react';
import { connect } from 'react-redux';

import BuildPart from './BuildPart';
import {
    getHardwareCPU, getHardwareMotherboard,
    getHardwareRam, getHardwareGraphics
} from '../../../actions/hardware';

const BuildParts = ({
    getHardwareCPU, getHardwareMotherboard,
    getHardwareRam, getHardwareGraphics,
    hardware: { cpus, motherboards, rams, graphics }
}) => {
    return (
        <div className="email-form">
            <BuildPart category="CPU" actionDispatch={getHardwareCPU}
                datum={cpus}
            />
            <BuildPart category="Motherboard" actionDispatch={getHardwareMotherboard}
                datum={motherboards}
            />
            <BuildPart category="Ram" actionDispatch={getHardwareRam}
                datum={rams}
            />
            <BuildPart category="Graphics" actionDispatch={getHardwareGraphics}
                datum={graphics}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    hardware: state.hardware
});

export default connect(mapStateToProps, {
    getHardwareCPU, getHardwareMotherboard,
    getHardwareRam, getHardwareGraphics
})(BuildParts);