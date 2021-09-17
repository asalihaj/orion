import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Icon, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<File, HTMLInputElement>, FormFieldProps {}

const FileInput: React.FC<IProps> = ({
    width, 
    type, 
    placeholder, 
    meta: {touched, error},
    title
}) => {
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
                <input id='file' placeholder={placeholder} type="file" />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}

export default FileInput;