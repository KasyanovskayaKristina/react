import { Component } from "react";
import { ErrorButton } from "../../interface/interface";
import "./ErrorBoundaryButton.css";
export default class ErrorBoundaryButton extends Component<
  object,
  ErrorButton
> {
  constructor(props: object | Readonly<object>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleButtonClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error("I crashed!");
    }
    return (
      <div className="error__test">
        <button onClick={this.handleButtonClick} className="error-button">
          ERROR
        </button>
      </div>
    );
  }
}
