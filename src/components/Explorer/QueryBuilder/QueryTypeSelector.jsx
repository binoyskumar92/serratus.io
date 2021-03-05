import React from 'react';
import InputOption from './InputOption';

const QueryTypeSelector = ({queryType, setQueryType}) => {
    const queryTypeChange = (e) => {
        setQueryType(e.target.value);
    }

    return (
        <div className="flex flex-row justify-center">
            <InputOption value="family" displayText="Family" checked={queryType === "family"} onChange={queryTypeChange} />
            <InputOption value="genbank" displayText="GenBank" checked={queryType === "genbank"} onChange={queryTypeChange} />
            <InputOption value="run" displayText="SRA Run" checked={queryType === "run"} onChange={queryTypeChange} />
        </div>
    )
}

export default QueryTypeSelector;
