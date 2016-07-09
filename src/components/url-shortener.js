import styles from '../styles/url-shortener.scss';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import FormControl from 'react-bootstrap/lib/FormControl';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import {shortenUrl, setInputUrl} from '../actions/url-shortener-actions';

const InputGroupButton = InputGroup.Button;
const copyKeyModifier =
    navigator.platform.toLowerCase().includes('mac') ? 'Cmd' : 'Ctrl';

const UrlShortener = React.createClass({
    propTypes: {
        onSubmit: PropTypes.func.isRequired,
        onInputUrlChange: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        inputUrl: PropTypes.string,
        outputUrl: PropTypes.string,
        error: PropTypes.string
    },

    render() {
        const {
            inputUrl,
            error,
            outputUrl,
            isLoading,
            onSubmit,
            onInputUrlChange
        } = this.props;
        let output;

        if (outputUrl) {
            const tooltip = (
                <Tooltip id=''>Press {copyKeyModifier}-C to copy</Tooltip>
            );
            output = (
                <div className='animated fadeIn'>
                    <p>Here you go</p>
                    <OverlayTrigger
                        rootClose
                        defaultOverlayShown
                        placement='bottom'
                        trigger='focus'
                        overlay={tooltip}>
                        <input
                            ref='outputUrl'
                            className={styles.outputUrl}
                            type='test'
                            value={outputUrl}
                            readOnly/>
                    </OverlayTrigger>
                </div>
            );
        }

        const errorView = error && (
            <HelpBlock className='animated fadeIn'>{error}</HelpBlock>
        );
        return (
            <Row className='animated fadeInUp'>
                <Col xs={12}>
                    <Form onSubmit={onSubmit}>
                        <FormGroup validationState={error && 'error'}>
                            <InputGroup>
                                <FormControl
                                    ref='inputUrl'
                                    className={styles.inputUrl}
                                    placeholder="Paste url here"
                                    value={inputUrl}
                                    onChange={onInputUrlChange}/>
                                <InputGroupButton>
                                    <Button
                                        className={styles.shortenBtn}
                                        bsStyle='primary'
                                        type='submit'
                                        disabled={isLoading || !inputUrl}>
                                        Shorten
                                    </Button>
                                </InputGroupButton>
                            </InputGroup>
                            {errorView}
                        </FormGroup>
                    </Form>
                    <div className={styles.output}>
                        <Loader
                            lines={8}
                            length={0}
                            width={8}
                            radius={16}
                            color='#286090'
                            className='animated rotateIn'
                            loaded={!isLoading}>
                            {output}
                        </Loader>
                    </div>
                </Col>
            </Row>
        );
    },

    componentDidUpdate(prevProps) {
        const currentOutputUrl = this.props.outputUrl;
        currentOutputUrl
        && prevProps.outputUrl != currentOutputUrl
        && findDOMNode(this.refs.outputUrl).select();
    },

    componentDidMount() {
        findDOMNode(this.refs.inputUrl).focus();
    }
});

function mapStateToProps(state) {
    const urlShortener = state.urlShortener;
    return {
        inputUrl: urlShortener.get('inputUrl'),
        outputUrl: urlShortener.get('outputUrl'),
        error: urlShortener.get('error'),
        isLoading: urlShortener.get('isLoading')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSubmit(event) {
            event.preventDefault();
            dispatch(shortenUrl());
        },
        onInputUrlChange(event) {
            dispatch(setInputUrl(event.target.value));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlShortener);
