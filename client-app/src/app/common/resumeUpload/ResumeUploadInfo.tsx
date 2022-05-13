import { useContext } from "react";
import { Container, Divider, Grid, Header, Message, Segment } from "semantic-ui-react"
import { RootStoreContext } from "../../stores/rootStore";
import './styles.css'

interface IProps {
    resumePreview: File;
}

const ResumeUploadInfo: React.FC<IProps> = ({ resumePreview }) => {
    const rootStore = useContext(RootStoreContext);
    const { offer } = rootStore.offerStore;
    const ext = resumePreview.name.split('.').pop().toUpperCase();

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const getFileStying = () => {
        const temp = ext.toLowerCase();
        return temp === 'pdf' ? 'pdf' : temp === 'doc' || temp === 'docx' ? 'docx' : '';
    }

    const titleStyle = {
        marginTop: '0',
        marginBotton: '5px'
    }

    return(
        <Container>
            <Header color='grey' as='h3'>Applying for {offer.title} at {offer.publisher.name}</Header>
            <Divider fitted/>
            <Header style={titleStyle} as='h4'>Resume</Header>
            <span>Be sure to include an updated resume</span>
        <Grid celled className="main-grid">
            <Grid.Row className="grid-main-row">
                <Grid.Column 
                    className={"grid-file-info " + getFileStying()} 
                    width={5}>
                    {ext}
                </Grid.Column>
                <Grid.Column width={11} className="grid-file-name">
                    <strong>{resumePreview.name}</strong>
                    <br/>
                    <p>
                    {formatBytes(resumePreview.size)}
                    </p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Message info>
            <Message.Header>Submitting this application won't change your profile.</Message.Header>
            You won't be able to <strong>edit</strong> or <strong>delete</strong> after submitting
        </Message>
        </Container>
    );
}

export default ResumeUploadInfo;