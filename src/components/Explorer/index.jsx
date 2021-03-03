import React from 'react';
import { Helmet } from 'react-helmet';
import QueryBuilder from './QueryBuilder';
import Intro from './Intro';
import Result from './Result';
import DataReference from './DataReference';
import { classesBoxBorder } from '../../CommonHelpers';
import {
    identityDomain,
    coverageDomain,
    parseRange,
    queryTypes,
    resultSectionId,
    QueryFilters,
} from "./ExplorerHelpers";

const switchSize = "lg";  // Tailwind prefix to switch between landscape/portrait mode

const Explorer = (props) => {
    const queryFilters = React.useRef(new QueryFilters());

    var queryPresent = false;
    var urlParams = new URLSearchParams(props.location.search);
    queryTypes.forEach(queryType => {
        var queryValue = urlParams.get(queryType);
        // assuming mutually exclusive parameters
        if (queryValue) {
            queryFilters.current.queryType = queryType;
            queryFilters.current.queryValue = queryValue;
            queryPresent = true;
        }
    });
    var identityParamStr = urlParams.get("identity");
    if (identityParamStr) queryFilters.current.identityLims = parseRange(identityParamStr, identityDomain);
    var coverageParamStr = urlParams.get("coverage");
    if (coverageParamStr) queryFilters.current.scoreLims = parseRange(coverageParamStr, coverageDomain);

    const willMount = React.useRef(true);
    if (willMount.current) {
        // set defaults
        if (!queryFilters.current.identityLims) { queryFilters.current.identityLims = identityDomain }
        if (!queryFilters.current.scoreLims) { queryFilters.current.scoreLims = [50, 100] }
        // family must be valid for initial chart render
        if (!queryFilters.current.queryType) { queryFilters.current.queryType = "family" }
        if (!queryFilters.current.queryValue) { queryFilters.current.queryValue = "Coronaviridae" }
        willMount.current = false;
    }

    // values that change with user input (QueryBuilder)
    const [queryType, setQueryType] = React.useState(queryFilters.current.queryType);
    const [queryValue, setQueryValue] = React.useState(queryFilters.current.queryValue);
    const identityLimsRef = React.useRef(queryFilters.current.identityLims);
    const coverageLimsRef = React.useRef(queryFilters.current.scoreLims);

    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            <Helmet>
                <title>Serratus | {queryFilters.current.queryValue ? `${queryFilters.current.queryValue}` : "Explorer"}</title>
            </Helmet>
            <div className={`flex flex-col px-4 py-2 w-full ${switchSize}:w-1/3 ${classesBoxBorder}`}>
                <QueryBuilder
                    identityLimsRef={identityLimsRef}
                    coverageLimsRef={coverageLimsRef}
                    queryType={queryType}
                    setQueryType={setQueryType}
                    queryValue={queryValue}
                    setQueryValue={setQueryValue} />
                <div className={`hidden ${switchSize}:block mb-auto text-center`}>
                    <DataReference />
                </div>
            </div>
            <div className={`h-0 sm:h-3 ${switchSize}:w-3`} />
            <hr className="sm:hidden" />
            <div id={resultSectionId} className={`p-4 w-full ${switchSize}:w-2/3 ${classesBoxBorder}`}>
                {!queryPresent ?
                    <Intro /> :
                    <Result
                        queryType={queryFilters.current.queryType}
                        queryValue={queryFilters.current.queryValue}
                        identityLims={queryFilters.current.identityLims}
                        coverageLims={queryFilters.current.scoreLims} />
                }
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}

export default Explorer;