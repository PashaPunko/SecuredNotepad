import React,{ Component } from "react";
import { Button } from "react-bootstrap";
import * as PropTypes from "prop-types";
import {getRequest, trimRsaPublicKey} from "../utils/utils";
import aesjs from "aes-js";

export class Document extends Component {
    static propTypes = {
        file: PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            showButton: !!localStorage.getItem('aesKey'),
            document: null
        }
    }
    
    
    getDocument = (filename) => {
        getRequest('security/getdocuments', 'publicKey='+
            encodeURIComponent(trimRsaPublicKey(localStorage.getItem('publicKeyRSA'))) +
            `&file=${filename}`)
            .then(data => {
                let encryptedBytes = new Buffer(data,'base64')

                let aesCbc = new aesjs.ModeOfOperation.cbc(
                    aesjs.utils.hex.toBytes(localStorage.getItem('aesKey')),
                    aesjs.utils.hex.toBytes(localStorage.getItem('iv'))
                );

                let decryptedBytes = aesCbc.decrypt(encryptedBytes);
                let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
                    .replaceAll('\u000f', '')
                    .replaceAll('\u000b', '');
                this.setState({ showButton: false });
                this.setState({ document: decryptedText });
            });
    }
    render() {
        return (
                <div className='row justify-content-center'>
                    {this.state.showButton &&
                         <Button
                             className='col-5'
                             onClick={()=>this.getDocument(this.props.file)}
                             variant="outline-warning">
                             Get document {this.props.file}
                         </Button>
                    }
                    {!!this.state.document && <div>
                                <div className='alert alert-warning'>
                                    {this.state.document}
                                </div>
                        </div>
                    }
                </div>
        );
    }
}