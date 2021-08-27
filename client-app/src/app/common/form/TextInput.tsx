import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Input, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLInputElement>, FormFieldProps {}

const TextInput: React.FC<IProps> = ({
    input, 
    width, 
    type, 
    placeholder,
    size,
    meta: {touched, error}
}) => {
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            {touched && error && (
                <Label size='small' pointing='below' basic color='red'>
                    {error}
                </Label>
            )}
            <Input size={size} {...input} placeholder={placeholder} />
        </Form.Field>
    )
}

export default TextInput;