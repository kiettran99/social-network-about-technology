import React, { useEffect, useContext } from 'react';
import Select from 'react-select';
import BuildPartsContext from '../../../contexts/BuildPartsContext';

const BuildPart = ({ actionDispatch, category, datum, priority }) => {

    useEffect(() => {
        actionDispatch();
    }, [actionDispatch]);

    const { addBuildParts } = useContext(BuildPartsContext);

    const onChange = (select) => {
        addBuildParts(select.value, priority);
    }

    // Call API to referesh search
    const onInputChange = (input) => {
        actionDispatch(input);
    };

    return (
        <div className="form-group">
            <label className="col-form-label">{category}</label>
            <Select cacheOptions defaultOptions={datum}
                options={datum}
                onInputChange={onInputChange}
                onChange={onChange}
            />
        </div>
    );
};

export default BuildPart;