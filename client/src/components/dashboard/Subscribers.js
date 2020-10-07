import React, { Component } from 'react'
import { getSubscribers } from "../../actions/ArticlesAction"
import { compose } from "redux";
import { connect } from "react-redux";
class Subscribers extends Component {
    state = {
        token: ""
    }
    componentDidMount() {
        let token;
        if (localStorage.getItem("token") === null) {
            token = null
            this.setState({ token })
        } else {
            let val = JSON.parse(localStorage.getItem("token"))
            token = val[0].token
            this.setState({ token })
        }
        this.props.getSubscribers(token)
    }
    render() {
        const { subscribers } = this.props

        return (
            <div className="container">
                <h1>List of subscribers</h1>
                <ul className="list-group my-5">
                    {subscribers ?
                        subscribers.map(subscriber => {
                            return (
                                <li key={subscriber._id} className="list-group-item">
                                    {subscriber.email}
                                </li>
                            )
                        }) : null}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    subscribers: state.article.subscribers
})
export default compose(
    connect(
        mapStateToProps,
        { getSubscribers }
    )
)(Subscribers)