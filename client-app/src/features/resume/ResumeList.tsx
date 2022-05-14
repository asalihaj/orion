import { memo, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ResumeListItem from "./ResumeListItem";

const ResumeList = memo(() => {
    const rootStore = useContext(RootStoreContext);
    const { getResumes } = rootStore.resumeStore;
    const resumes = getResumes();

    useEffect(() => {

    }, [getResumes]);

    return (
        <Container>
            {resumes.map((resume) => (<ResumeListItem key={resume.id} resume={resume} />))}
        </Container>
    );
})

export default ResumeList;