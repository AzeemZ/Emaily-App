import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payment from "components/Payment";

class Header extends Component {
  renderAuthContent() {
    switch (this.props.auth) {
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
            <li style={{ margin: "0 10px" }}>
              Credits: {this.props.auth.credits}
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </Fragment>
        );
    }
  }

  render() {
    const logoStyle = {
      position: "absolute",
      color: "#fff",
      display: "inline-block",
      fontSize: "2.1rem",
      padding: 0,
      marginLeft: 10
    };

    return (
      <nav className="light-green darken-3">
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/surveys" : "/"} style={logoStyle}>
            Emaily
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderAuthContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
