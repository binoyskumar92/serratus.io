import React from 'react';
import ExploreChart, {
    renderChart,
    updateData,
    updateXLims,
    updateYLims,
    updateZLims
} from './ExploreChart';
import {
    identityDomain,
    coverageDomain,
    constructRangeStr,
    resultSectionId
} from "../ExplorerHelpers";
import {
    ExternalLink,
    helpIcon
} from '../../../CommonHelpers';
import allFamilyData from '../data/SerratusIO_scoreID.json';
import QueryTypeSelector from './QueryTypeSelector';
import QueryValueSelector from './QueryValueSelector';
import FilterSliders from './FilterSliders';

const QueryBuilder = (props) => {
    const queryFilters = props.queryFilters;
    const sliderIdentityLimsRef = props.identityLimsRef;
    const sliderCoverageLimsRef = props.coverageLimsRef;
    const [queryType, setQueryType] = React.useState(queryFilters.queryType);
    // const queryType = queryFilters.queryType;
    const [queryValue, setQueryValue] = React.useState(queryFilters.queryValue);
    // const queryValue = props.queryValue;
    // const setQueryValue = props.setQueryValue;

    const [initialIdentityLims] = React.useState(props.identityLimsRef.current);
    const [initialCoverageLims] = React.useState(props.coverageLimsRef.current);
    const [initialQueryType] = React.useState(queryFilters.queryType);
    const [initialQueryValue] = React.useState(queryFilters.queryValue);

    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        setQueryValue(initialQueryValue);
    }, [initialQueryType, initialQueryValue])

    // initial chart render
    const familyRendered = React.useRef(false);
    if (!familyRendered.current && queryType === 'family') {
        var data = allFamilyData[queryValue];
        renderChart(data, identityDomain, coverageDomain);
        updateXLims(...initialIdentityLims);
        updateZLims(...initialCoverageLims);
        updateYLims();
        familyRendered.current = true;
    }

    // update chart for subsequent family changes
    React.useEffect(() => {
        var data = allFamilyData[queryValue];
        if (!data) { return; }
        updateData(data);
        updateYLims();
    }, [queryValue]);

    const goToQuery = () => {
        if (!queryValue) {
            setErrorMessage("Enter a query value.");
            return;
        }
        let params = new URLSearchParams();
        params.set(queryType, queryValue);
        if (queryType !== 'run') {
            var identity = constructRangeStr(...sliderIdentityLimsRef.current);
            params.set('identity', identity);
            var coverage = constructRangeStr(...sliderCoverageLimsRef.current);
            params.set('coverage', coverage);
        }
        var queryUrl = `explorer?${params.toString()}#${resultSectionId}`;
        window.location.href = queryUrl;
    }

    const chartVisibility = (queryType === "family" ? "visible" : "hidden");
    const slidersVisibility = (queryType !== "run" ? "visible" : "hidden");

    return (
        <div className="flex-grow">
            <QueryTypeSelector
                queryType={queryType}
                setQueryType={setQueryType} />
            <QueryValueSelector
                queryType={queryType}
                queryValue={queryValue}
                setQueryValue={setQueryValue}
                goToQuery={goToQuery} />
            <div className="max-w-xl m-auto">
                <div className={`${slidersVisibility} mb-10`}>
                    <FilterSliders
                        sliderIdentityLimsRef={sliderIdentityLimsRef}
                        sliderCoverageLimsRef={sliderCoverageLimsRef} />
                </div>
                <div className={chartVisibility}>
                    <ExploreChart />
                </div>
                <div className="flex flex-row justify-center items-center mt-4">
                    <button className="w-full m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4"
                        onClick={goToQuery}>
                        View Matches
                    </button>
                    <ExternalLink className='ml-2 mb-1' title='Open tutorial on project wiki' href='https://github.com/ababaian/serratus/wiki/Serratus-Explorer'>{helpIcon}</ExternalLink>
                </div>
            </div>
            <div className="mt-1 text-center text-red-700">{errorMessage}</div>
        </div>
    )
}

export default QueryBuilder;
