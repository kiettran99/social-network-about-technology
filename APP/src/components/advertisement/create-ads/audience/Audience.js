import React from 'react';

const Audience = (props) => {

    const { setPassed,
        fromAge, setFromAge,
        toAge, setToAge,
        gender, setGender,
        message, setMessage, changeCurrentAds } = props;

    // Event handler
    const onChangeFromAge = (e) => {
        const newFromAge = e.target.value;

        if (newFromAge > toAge) {
            setPassed(false);
            changeCurrentAds({
                isPassed: false,
                messageAge: 'Age has from less than to.'
            });
            return setMessage('Age has from less than to.');
        }

        // Clear message and set from age value.
        setMessage(null);
        setPassed(true);
        setFromAge(newFromAge);

        changeCurrentAds({
            isPassed: true,
            messageAge: null,
            fromAge: parseInt(newFromAge)
        });
    };

    const onChangeToAge = (e) => {
        const newToAge = e.target.value;

        if (fromAge > newToAge) {
            setPassed(false);
            changeCurrentAds({
                isPassed: false,
                messageAge: 'Age has from less than to.'
            });
            return setMessage('Age has from less than to.');
        }

        // Clear message and set to age value.
        setMessage(null);
        setPassed(true);
        setToAge(newToAge);

        changeCurrentAds({
            isPassed: true,
            messageAge: null,
            toAge: parseInt(newToAge)
        });
    };

    const onChangeGender = (option) => {
        setGender(option);
        changeCurrentAds({
            gender: option
        });
    };

    return (
        <div className="ad-compaign-3">

            <div className="form-group">
                <h4>Audience</h4>
                <p>Choose User to see this post.</p>
            </div>

            <div className="form-group col-sm-6">
                <label>Age:</label>
                <div className="form-inline">
                    <select className="form-control"
                        name="age"
                        onChange={(e) => onChangeFromAge(e)}
                        defaultValue={fromAge}>
                        <option value={12}>12</option>
                        <option value={17}>17</option>
                        <option value={19} selected>19</option>
                        <option value={33}>33</option>
                        <option value={46}>46</option>
                        <option value={52}>62</option>
                    </select>

                    <span className="mx-2">-</span>

                    <select className="form-control"
                        name="age"
                        onChange={(e) => onChangeToAge(e)}
                        defaultValue={toAge}>
                        <option value={18}>18</option>
                        <option value={32} selected>32</option>
                        <option value={45}>45</option>
                        <option value={62}>62</option>
                        <option value={65}>65 &gt; </option>
                    </select>
                </div>
            </div>

            {message && (
                <div className="form-group">
                    <p className="text-danger">{message}</p>
                </div>
            )}


            <div className="form-group col-sm-6">
                <label>Gender:</label>
                <br />
                <div className="btn-group">
                    <button className={`btn ${gender === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => onChangeGender('all')}>All</button>
                    <button className={`btn ${gender === 'm' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => onChangeGender('m')}>Male</button>
                    <button className={`btn ${gender === 'f' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => onChangeGender('f')}>Female</button>
                </div>
            </div>

            <br />
        </div>
    );
};

export default Audience;