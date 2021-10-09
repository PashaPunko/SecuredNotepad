import React,{ Component } from "react";
import { Button } from "react-bootstrap";
import {GeneratedKey} from "./GeneratedKey";
import * as PropTypes from "prop-types";

export class SessionKey extends Component {
    static propTypes = {
        showSessionKeyButton: PropTypes.bool,
        showSessionKey: PropTypes.bool,
        getSessionKey: PropTypes.func
    };

    render() {
        return (
                <div className='row justify-content-center'>
                    {this.props.showSessionKeyButton &&
                    <Button
                        onClick={this.props.getSessionKey}
                        variant="outline-success"
                        className='col-10'>
                        Get session key
                    </Button>}
                    {this.props.showSessionKey &&
                        <div className='col-7 justify-content-center'>
                            <GeneratedKey
                                keyName="Generated session key"
                                keyValue={localStorage.getItem('aesKey')}
                            />
                        </div>
                    }
                </div>
        );
    }
}