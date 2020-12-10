import React from 'react';

const PartsItem = ({ hardware: {
    hardware: { category, value, brand, part,
        type, link
    } }
}) => {
    return (
        <tr>
            <td className scope="row">
                <p class="font-weight-bold">{category}</p>
                <p className="font-italic">${value}</p>
            </td>
            <td className>
                <p className="font-weight-bold">{brand} - <a href={link}>{part}</a></p>
                <p className="font-italic">{type}</p>
            </td>
            <td className><i className="ri-check-line ri-2x text-success" /></td>
        </tr>
    );
};

export default PartsItem;