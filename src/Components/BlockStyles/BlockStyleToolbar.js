import React, {Component} from "react";
import Draft from "draft-js";
import Immutable from "immutable";

import BlockStyleButton from "./BlockStyleButton.js";
import HeaderStyleDropdown from "./HeaderStyleDropdown.js";
import FontSizeStyleDropdown from "./FontSizeStyleDropdown.js";

import {ALIGNMENT_DATA_KEY} from "./ExtendedRichUtils.js";
import {BLOCK_TYPES, BLOCK_TYPE_HEADINGS, FONT_SIZE} from  "./HelperFn.js";

export default class BlockStyleToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: null,
            onToggle: null,
        }
    }

    componentWillMount() {
        this.setState({editorState: this.props.editorState}, () => {
            this.selection = this.state.editorState.getSelection();
            this.blockType =
                this.state.editorState
                    .getCurrentContent()
                    .getBlockForKey(this.selection.getStartKey())
                    .getType();
        });
        this.setState({onToggle: this.props.onToggle});
    }

    render() {
        return (
            <div className="block-style-toolbar">
                <span className="RichEditor-controls">
                    <HeaderStyleDropdown
                        headerOptions={BLOCK_TYPE_HEADINGS}
                        active={this.blockType}
                        onToggle={this.state.onToggle}
                    />
                    <FontSizeStyleDropdown
                        fontSizeOptions={FONT_SIZE}
                        active={this.blockType}
                        onToggle={this.props.onToggleFontSize}
                    />
                    {BLOCK_TYPES.map((type) => {
                        return (
                            <BlockStyleButton
                                active={type.style === this.blockType}
                                label={type.label}
                                onToggle={this.state.onToggle}
                                style={type.style}
                                key={type.label}
                                type={type}
                            />
                        );
                    })}
                </span>
            </div>
        );
    }
}