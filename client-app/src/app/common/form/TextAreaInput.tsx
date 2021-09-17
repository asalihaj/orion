import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Grid, Label, TextArea } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps {}

export const TextAreaInput: React.FC<IProps> = ({
    input, 
    width,
    rows,
    placeholder,
    meta: {touched, error}
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <TextArea rows={rows} {...input} placeholder={placeholder} />
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