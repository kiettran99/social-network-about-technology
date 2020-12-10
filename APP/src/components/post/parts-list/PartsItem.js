import React from 'react';

const PartsItem = ({ hardware: {
    hardware: { category, value, brand, part,
        type, link, benchmark, hardwareValue
    } }
}) => {
    return (
        <tr>
            <td scope="row">
                <p className="font-weight-bold">{category}</p>
                <p className="font-italic">${value}</p>
            </td>
            <td>
                <p className="font-weight-bold">{brand} - <a href={link}>{part}</a></p>
                <p className="font-italic">{type}</p>
            </td>
            <td >
                <p className="font-italic">Benchmark: {benchmark}</p>
                <p className="font-italic">Score: {hardwareValue}</p>
            </td>
        </tr >
    );
};

export default PartsItem;