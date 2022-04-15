import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, CLOSE_LOADER, SET_MESSAGE } from '../store/types/PostTypes';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPosts } from '../store/asyncMethods/PostMethods';
import { Link, useParams } from 'react-router-dom';
import { BsPencil, BsTrash } from "react-icons/bs";
import Loader from './Loader';
import Pagination from './Pagination';
import axios from 'axios';

const Dashboard = () => {
    const { redirect, message, loading } = useSelector(state => state.PostReducer);
    const { posts, count, perPage } = useSelector(state => state.FetchPosts);

    let { page } = useParams();
    if (page === undefined) {
        page = 1;
    }
    const dispatch = useDispatch();

    const deletePost = async (id) => {
        const confirm = window.confirm("Are you really want to delete this post?")
        if (confirm) {
            dispatch({ type: SET_LOADER });
            try {
                const { data: { msg } } = await axios.get(`http://localhost:8000/delete/${id}`);
                dispatch(fetchPosts(page)); //id send to PostMethods fetchPosts function
                dispatch({ type: SET_MESSAGE, payload: msg });
            } catch (error) {
                dispatch({ type: CLOSE_LOADER });
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE });
        }
    }, [message]);

    useEffect(() => {
        dispatch(fetchPosts(page)); //id send to PostMethods fetchPosts function
    }, [page]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
            <div className='container mt-100'>
                <div className='row ml-minus-15 mr-minus-15'>
                    <div className='col-1 p-15'></div>
                    <div className='col-12 p-15'>
                        <Link to="/create"><button style={{ color: "white", background: 'blue', fontSize: '20px', borderRadius: '5px', padding: '10px', margin: '10px' }}>Add Row+</button></Link>
                        {!loading ? posts.length > 0 ? posts.map(post => (
                            <div className='dashboard_posts' key={post._id}>
                                <div className='dashboard_posts_title'>
                                    <h3>{post.company_name}</h3>
                                </div>
                                <div className='dashboard_posts_links'>
                                    <Link to={`/edit/${post._id}`}>
                                        <BsPencil className='icon' />
                                    </Link>
                                    <BsTrash className='icon' onClick={() => deletePost(post._id)} />
                                </div>
                            </div>
                        )) : `you don't have any posts` : (<Loader />)}
                        <Pagination path="home" page={page} perPage={perPage} count={count} /> {/* passing props to Pagination component  */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;