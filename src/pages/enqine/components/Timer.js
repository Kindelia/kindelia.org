import { Component } from "react";

export default class Timer extends Component {

  constructor(props) {
    super(props);

    const blobURL = URL.createObjectURL(new Blob(['(',
      function(){
        setInterval(function() {
          postMessage('');
        }, 1000);
      }.toString(),
      ')()'
    ],{type:'application/javascript'} ));

    this.worker = new Worker( blobURL );
    URL.revokeObjectURL( blobURL );
  }

  componentDidMount() {
    this.worker.onmessage = () => {
      this.props.setTime(time => time + 1);
      if (this.props.time >= (this.props.max || 5)) {
        this.props.whenAdvance();
        this.worker.terminate();
      }
    }
  }

  componentWillUnmount() {
    this.worker.terminate();
  }

  render() {
    return (
      <>
        <p>{this.props.max - this.props.time}</p>
        {this.props.children}
      </>
    )
  }
}