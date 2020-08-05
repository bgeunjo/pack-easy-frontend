import React, {useState, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT, MY_PROFILE } from "../Queries";
import {toast} from "react-toastify";

const PostContainer= ({
    id,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt,
    caption,
    location
}) => {
    const Context= {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const [isLikedS,setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const comment = useInput("");
    // eslint-disable-next-line
    const {data} = useQuery(MY_PROFILE,{
        context: Context
        }
    );
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: {postId: id},
        context: Context
        }
    );
    const [addCommentMutation] = useMutation(ADD_COMMENT,{
        variables:{
            postId: id,
            text: comment.value
        },
        context: Context
        }
    );
    const totalFiles = files.length;

    const slide = useCallback(() => {
        if(currentItem === totalFiles -1 ){
            setTimeout(()=>setCurrentItem(0),3000);
        }else {
            setTimeout(()=>setCurrentItem(currentItem +1),3000);
        }
    },[currentItem,totalFiles]);

    useEffect(()=> {
        slide()
    },[slide]);

    const toggleLike = async () => {
        if(isLikedS === true){
            setIsLiked(false);
            setLikeCount(likeCountS-1);
        }else{
            setIsLiked(true);
            setLikeCount(likeCountS+1);
        }
            await toggleLikeMutation()
    }

    const onKeyPress= async event => {
        const {which} = event;
        if(comment.value!==""){
            if(which === 13){
                event.preventDefault();
                try{
                        const{
                            data:{addComment}
                        }= await addCommentMutation();
                        setSelfComments([...selfComments,addComment]);
                        comment.setValue("");
                    } catch{
                        toast.error("Can't send comment.");
                    }
                }
        }
    };

    return <PostPresenter 
                user={user}
                files={files}
                likeCount={likeCountS}
                isLiked={isLikedS}
                comments={comments}
                createdAt={createdAt}
                newComment={comment}
                setIsLiked={setIsLiked}
                setLikeCount={setLikeCount}
                caption={caption}
                location={location}
                currentItem={currentItem}
                toggleLike={toggleLike}
                onKeyPress={onKeyPress}
                selfComments={selfComments}
                />;

}

PostContainer.propTypes= {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
     }),
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
     })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
        }).isRequired
     })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
    caption: PropTypes.string,
    location: PropTypes.string.isRequired
};

export default PostContainer;