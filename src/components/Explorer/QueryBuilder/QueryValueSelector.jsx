import React from 'react';
import SelectFamily from './SelectFamily';
import SelectGenbank from './SelectGenbank';
import SearchRun from './SearchRun';

const QueryValueSelector = ({queryType, queryValue, setQueryValue, goToQuery}) => {
    const [family, setFamily] = React.useState('Coronaviridae');
    const [genbank, setGenbank] = React.useState();
    const [run, setRun] = React.useState();

    // update query value
    React.useEffect(() => {
        switch (queryType) {
            case "family": setQueryValue(family); break;
            case "genbank": setQueryValue(genbank); break;
            case "run": setQueryValue(run); break;
            default:
        }
    }, [family, genbank, run, queryType, setQueryValue]);

    return (
        <div>
            <div className={queryType === "family" ? "visible" : "hidden"}>
                <SelectFamily
                    family={family}
                    setFamily={setFamily} />
            </div>
            <div className={queryType === "genbank" ? "visible" : "hidden"}>
                <SelectGenbank
                    genbank={genbank}
                    setGenbank={setGenbank} />
            </div>
            <div className={queryType === "run" ? "visible" : "hidden"}>
                <SearchRun
                    run={run}
                    setRun={setRun}
                    onEnter={goToQuery} />
            </div>
        </div>
    )
}

export default QueryValueSelector;
