import React from 'react';
import GroupsItem from './GroupsItem';

const Groups = () => {
    return (
        <section className="companies-info">
            <div className="container">
                <div className="company-title">
                    <h3>All Companies</h3>
                </div>{/*company- end*/}
                <div className="companies-list">
                    <div className="row">
                        <GroupsItem />
                    </div>
                </div>{/*companies-list end*/}
            </div>
        </section>
    );
};

export default Groups;