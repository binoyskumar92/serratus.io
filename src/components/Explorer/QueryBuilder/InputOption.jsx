import React from 'react';

const InputOption = (props) => {
    return (
        <div className="mx-2">
            <input type="radio" name="querytype" value={props.value} checked={props.checked}
                onChange={props.onChange} />
            <span className="ml-1">{props.displayText}</span>
        </div>
    )
}

export default InputOption;
