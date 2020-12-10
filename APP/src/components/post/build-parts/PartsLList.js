import React from 'react';
import PartsItem from './PartsItem';

const PartsList = ({ buildParts }) => {
    return (
        <div className="table-responsive">
            <table className="table w-auto">
                <caption>List of parts</caption>
                <thead>
                    <tr>
                        <th className style={{ width: '200px' }} scope="col">CATEGORY / VALUE</th>
                        <th className style={{ width: '400px' }} scope="col">BRAND / PART</th>
                        <th className scope="col" />
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