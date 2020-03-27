import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


class RichTextEditor extends Component {
    static propTypes = {
        detail: PropTypes.string
    }

    state = {
        editorState: EditorState.createEmpty(),
    }

    constructor(props) {
        super(props);
        const html = this.props.detail;
        if(html){
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        }else{
            this.state = {
                editorState: EditorState.createEmpty(),
            };
        }

    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    getDetail =() =>{
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    uploadImageCallBack = (file) => {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/manage/img/upload');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                const url = response.data.url;
                resolve({data:{link: url}});
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
}

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border: '1px solid #ddd',minHeight: 200,paddingLeft: 10}}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
                {/*<textarea*/}
                    {/*disabled*/}
                    {/*value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
                {/*/>*/}
            </div>
        );
    }
}
export default RichTextEditor