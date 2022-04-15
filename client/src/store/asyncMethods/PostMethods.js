import axios from 'axios';
import {
    CREATE_ERRORS,
    REMOVE_ERRORS,
    SET_LOADER,
    CLOSE_LOADER,
    REDIRECT_TRUE,
    REDIRECT_FALSE,
    SET_MESSAGE,
    REMOVE_MESSAGE,
    SET_POSTS,
    SET_POST,
    POST_REQUEST,
    POST_RESET,
    SET_UPDATE_ERRORS,
    RESET_UPDATE_ERRORS,
    UPDATE_IMAGE_ERRORS,
    RESET_UPDATE_IMAGE_ERRORS,
    SET_DETAILS,
    COMMENTS
} from "../types/PostTypes";

export const createAction = (postData) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        try {
            const { data: { msg } } = await axios.post('http://localhost:8000/create_post', postData);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REMOVE_ERRORS });
            dispatch({ type: REDIRECT_TRUE });
            console.log(msg);
            dispatch({ type: SET_MESSAGE, payload: msg });
        } catch (error) {
            console.log(error.response);
            const { errors } = error.response.data;
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: CREATE_ERRORS, payload: errors });
        }
    }
}

export const fetchPosts = (page) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        try {
            const { data: { response, count, perPage }, } = await axios.get(`http://localhost:8000/posts/${page}`);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_POSTS, payload: { response, count, perPage } });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
        }
    }
}

export const fetchPost = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        try {
            const { data: { post } } = await axios.get(`http://localhost:8000/post/${id}`);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_POST, payload: post });
            dispatch({ type: POST_REQUEST });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error.message);
        }
    }
}

export const updateAction = (editData) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post('http://localhost:8000/update', editData);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: SET_MESSAGE, payload: data.msg });
        } catch (error) {
            const {
                response: {
                    data: { errors },
                },
            } = error;
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_UPDATE_ERRORS, payload: errors });
            console.log(error.response);
        }
    };
};

// export const postDetails = (id) => {
//     return async (dispatch) => {
//         dispatch({ type: SET_LOADER });
//         try {
//             const { data: { post, comments } } = await axios.get(`http://localhost:8000/details/${id}`);
//             dispatch({ type: CLOSE_LOADER });
//             dispatch({ type: SET_DETAILS, payload: post });
//             dispatch({ type: COMMENTS, payload: comments });
//         } catch (error) {
//             dispatch({ type: CLOSE_LOADER });
//             console.log(error);
//         }
//     }
// }