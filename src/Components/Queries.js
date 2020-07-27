import {gql} from "apollo-boost";


export const MY_PROFILE= gql`
    {
        seeMyProfile{
            username
        }
    }
`;

export const GET_FEED=gql`
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
