import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, updateAction } from "../store/asyncMethods/PostMethods";
import { POST_RESET, RESET_UPDATE, RESET_UPDATE_ERRORS } from '../store/types/PostTypes';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader';

const Edit = () => {
    const { push } = useHistory();
    const { id } = useParams();
    const [state, setState] = useState({
        company_name: '',
        company_desc: '',
        contact: '',
        email: '',
        // company_state:'',
        // company_city:''
    });
    const dispatch = useDispatch(); //dispatch used for perform action
    const { loading, redirect } = useSelector((state) => state.PostReducer);
    const { post, postStatus } = useSelector((state) => state.FetchPost); //import from main redux file i.e index.js redux file
    const { editErrors } = useSelector((state) => state.UpdatePost);

    useEffect(() => {
        if (postStatus) {
            setState({
                // title: post.title,
                // description: post.description,
                company_name: post.company_name,
                company_desc: post.company_desc,
                contact: post.contact,
                email: post.email,
                // company_state:'',
                // company_city:''
            });
            dispatch({ type: POST_RESET });
        } else {
            dispatch(fetchPost(id));
        }
    }, [post]);

    const updatePost = (e) => {
        e.preventDefault();
        dispatch(updateAction({
            // title: state.title,
            // description: state.description,
            company_name: state.company_name,
            company_desc: state.company_desc,
            contact: state.contact,
            email: state.email,
            id: post._id,
        }));
    }

    useEffect(() => {
        if (editErrors.length !== 0) {
            editErrors.map((error) => toast.error(error.msg));
            dispatch({ type: RESET_UPDATE_ERRORS });
        }
    }, [editErrors]); //if editErrors is updated then this useEffect is run

    useEffect(() => {
        if (redirect) {
            push('/');
        }
    }, [redirect]);

    return !loading ? (
        <div className='mt-100'>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' }, }} />
            <div className="container">
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-6">
                        <div className="card">

                            <h3 className="card_h3">Edit Data</h3>
                            <form onSubmit={updatePost}>

                                <div className="group">
                                    <label htmlFor="title">Company Name</label>
                                    <input type="text" name="company_name" id="company_name"
                                        value={state.company_name} onChange={(e) => setState({ ...state, company_name: e.target.value })} className="group_control" placeholder="Enter Title" />
                                </div>

                                <div className="group">
                                    <label htmlFor="company_desc">Company Description</label>
                                    <input type="text" name="company_desc" className="group_control" id="company_name"
                                        value={state.company_desc} onChange={(e) => setState({ ...state, company_desc: e.target.value })} placeholder="Enter description" />
                                </div>

                                <div className="group">
                                    <label htmlFor="contact">contact Number</label>
                                    <input type="number" name="contact" className="group_control" id="company_name"
                                        value={state.contact} onChange={(e) => setState({ ...state, contact: e.target.value })} placeholder="Enter description" />
                                </div>

                                <div className="group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" className="group_control" id="company_name"
                                        value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} placeholder="Enter description" />
                                </div>

                                <div className="group">
                                    <input type="submit" className="btn btn-default btn-block"
                                        value='Edit Post' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>) : (
        <Loader />
    );
};
export default Edit;