import React,{ Component } from "react";
import { Button } from "react-bootstrap";
import {GeneratedKey} from "./GeneratedKey";
import {trimRsaPrivateKey, trimRsaPublicKey} from "../utils/utils";
import * as PropTypes from "prop-types";

export class GenerationRSAKey extends Component {
    static propTypes = {
        showGenerateKeyButton: PropTypes.bool,
        showRsaKey: PropTypes.bool,
        generateKeyPair: PropTypes.func
    };
    
    render() {
        return (
                <div className='row justify-content-start'>
                    {this.props.showGenerateKeyButton &&
                    <Button
                        className="col-5"
                        onClick={this.props.generateKeyPair}
                        variant="outline-success">
                        Generate RSA key
                    </Button>
                    }
                    {this.props.showRsaKey && <div className='row justify-content-around'>
                                <div className='col-4'>
                                    <GeneratedKey 
                                        keyName="Generated public RSA key"
                                        keyValue={trimRsaPublicKey(localStorage.getItem('publicKeyRSA'))}
                                    />
                                </div>
                                <div className='col-4'>
                                    <GeneratedKey
                                        keyName="Generated private RSA key"
                                        keyValue={trimRsaPrivateKey(localStorage.getItem('privateKeyRSA'))}
                                    />
                                </div>
                        </div>
                    }
                </div>
        );
    };
}