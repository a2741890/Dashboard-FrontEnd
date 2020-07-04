import React, { Component } from 'react';
import axiosInstance from '../../customAxios';
import lineChartAxiosInstance from '../../LineChartAxios';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import LineChart from '../../components/LineChart/LineChart';
import './Blog.css';

class Blog extends Component {

    state = {
        postList: [],
        selectedId: null,
        dataPoints: [],
        error: false
    }

    componentDidMount() {
        axiosInstance.get('/posts')
            .then(response => {
                const posts = response.data.splice(0, 4);
                const updatedPosts = posts.map(post => {
                    return (
                        {
                            ...post,
                            author: 'William'
                        }
                    )
                })
                this.setState({ postList: updatedPosts });
            })
            .catch(error => {
                //console.log(error);
                this.setState({ error: true });
            })


        axios.get('https://cors-anywhere.herokuapp.com/https://www.coinspot.com.au/pubapi/latest')
            .then(res => {
                const bitcoinLastPrice = res.data.prices.btc.last;
                const todayArr = new Date().toLocaleString().split(',');
                const date = todayArr[0].split('/').join('');
                const hour = todayArr[1].split(':')[0];
                const minutes = todayArr[1].split(':')[1];
                const newData = {
                    hour: hour,
                    lastPrice: bitcoinLastPrice,
                    minutes: minutes
                }

                // lineChartAxiosInstance.post(`/bitcoin/prices/last/dates/${date}.json`, newData)
                //     .then(res => {
                //     })
                //     .catch(err => {
                //         console.log(err);
                //     })

                lineChartAxiosInstance.get(`/bitcoin/prices/last/dates/${date}.json`)
                    .then(res => {

                        let updatedDataPoints = Object.keys(res.data)
                            .map(key => {
                                return { ...res.data[key] }
                            })

                        updatedDataPoints = {
                            ...updatedDataPoints,
                            newData
                        }
                        this.setState({ dataPoints: updatedDataPoints });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err)
            })


    }

    postClickHandler = (id) => {
        this.setState({ selectedId: id })
    }

    render() {
        const xRange = [...new Array(24)].map((__, index) => index + 1);
        const dataArr = Object.keys(this.state.dataPoints)
            .map(key => {
                return this.state.dataPoints[key].lastPrice
            })
        let posts = <p style={{ alignContent: "center" }}>There are some errors....</p>

        if (!this.state.error) {
            posts = this.state.postList.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postClickHandler(post.id)} />)
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                    <Post>
                        <LineChart
                            xRange = {xRange} 
                            dataArr={dataArr} //自動調整yRange
                            interval={40}
                            widgetSize={250 * 0.8}/>
                    </Post>
                </section>
                <section>
                    <FullPost
                        selectedId={this.state.selectedId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;