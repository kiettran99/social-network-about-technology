import React, { Fragment } from 'react';
import BuildParts from '../build-parts/BuildParts';
import CreateShop from './shop/CreateShop';

const CreateAddons = ({ props: { isShowBuildParts, buildPartsProps,
    isShowShop, shop, setShop
} }) => {
    return (
        <Fragment>
            {isShowBuildParts && <BuildParts {...buildPartsProps} />}
            {isShowShop && <CreateShop shop={shop} setShop={setShop} />}
        </Fragment>
    );
};

export default React.memo(CreateAddons);