//import CodeMirror from "codemirror"
//import React, {useEffect, useRef} from "react"
//
//const CodeMirrorReact = ({
//    options={},
//    language="javascript",
//    customTheme
//}) => {
//    const inputElement = useRef();
//    useEffect(()=>{
//        CodeMirror.fromTextArea(inputElement.current, options);
//    }, [options]);
//
//    return <textarea ref={inputElement} defaultValue={""} />
//}
//
//export default CodeMirrorReact;