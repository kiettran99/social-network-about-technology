import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import {
    getHardwareCPU, getHardwareMotherboard,
    getHardwareRam, getHardwareGraphics
} from '../../../actions/hardware';

const BuildPart = lazy(() => import('./BuildPart'));

const BuildParts = ({
    getHardwareCPU, getHardwareMotherboard,
    getHardwareRam, getHardwareGraphics,
    hardware: { cpus, motherboards, rams, graphics }
}) => {
    return (
        <div className="email-form">
            <Suspense fallback={<div>Loading...</div>}>
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
                    datum={graphics} />
            </Suspense>
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