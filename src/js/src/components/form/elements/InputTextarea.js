import React, {Component} from 'react'
import Element from './Element';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import {EditorState, RichUtils, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Editor} from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
/**
 * @TODO BIG HUGE REFACTOR
 */
export default class InputTextarea extends Element {
    constructor(props) {
        super(props);
        console.log('construct')
        if (this.getValue()) {
            this.state = {
                editorState: this.getEditorStateFromProps(this.props),
            };

        }   else  {
            this.state = {editorState: EditorState.createEmpty()};
        }

    }

    getEditorStateFromProps = (props) => {
        const blocksFromHtml = htmlToDraft('<p>' + this.getValue(props) + '</p>');
        const contentBlocks  = blocksFromHtml.contentBlocks;
        const contentState   = ContentState.createFromBlockArray(contentBlocks);
        return EditorState.createWithContent(contentState);
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }

    onBlur = () => {
        const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        this.props.form.props.handler(this.getFieldName(), markup);
    }

    componentWillReceiveProps(nextProps) {

        console.log('NEW PROPS')
        console.log(this.getValue(nextProps))

        if (this.getValue(nextProps) === '') {
            return true;
        }
        this.setState({
            editorState: this.getEditorStateFromProps(nextProps)
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        console.log('re-render textarea')

        const {editorState} = this.state;
        return (
            <div style={{
                padding: '0.67857143em 1em',
                fontSize: '1em',
                background: '#FFFFFF',
                border: '1px solid rgba(34, 36, 38, 0.15)',
                color: 'rgba(0, 0, 0, 0.87)',
                borderRadius: '0.28571429rem'
            }}><Editor
                onBlur={this.onBlur}
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
            /></div>)
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }


    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <button type="button" className="ui button tiny" onMouseDown={this.onToggle}>
                {this.props.label}
            </button>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};