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

    var queryTypeFromParam = null;
    var queryValueFromParam = null;
    var identityLimsFromParam = null;
    var coverageLimsFromParam = null;
    var urlParams = new URLSearchParams(props.location.search);
    queryTypes.forEach(queryType => {
        var queryValue = urlParams.get(queryType);
        // assuming mutually exclusive parameters
        if (queryValue) {
            queryTypeFromParam = queryType;
            queryValueFromParam = queryValue;
        }
    });
    var queryPresent = queryTypeFromParam !== null;
    var identityParamStr = urlParams.get("identity");
    if (identityParamStr) identityLimsFromParam = parseRange(identityParamStr, identityDomain);
    var coverageParamStr = urlParams.get("coverage");
    if (coverageParamStr) coverageLimsFromParam = parseRange(coverageParamStr, coverageDomain);

    const willMount = React.useRef(true);
    if (willMount.current) {
        // set defaults
        if (!identityLimsFromParam) { identityLimsFromParam = identityDomain }
        if (!coverageLimsFromParam) { coverageLimsFromParam = [50, 100] }
        // family must be valid for initial chart render
        if (!queryTypeFromParam) { queryTypeFromParam = "family" }
        if (!queryValueFromParam) { queryValueFromParam = "Coronaviridae" }

        queryFilters.current.queryType = queryTypeFromParam;
        queryFilters.current.queryValue = queryValueFromParam;
        [queryFilters.current.identityMin, queryFilters.current.identityMax] = identityLimsFromParam;
        [queryFilters.current.scoreMin, queryFilters.current.scoreMax] = coverageLimsFromParam;

        willMount.current = false;
    }

    // values that change with user input (QueryBuilder)
    const [queryType, setQueryType] = React.useState(queryFilters.current.queryType);
    const [queryValue, setQueryValue] = React.useState(queryFilters.current.queryValue);
    const identityLimsRef = React.useRef([queryFilters.current.identityMin, queryFilters.current.identityMax]);
    const coverageLimsRef = React.useRef([queryFilters.current.scoreMin, queryFilters.current.scoreMax]);

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
                        identityLims={[queryFilters.current.identityMin, queryFilters.current.identityMax]}
                        coverageLims={[queryFilters.current.scoreMin, queryFilters.current.scoreMax]} />
                }
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}

export default Explorer;