import React from 'react';
import FilterSlider from './FilterSlider';
import {
    updateXLims,
    updateYLims,
    updateZLims
} from './ExploreChart';
import {
    identityDomain,
    coverageDomain,
    viridisCssGradient,
} from "../ExplorerHelpers";

const FilterSliders = ({sliderIdentityLimsRef, sliderCoverageLimsRef}) => {
    // functions to update chart with slider changes
    const updateX = () => { updateXLims(...sliderIdentityLimsRef.current) }
    const updateZ = () => { updateZLims(...sliderCoverageLimsRef.current) }
    const updateY = () => { updateYLims(500) }

    return (
        <div>
            <div className="mx-2">
                <div className="pt-6 text-center">Alignment identity (%)</div>
                <FilterSlider id="sliderIdentity"
                    sliderDomain={identityDomain}
                    sliderLimsRef={sliderIdentityLimsRef}
                    onChange={updateX}
                    onTouchEnd={updateY} />
            </div>
            <div className="mx-2">
                <div className="pt-6 text-center">Score (coverage)</div>
                <FilterSlider id="sliderCoverage"
                    sliderDomain={coverageDomain}
                    sliderLimsRef={sliderCoverageLimsRef}
                    linearGradientString={viridisCssGradient}
                    onChange={updateZ}
                    onTouchEnd={updateY} />
            </div>
        </div>
    )
}

export default FilterSliders;
