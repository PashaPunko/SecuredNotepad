import React,{ Component } from "react";
import aesjs from "aes-js";
import {getRequest, trimRsaPublicKey} from "../utils/utils";
import NodeRSA from "node-rsa";
import {GenerationRSAKey} from "./GenerationRSAKey";
import {SessionKey} from "./SessionKey";
import {Document} from "./Document";

export class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document:null,
            showSessionKeyButton: !!localStorage.getItem('publicKeyRSA') &&
                !!localStorage.getItem('privateKeyRSA') &&
                !localStorage.getItem('aesKey'),
            showGenerateKeyButton: !localStorage.getItem('publicKeyRSA') ||
                !localStorage.getItem('privateKeyRSA'),
            showSessionKey: !!localStorage.getItem('publicKeyRSA') &&
                !!localStorage.getItem('aesKey'),
            showRsaKey: !!localStorage.getItem('publicKeyRSA') &&
                !!localStorage.getItem('privateKeyRSA')
        };
    }
    generateKeyPair = () => {
        const key = new NodeRSA({ b: 512 });
        localStorage.setItem('publicKeyRSA', key.exportKey('pkcs1-public'));
        localStorage.setItem('privateKeyRSA', key.exportKey('pkcs1-private'));
        this.setState({ showGenerateKeyButton: false });
        this.setState({ showSessionKeyButton: true });
        this.setState({ showRsaKey: true });
    }
    
    getSessionKey = () => {
        getRequest('security/getsessionkey', 'publicKey='+
            encodeURIComponent(trimRsaPublicKey(localStorage.getItem('publicKeyRSA'))))
            .then(data => {
                const key = new NodeRSA(localStorage.getItem('privateKeyRSA'),
                    'pkcs1-private', {encryptionScheme : 'pkcs1'});

                localStorage.setItem('aesKey', key.decrypt(data['AesKey'], 'hex'));
                localStorage.setItem('iv', key.decrypt(data['Iv'], 'hex'));
                this.setState({ showSessionKeyButton: false });
                this.setState({ showGetDocumentButton: true });
                this.setState({ showSessionKey: true });
            });
    }

    
    render() {
        return (
            <div className = "container" >
                <div className = "row text-center" >
                    <h3 > Secured Notepad < /h3>
                </div>

                <div className="row">
                    <div className="col-8 p-3">
                        <GenerationRSAKey 
                            generateKeyPair={this.generateKeyPair}
                            showGenerateKeyButton={this.state.showGenerateKeyButton}
                            showRsaKey={this.state.showRsaKey}
                        />
                    </div>
                    <div className="col-4  p-3">
                        <SessionKey
                            getSessionKey={this.getSessionKey}
                            showSessionKeyButton={this.state.showSessionKeyButton}
                            showSessionKey={this.state.showSessionKey}
                        />
                    </div>
                </div>
                <div className='row justify-content-around'>
                    <div className='col-5'>
                        {this.state.showGetDocumentButton &&
                        <Document file='Text.txt'/>
                        }
                    </div>
                    <div className='col-5'>
                        {this.state.showGetDocumentButton &&
                        <Document file='Document.txt'/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}