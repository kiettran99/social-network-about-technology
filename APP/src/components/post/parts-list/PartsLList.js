import React from 'react';
import PartsItem from './PartsItem';

const PartsList = ({ buildParts }) => {

    return (
        <div className="table-responsive">
            <table className="table w-auto">
                <caption>List of parts</caption>
                <thead>
                    <tr data-toggle="tooltip" data-placement="right"
                        title="Click to view full descriptions.">
                        <th style={{ width: '200px' }} scope="col">CATEGORY / VALUE</th>
                        <th style={{ width: '390px' }} scope="col">BRAND / PART</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {buildParts && buildParts.hardwares &&
                        buildParts.hardwares.
                            map(hardware => <PartsItem key={hardware._id} hardware={hardware} />)}
                </tbody>
            </table>
        </div>
    );
};

export default PartsList;