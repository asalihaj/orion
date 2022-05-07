import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Container, Form, Header, Label, Radio } from 'semantic-ui-react';
import { IOffer } from '../../app/models/offer';
import { IReportFormValues } from '../../app/models/report';
import { RootStoreContext } from '../../app/stores/rootStore';
import { history } from '../..';

const ReportForm: React.FC<{ offer: IOffer }> = ({offer}) => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    const { closeModal } = rootStore.modalStore;
    const { createReport } = rootStore.reportStore;
    
    const [value, setValue] = useState(null);
    const handleChange = (event, {value}) => setValue(value);

    const handleSubmit = () => {
        if (user) {
            const report: IReportFormValues = {
                offerId: offer.id,
                userId: user.id,
                category: value
            }
            createReport(report)
            .then(() => {
                toast.success("Report sent successfully");
                closeModal();
            })
            .catch(error => {
                toast.error(error.data.errors);
                closeModal();
            })
        } else {
            history.push('/login');
        }
    }

    return (
        <Form size='big'>
            <Header
                as='h3'
                content='Please select a problem'
                color='black'
                textAlign='left'
            />
            <Form.Field>
                <Radio 
                    label='Hate Speech'
                    name='reportGroup'
                    value='hateSpeech'
                    checked={value === 'hateSpeech'}
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <Radio 
                    label='Spam'
                    name='reportGroup'
                    value='spam'
                    checked={value === 'spam'}
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <Radio 
                    label='Harassment'
                    name='reportGroup'
                    value='harassment'
                    checked={value === 'harassment'}
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <Radio 
                    label='Copyright'
                    name='reportGroup'
                    value='copyright'
                    checked={value === 'copyright'}
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <Radio 
                    label='Intellectual property violation'
                    name='reportGroup'
                    value='ipv'
                    checked={value === 'ipv'}
                    onChange={handleChange}
                />
            </Form.Field>
            <Button
                type='submit'
                fluid
                primary
                size='small'
                attached='bottom'
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Form>
    )
}

export default ReportForm;