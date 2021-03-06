import { observer } from 'mobx-react-lite';
import { useContext } from 'react'
import { Modal } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';

const ModalContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const {modal: {open, body}, closeModal} = rootStore.modalStore; 
    return (
        <Modal 
        open={open} 
        onClose={closeModal} 
        size='small'
        style={{ 
            position: 'static',
            height: '350px',
            }}>
            <Modal.Content image scrolling>{body}</Modal.Content>
        </Modal>
    )
}

export default observer(ModalContainer);