import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payment from "components/Payment";

const Header = props => {
  const logoStyle = {
    position: "absolute",
    color: "#fff",
    display: "inline-block",
    fontSize: "2.1rem",
    padding: 0,
    marginLeft: 10
  };

  const authContent = () => {
    switch (props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <Fragment>
            <li>
              <Payment className="btn" />
            </li>
            <li style={{ margin: "0 10px" }}>Credits: {props.auth.credits}</li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </Fragment>
        );
    }
  };

  return (
    <nav className="light-green darken-3">
      <div className="nav-wrapper">
        <Link to={props.auth ? "/surveys" : "/"} style={logoStyle}>
          Emaily
        </Link>
        <ul id="nav-mobile" className="right">
          {authContent()}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
