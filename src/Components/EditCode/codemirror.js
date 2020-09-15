import React, {useEffect, useRef} from "react"
import CodeMirror from "codemirror"

const CodeMirrorReact = ({
    options={},
    language="javascript",
    customTheme
}) => {
    const inputElement = useRef();
    useEffect(()=>{
        CodeMirror.fromTextArea(inputElement.current, options);
    }, [options]);

    return <textarea ref={inputElement} defaultValue={""} />
}

export default CodeMirrorReact;