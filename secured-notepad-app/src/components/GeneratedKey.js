import React,{ Component } from "react";
import { Button } from "react-bootstrap";
import * as PropTypes from "prop-types";

export class GeneratedKey extends Component {
    static propTypes = {
        keyName: PropTypes.string,
        keyValue: PropTypes.string,
    };
    
    render() {
        return (
            <Button className="btn btn-success" data-toggle="tooltip" data-placement="bottom"
                    title={this.props.keyValue}>
                {this.props.keyName}
            </Button>
        );
    }
}