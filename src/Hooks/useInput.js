import {useState} from "react";


export default (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const onChange= (e,value) => {
    /*    const  {
            target: {value}
        } = e;
        setValue(value);
    */
        setValue(e.target.value);
    };

    return {value, onChange, setValue};
} 
