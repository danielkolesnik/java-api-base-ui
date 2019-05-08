
// outsource dependencies
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { PureComponent } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, /*convertFromHTML,*/ convertToRaw } from 'draft-js';

// local dependencies
import InputErrorMessage from './input-error-message';

// configuration
const toolbarOptions = {
    options: [
        'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker',
        'link', /* 'emoji',*/'embedded', 'image', 'remove', 'history',
    ],
    inline: {
        inDropdown: false,
        className: void(0),
        component: void(0),
        dropdownClassName: void(0),
        // NOTE superscript and subscript not working propperly in case to restore data
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
        // bold: { icon: bold, className: void(0) },
        // italic: { icon: italic, className: void(0) },
        // underline: { icon: underline, className: void(0) },
        // strikethrough: { icon: strikethrough, className: void(0) },
        // monospace: { icon: monospace, className: void(0) },
        // superscript: { icon: superscript, className: void(0) },
        // subscript: { icon: subscript, className: void(0) },
    },
    blockType: {
        inDropdown: true,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
        className: void(0),
        component: void(0),
        dropdownClassName: void(0),
    },
    fontSize: {
        // icon: fontSize,
        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
        className: void(0),
        component: void(0),
        dropdownClassName: void(0),
    },
    fontFamily: {
        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Gotham', 'GE_Flow'],
        className: void(0),
        component: void(0),
        dropdownClassName: void(0),
    },
    list: {
        inDropdown: false,
        className: void(0),
        component: void(0),
        dropdownClassName: void(0),
        options: ['unordered', 'ordered', 'indent', 'outdent'],
        // unordered: { icon: unordered, className: void(0) },
        // ordered: { icon: ordered, className: void(0) },
        // indent: { icon: indent, className: void(0) },
        // outdent: { icon: outdent, className: void(0) },
    },
    textAlign: {
        inDropdown: false,
        className: void(0),
        component: void(0),
        dropdownClassName: void(0),
        options: ['left', 'center', 'right', 'justify'],
        // left: { icon: left, className: void(0) },
        // center: { icon: center, className: void(0) },
        // right: { icon: right, className: void(0) },
        // justify: { icon: justify, className: void(0) },
    },
    colorPicker: {
        // icon: color,
        className: void(0),
        component: void(0),
        popupClassName: void(0),
        colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
            'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
            'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
            'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
            'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
            'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
    },
    link: {
        inDropdown: true,
        className: void(0),
        component: void(0),
        popupClassName: void(0),
        dropdownClassName: void(0),
        showOpenOptionOnHover: true,
        defaultTargetOption: '_self',
        options: ['link', 'unlink'],
        // link: { icon: link, className: void(0) },
        // unlink: { icon: unlink, className: void(0) },
    },
    emoji: {
        // icon: emoji,
        className: void(0),
        component: void(0),
        popupClassName: void(0),
        emojis: [
            '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
            '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
            '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
            '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
            '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
            '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
            '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
            '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
            '✅', '❎', '💯',
        ],
    },
    image: {
        // icon: image,
        className: void(0),
        component: void(0),
        popupClassName: void(0),
        urlEnabled: true,
        uploadEnabled: true,
        alignmentEnabled: true,
        uploadCallback: void(0),
        previewImage: false,
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        alt: { present: false, mandatory: false },
        defaultSize: {
            height: 'auto',
            width: 'auto',
        },
    },
    remove: {
        // icon: eraser,
        className: void(0),
        component: void(0)
    },
    history: {
        inDropdown: false,
        className: void(0),
        component: void(0),
        dropdownClassName: void(0),
        options: ['undo', 'redo'],
        // undo: { icon: undo, className: void(0) },
        // redo: { icon: redo, className: void(0) },
    },
};

class HtmlEditor extends PureComponent {
    constructor (props) {
        super(props);
        this.state = { value: '', editorState: EditorState.createEmpty() };
    }

    /**
     * setup component value from redux form
     * NOTE triggered when receiving data from locals, such as default value
     */
    componentDidMount () { this.htmlToEditor(this.props.input.value); }

    /**
     * update component value from redux form
     * NOTE triggered only when receiving data from the server
     */
    componentDidUpdate (prev) {
        // handle difference between the item and expectation
        const { input } = this.props;
        const { value } = this.state;
        // check is the value same
        if (prev.input.value !== input.value && value !== input.value) {
            this.htmlToEditor(input.value);
        }
    }

    /**
     * correct convert html to editor
     */
    htmlToEditor (htmlString) {
        const converted = htmlToDraft(htmlString);
        if (converted.contentBlocks) {
            const state = ContentState.createFromBlockArray(converted.contentBlocks, converted.entityMap);
            const editorState = EditorState.createWithContent(state);
            this.setState({ editorState, value: htmlString });
        }
    }

    /**
     * update component value with redux form
     */
    onChange (editorState) {
        const { input } = this.props;
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        // console.log('%c onChange ( editorState )', 'background: #0f9d58; color: #fff; font-size: 12px;'
        //     ,'\n props:', this.props
        //     ,'\n state:', this.state
        //     ,'\n editorState:', editorState
        //     ,'\n html:', html
        // );
        input.onChange(html);
        this.setState({ editorState, value: html });
    }

    render () {
        const { editorState } = this.state;
        const { input, meta, label, skipTouch } = this.props;
        let message = '', statusClassName = '';
        if (skipTouch || meta.touched) {
            message = meta.error;
            statusClassName = meta.valid ? 'has-success' : 'has-error';
        }
        return (
            <div className={`form-group offset-bottom-1 custom-html-wrapper ${statusClassName}`}>
                <input className="hidden-control" {...input} type="text" onFocus={() => this.ref.focus()}/>
                <label htmlFor={input.name} className="input-group"> { label } </label>
                <Editor
                    toolbar={toolbarOptions}
                    editorRef={r => this.ref=r}
                    editorState={editorState}
                    wrapperClassName=""
                    editorClassName="custom-html-editor"
                    toolbarClassName="custom-html-toolbar"
                    onEditorStateChange={(...args) => this.onChange(...args)}
                />
                <InputErrorMessage inputId={input.name} message={message} />
            </div>
        );
    }
}
// Check
HtmlEditor.propTypes = {
    label: PropTypes.node,
    skipTouch: PropTypes.bool,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};
// Def
HtmlEditor.defaultProps = {
    label: null,
    skipTouch: false,
};

export default HtmlEditor;
