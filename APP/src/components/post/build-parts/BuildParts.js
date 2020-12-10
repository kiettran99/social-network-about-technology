import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import {
    getHardwareCPU, getHardwareMotherboard,
    getHardwareRam, getHardwareGraphics
} from '../../../actions/hardware';
import BuildPartsContext from '../../../contexts/BuildPartsContext';

const BuildPart = lazy(() => import('./BuildPart'));

const BuildParts = ({
    getHardwareCPU, getHardwareMotherboard,
    getHardwareRam, getHardwareGraphics,
    hardware: { cpus, motherboards, rams, graphics },
    buildParts, setBuildParts
}) => {

    const addBuildParts = (part, priority) => {
        // Update options if exists
        const index = buildParts.findIndex((buildPart) => buildPart.priority === priority);
        if (index !== -1) {
            setBuildParts(buildParts.map((buildPart, i) => {
                if (i === index) {
                    return {
                        ...buildPart,
                        hardware: part
                    }
                }
                return buildPart;
            }));
        }
        else {
            setBuildParts([...buildParts, {
                hardware: part,
                priority
            }]);
        }
    };

    return (
        <div className="email-form">
            <Suspense fallback={<div>Loading...</div>}>
                <BuildPartsContext.Provider value={{ addBuildParts }}>
                    <BuildPart category="CPU" actionDispatch={getHardwareCPU}
                        datum={cpus} priority={0}
                    />
                    <BuildPart category="Motherboard" actionDispatch={getHardwareMotherboard}
                        datum={motherboards} priority={1}
                    />
                    <BuildPart category="Ram" actionDispatch={getHardwareRam}
                        datum={rams} priority={2}
                    />
                    <BuildPart category="Graphics" actionDispatch={getHardwareGraphics}
                        datum={graphics} priority={3}/>
                </BuildPartsContext.Provider>
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