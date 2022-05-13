import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Button, Divider, Grid, Header, Icon, Image, Message } from "semantic-ui-react";

import { RootStoreContext } from "../../stores/rootStore";
import ResumeUploadDropzone from "./ResumeUploadDropzone";
import ResumeUploadInfo from "./ResumeUploadInfo";

interface IProps {
    uploadResume: (file: Blob) => void;
}

const ResumeUploadWidget: React.FC<IProps>= ({ uploadResume }) => {
    const rootStore = useContext(RootStoreContext);
    const { submitting } = rootStore.resumeStore;
    const [files, setFiles] = useState<any[]>([]);
      
    return(
        <Grid className="grid-modal">
            <Grid.Row className="image-row">
                {files.length == 0 && <ResumeUploadDropzone setFiles={setFiles} />}
                {files.length > 0 && <ResumeUploadInfo resumePreview={files[0]} />}
            </Grid.Row>
            <Grid.Row className="button-row">
                <Grid.Column className="button-column">
                    <Button primary floated="right" loading={submitting} onClick={() => uploadResume(files[0])}>Apply</Button>
                    {files.length > 0 &&
                    <Button inverted color='red' floated="right" onClick={() => setFiles([])}>Clear</Button>}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default observer(ResumeUploadWidget);