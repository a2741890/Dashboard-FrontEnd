import React, { Component } from 'react';
import axiosInstance from '../../customAxios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        post: null
    }

    componentDidUpdate() {
        if (this.props.selectedId !== null) {
            if (this.state.post === null
                || (this.state.post && this.state.post.id !== this.props.selectedId)) {
                axiosInstance.get('/posts/' + this.props.selectedId)
                    .then(response => {
                        this.setState({ post: response.data })
                    })
            }
        }

    }

    deletePostHandler = () => {
        axiosInstance.delete('/posts/' + this.props.selectedId)
            .then(response => {
                console.log(response);
            })
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

        //點了以後資料還沒有回來所以顯示loading給使用者
        if (this.props.selectedId) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }

        //等post回傳以後有值再寫入一個完整的post
        if (this.state.post) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <div className="Edit">
                        <button
                            className="Delete"
                            onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;