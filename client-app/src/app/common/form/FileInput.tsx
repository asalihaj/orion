import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<File, HTMLInputElement>, FormFieldProps {}

const FileInput: React.FC<IProps> = ({
    width, 
    type, 
    placeholder, 
    meta: {touched, error}
}) => {
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            <input  placeholder={placeholder} type="file" accept='application/pdf, application/msword' />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}

export default FileInput;