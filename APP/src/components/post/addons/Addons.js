import React, { lazy, Suspense } from 'react';

const PartsDescription = lazy(() => import('../parts-list/PartsDescription'));

const Addons = ({ buildParts }) => {
    return (
        <Suspense fallback={<div></div>}>
            {buildParts && (
                <div className="mt-3">
                    {/* Component build pc part */}
                    <PartsDescription buildParts={buildParts} />
                </div>
            )}
        </Suspense>
    );
};

export default React.memo(Addons);