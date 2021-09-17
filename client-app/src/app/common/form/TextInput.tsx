import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Grid, Input, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLInputElement>, FormFieldProps {}

const TextInput: React.FC<IProps> = ({
    input, 
    width, 
    type, 
    placeholder,
    icon,
    iconPosition,
    size,
    meta: {touched, error, submitting}
}) => {
    return (
        <Form.Field error={submitting && !!error} type={type} width={width}>
            <Input icon={icon} iconPosition={iconPosition}  size={size} {...input} placeholder={placeholder} />
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

export default TextInput;