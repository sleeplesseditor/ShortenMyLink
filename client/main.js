import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import LinkCreate from './components/LinkCreate';
import { Links } from '../imports/collections/links';
import LinkList from './components/LinkList';

const App = () => {
    return (
        <div className="container">
            <Header />
            <LinkCreate />
            <LinkList />
        </div>
    );
}

Meteor.startup(() => {
    ReactDOM.render(<App />, document.querySelector('.render-target'));
});