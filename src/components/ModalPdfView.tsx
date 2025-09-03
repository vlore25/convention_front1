import { Modal } from "@mantine/core";
import ConventionView from "./pdf/ConventionView";
import ConventionSign from "./pdf/ConventionSign";


export default function ModalPdfView({ opened, onClose, selectedConvention, selectedAction}){
    return (
        <Modal opened={opened} 
               onClose={onClose} 
               title= {selectedAction === 'view' ? 'Convention de stage' : 'Signer la convention'}
               size="80%" 
               styles={{ modal: { maxWidth: '900px' } }}>
               {selectedAction === 'view' && <ConventionView convention={selectedConvention} />}
               {selectedAction === 'sign' && <ConventionSign convention={selectedConvention} />}
        </Modal>
    )
}