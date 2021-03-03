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

export const queryFilters = new QueryFilters();

const Explorer = (props) => {
    var queryPresent = false;
    var urlParams = new URLSearchParams(props.location.search);
    queryTypes.forEach(queryType => {
        var queryValue = urlParams.get(queryType);
        // assuming mutually exclusive parameters
        if (queryValue) {
            queryFilters.queryType = queryType;
            queryFilters.queryValue = queryValue;
            queryPresent = true;
        }
    });
    var identityParamStr = urlParams.get("identity");
    if (identityParamStr) queryFilters.identityLims = parseRange(identityParamStr, identityDomain);
    var coverageParamStr = urlParams.get("coverage");
    if (coverageParamStr) queryFilters.scoreLims = parseRange(coverageParamStr, coverageDomain);

    const willMount = React.useRef(true);
    if (willMount.current) {
        // set defaults
        if (!queryFilters.identityLims) { queryFilters.identityLims = identityDomain }
        if (!queryFilters.scoreLims) { queryFilters.scoreLims = [50, 100] }
        // family must be valid for initial chart render
        if (!queryFilters.queryType) { queryFilters.queryType = "family" }
        if (!queryFilters.queryValue) { queryFilters.queryValue = "Coronaviridae" }
        willMount.current = false;
    }

    // values that change with user input (QueryBuilder)
    const [queryValue, setQueryValue] = React.useState(queryFilters.queryValue);
    const identityLimsRef = React.useRef(queryFilters.identityLims);
    const coverageLimsRef = React.useRef(queryFilters.scoreLims);

    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            <Helmet>
                <title>Serratus | {queryFilters.queryValue ? `${queryFilters.queryValue}` : "Explorer"}</title>
            </Helmet>
            <div className={`flex flex-col px-4 py-2 w-full ${switchSize}:w-1/3 ${classesBoxBorder}`}>
                <QueryBuilder
                    queryFilters={queryFilters}
                    identityLimsRef={identityLimsRef}
                    coverageLimsRef={coverageLimsRef}
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
                        queryType={queryFilters.queryType}
                        queryValue={queryFilters.queryValue}
                        identityLims={queryFilters.identityLims}
                        coverageLims={queryFilters.scoreLims} />
                }
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}

export default Explorer;