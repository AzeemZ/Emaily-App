import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "actions";
import Header from "components/Header";
import Landing from "components/Landing";
import Dashboard from "components/Dashboard";
import SurveyNew from "components/surveys/SurveyNew";

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route exact path="/surveys/new" component={SurveyNew} />
      </BrowserRouter>
    </div>
  );
};

export default connect(
  null,
  actions
)(App);
