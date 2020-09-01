import React from "react";
import { withRouter } from "react-router-dom";
import PostPresenter from "./PostPresenter";
import {useQuery } from "react-apollo-hooks";
import { MY_PROFILE, SEE_FULL_POST } from "../../Components/Queries";

export default withRouter(({match: {params: {id}}}) => {
    const context= {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    //const [isLikedS,setIsLiked] = useState(isLiked);
    //const [likeCountS, setLikeCount] = useState(likeCount);
    //const [selfComments, setSelfComments] = useState([]);
    //const comment = useInput("");
    // eslint-disable-next-line
    const {data2} = useQuery(MY_PROFILE,{
        context
        }
    );
    const {data,loading} =  useQuery(SEE_FULL_POST,{
        variables: {id},
        context
    });
    //const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    //    variables: {postId: id},
    //    context
    //    }
    //);
    //const [addCommentMutation] = useMutation(ADD_COMMENT,{
    //    variables:{
    //        postId: id,
    //        text: comment.value
    //    },
    //    context
    //    }
    //);

    //useEffect(()=> {
    //    slide()
    //},[slide]);

    //const toggleLike = async () => {
    //    if(isLikedS === true){
    //        setIsLiked(false);
    //        setLikeCount(likeCountS-1);
    //    }else{
    //        setIsLiked(true);
    //        setLikeCount(likeCountS+1);
    //    }
    //        await toggleLikeMutation()
    //}

    //const onKeyPress= async event => {
    //    const {which} = event;
    //    if(comment.value!==""){
    //        if(which === 13){
    //            event.preventDefault();
    //            try{
    //                    const{
    //                        data:{addComment}
    //                    }= await addCommentMutation();
    //                    setSelfComments([...selfComments,addComment]);
    //                    comment.setValue("");
    //                } catch{
    //                    toast.error("Can't send comment.");
    //                }
    //            }
    //    }
    //};
    return <PostPresenter loading={loading} data={data}/>
});
