import { EditorState } from 'draft-js'
import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Grid, Label } from 'semantic-ui-react'
import { stateToHTML } from 'draft-js-export-html'


interface IProps extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps {}

export const TextAreaInput: React.FC<IProps> = ({
    input, 
    width,
    rows,
    placeholder,
    value,
    meta: {touched, error}
}) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [content, setContent] = useState('');

    const handleChange = (e) => {
        setEditorState(e);
        setContent(stateToHTML(editorState.getCurrentContent()))
    }
    return (
        
        <Form.Field error={touched && !!error} width={width} value={content}>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={handleChange}
            />
            {touched && error && (
                <Grid stretched>
                    <Grid.Column width={8} floated='left'>
                        <Label size='small' prompt  pointing='above' basic color='red'>
                            {error}
                        </Label>
                    </Grid.Column>
                </Grid>
            )}
        </Form.Field>
    )
}