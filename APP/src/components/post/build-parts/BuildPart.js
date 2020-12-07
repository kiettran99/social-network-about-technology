import React, { useEffect } from 'react';
import Select from 'react-select'

const BuildPart = ({ actionDispatch, category, datum }) => {

    useEffect(() => {
        actionDispatch();
    }, [actionDispatch]);

    const onChange = (input) => {
        actionDispatch(input);
    }

    return (
        <div className="form-group">
            <label className="col-form-label">{category}</label>
            <Select cacheOptions defaultOptions={datum}
                options={datum}
                onInputChange={onChange}
            />
        </div>
    );
};

export default BuildPart;