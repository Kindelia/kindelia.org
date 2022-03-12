import { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);

    const blobURL = URL.createObjectURL(
      new Blob(
        [
          "(",
          function () {
            setInterval(function () {
              postMessage(Number(new Date()));
            }, 1000);
          }.toString(),
          ")()",
        ],
        { type: "application/javascript" }
      )
    );

    this.worker = new Worker(blobURL);
    URL.revokeObjectURL(blobURL);
    this.state = {
      actualTime: Number(new Date()),
    };
  }

  componentDidMount() {
    this.worker.onmessage = ({ data }) => {
      this.setState({ ...this.state, actualTime: data });
      if (this.getTime() <= 0) {
        this.worker.terminate();
        this.props.whenAdvance();
      }
    };
  }

  componentWillUnmount() {
    this.worker.terminate();
  }

  getTime() {
    return Math.max((
      this.props.max -
      Math.floor((this.state.actualTime - this.props.startTime) / 1000)
    ), 0);
  }

  render() {
    return (
      <>
        <p>{this.getTime()}</p>
        {this.props.children}
      </>
    );
  }
}
