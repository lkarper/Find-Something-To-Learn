import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ErrorBoundary extends Component {

    state = {
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    returnToHomepage = () => {
        this.setState({
            hasError: false,
        }, () => this.props.history.push('/'));
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='ErrorBoundary__container'>
                    <h2>Error</h2>
                    <p>Looks like something went wrong.  Check your connection, refresh your browser, and try again.</p>
                    <button type='button' onClick={() => this.returnToHomepage()}>Return to Home Page</button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default withRouter(ErrorBoundary);