import {gql} from "apollo-boost";

export const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
export const MY_PROFILE= gql`
    {
        seeMyProfile{
            username
        }
    }
`;

export const SEE_FEED=gql`
    {
        seeFeed{
            id
            location
            caption
            user{
                id
                username
                avatar
            }
            files{
                id
                url
            }
            likeCount
            isLiked
            comments{
                id
                text
                user{
                    id
                    username
                }
            }
            createdAt
        }
    }
`;

export const TOGGLE_LIKE = gql`
    mutation toggleLike($postId: String!){
        toggleLike(postId: $postId)
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($postId: String!, $text: String!){
        addComment(postId: $postId, text:$text){
            id
            text
            user{
                username
            }
        }
    }
`;

export const SEARCH = gql`
    query search($term:String!){
        searchByPost(term:$term){
            id
            files{
                url
            }
            likeCount
            commentCount
        }
        searchByUser(term:$term){
            id
            avatar
            username
            isFollowing
            isSelf
        }
    }
`;

export const FOLLOW = gql`
    mutation Follow($id:String!){
        Follow(id:$id)
    }
`;

export const UNFOLLOW = gql`
    mutation unFollow($id:String!){
        unFollow(id:$id)
    }
`;

export const SEE_USER = gql`
    query seeUser($username: String!){
        seeUser(username:$username){
            id
            avatar
            username
            fullName
            isFollowing
            isSelf
            bio
            followingCount
            followersCount
            postCount
            posts{
                id
                files{
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

export const LOG_OUT = gql`
    mutation logUserOut($token: String!){
        logUserOut(token:$token) @client
    }
`;