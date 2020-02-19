import React from 'react';
import './App.css';

import IndexPage from './pages/index/index';
import TreeMap from './pages/treemap/treemap';
import Pie from './pages/pie/pie';

import { hot } from 'react-hot-loader';

import reducer from './reducers/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import { BrowserRouter, Route } from 'react-router-dom';

const createLocalStore = function() {
	if (process.env.NODE_ENV === 'production') {
		return createStore(reducer, applyMiddleware(promiseMiddleware));
	} else {
		return createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));
	}
};
let store = createLocalStore();

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter >
				<div id="container">
          <Route path={'/treemap'} component={TreeMap} />
					<Route path={'/pie'} component={Pie} />
					<Route exact path={'/'} component={IndexPage} />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default hot(module)(App);
