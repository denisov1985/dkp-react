import React, {Component} from 'react'
import Element from './Element';
import {stateToHTML} from 'draft-js-export-html';
import {Editor, EditorState, RichUtils, convertToRaw, convertToHTML} from 'draft-js';

export default class InputTextarea extends Element {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
    }

    onInput = (editorState) => this.setState({editorState});

    _onBoldClick = () => {
        this.onInput(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    toggleBlockType = (blockType) => {
        this.onInput(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    logState = () => {
        const content = this.state.editorState.getCurrentContent();
        console.log(stateToHTML(content));
    };

    render() {
        return (
            <div>
                <button type="button" className="ui button" onClick={this.logState}></button>
                <BlockStyleControls
                    editorState={this.state.editorState}
                    onToggle={this.toggleBlockType}
                />
                <div className="ui segment">
                    <Editor editorState={this.state.editorState} onChange={this.onInput} />
                </div>
            </div>
        );
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