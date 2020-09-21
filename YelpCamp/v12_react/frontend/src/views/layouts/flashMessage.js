import React from "react";
import FlashMessage from 'react-flash-message';

const FlashMessageLayout = (props) => {
  switch (props.type) {
    case "success":
      return (
        <FlashMessage duration={5000}>
          <div className="alert alert-success" role="alert">
            {props.message}
          </div>
        </FlashMessage>
      );
      break;

    case "info":
      return (
        <FlashMessage duration={5000}>
          <div className="alert alert-info" role="alert">
            {props.message}
          </div>
        </FlashMessage>
      );
      break;

    case "warning":
      return (
        <FlashMessage duration={5000}>
          <div className="alert alert-warning" role="alert">
            {props.message}
          </div>
        </FlashMessage>
      );
      break;

      case "danger":
        return (
          <FlashMessage duration={5000}>
            <div className="alert alert-danger" role="alert">
              {props.message}
            </div>
          </FlashMessage>
        );
        break;

      default:
        return (
          <FlashMessage duration={5000}>
            <div className="alert alert-danger" role="alert">
              {props.message}
            </div>
          </FlashMessage>
        );
  }

}

export default FlashMessageLayout;