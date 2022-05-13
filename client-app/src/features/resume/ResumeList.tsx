import { observer } from "mobx-react-lite";
import { memo, useContext, useEffect, useState } from "react";
import { Container, Item, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ResumeListItem from "./ResumeListItem";

const ResumeList = () => {
    const rootStore = useContext(RootStoreContext);
    const { getResumes } = rootStore.resumeStore;
    const resumes = getResumes();

    return (
        <Container>
            {resumes.map((resume) => (<ResumeListItem key={resume.id} resume={resume} />))}
        </Container>
    );
}

export default memo(observer(ResumeList));