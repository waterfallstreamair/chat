/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';
import H1 from '../../components/H1';
import Main from '../../components/Main';

export default function App() {
  return (
    <Main>
      <Helmet titleTemplate="%s - Chat" defaultTitle="Chat v.1.0.0">
        <meta name="description" content="Chat application" />
      </Helmet>
      <H1>Chat v.1.1.0</H1>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Main>
  );
}
