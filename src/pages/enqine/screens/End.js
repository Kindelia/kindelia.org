import React from "react";
import fetch from "../fetch";
import { storageSetEnd } from "../utils/storage";

export default class End extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const endTime = Number(new Date());
    fetch('/register', {
      method: 'POST',
      data: {
        user: this.props.user,
        timestamp: endTime,
        action: {
          type: 'END'
        }
      }
    });
    storageSetEnd(this.props.user, endTime);
  }

  render() {
    return (
      <>
        <h1>Thanks for Participate!</h1>
      </>
    );
  }
}