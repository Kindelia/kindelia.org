import React from "react";
import fetch from "../fetch";

export default class End extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await fetch('/register', {
      method: 'POST',
      data: {
        user: this.props.user,
        timestamp: Number(new Date()),
        action: {
          type: 'END'
        }
      }
    });
  }

  render() {
    return (
      <>
        <h1>Thanks for Participate!</h1>
      </>
    );
  }
}