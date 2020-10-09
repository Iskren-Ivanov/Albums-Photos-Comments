import React from 'react';

import './Input.css';

const Input = ({ currentInputType }) => {
    let inputElement = null;

    switch (currentInputType) {
        case 'input': inputElement = <input  {...props} />;
            break;
        case 'textarea': inputElement = <textarea  {...props} />;
            break;
        default: inputElement = <input  {...props} />;
    };

    return (
        <div className="Container">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;