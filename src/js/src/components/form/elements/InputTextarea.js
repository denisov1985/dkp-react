import React, {Component} from 'react'
import Element from './Element';
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
        if (this.getValue()) {
            this.state = {
                editorState: this.getEditorStateFromProps(this.props),
            };

        }   else  {
            this.state = {editorState: EditorState.createEmpty()};
        }

    }

    getEditorStateFromProps = (props) => {
        let value = this.getValue(props);
        if (/<[a-z][\s\S]*>/i.test(value) === false) {
            value = '<p>' + value + '</p>';
        }

        const blocksFromHtml = htmlToDraft(value);
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
        const {editorState} = this.state;
        return (
            <div style={{

            }}><Editor
                editorStyle={{
                    padding: '0.67857143em 1em',
                    fontSize: '1em',
                    background: '#FFFFFF',
                    border: '1px solid rgba(34, 36, 38, 0.15)',
                    color: 'rgba(0, 0, 0, 0.87)',
                    borderRadius: '0.28571429rem',
                    height: 400 + 'px'
                }}
                onBlur={this.onBlur}
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
            /></div>)
    }
}

