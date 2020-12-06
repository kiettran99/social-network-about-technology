import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async'

const BuildPart = ({ actionDispatch, category, datum }) => {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        actionDispatch();
    }, [actionDispatch]);

    useEffect(() => {
        if (datum) {
            setOptions(datum.map(data => {
                return {
                    value: data._id,
                    label: data.part
                };
            }))
        }
    }, [datum]);

    return (
        <div className="form-group">
            <label className="col-form-label">{category}</label>
            <AsyncSelect cacheOptions defaultOptions={options}
            />
        </div>
    );
};

export default BuildPart;