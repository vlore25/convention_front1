import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';

const element = document.getElementById('viewer');

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();
    return `${day}/${month}/${year}`;
}
// Utility function to format date strings

function formatDate(dateString : Number) {
    return new Date(Number (dateString)).toLocaleDateString('fr-FR');
}

export default function ConventionSign(props) {
    const viewer = useRef(null);
    const hasMounted = useRef(false);

    const fieldsToUpdate = {
        'datedocument_es_:date': formatDate(Date.now()),
        'internname': props.convention.student.firstName + ' ' + props.convention.student.lastName,
        'formationname': props.convention.formation.name,
        'datestart_es_:date': formatDate(props.convention.dateStart),
        'dateend_es_:date': formatDate(props.convention.dateEnd),
    }

    useEffect(() => {
        if (hasMounted.current) {
            return;
        }
        hasMounted.current = true;

        WebViewer(
            {
                path: '/lib/webviewer',
                licenseKey: 'demo:1756816985517:6075bde403000000004a992349196496df43d3039b525daf60fb2e124a',
                initialDoc: './pdf/sample.pdf',
            },
            viewer.current,
        ).then((instance) => {

            const { documentViewer, annotationManager, Annotations } = instance.Core;

            instance.UI.disableElements(['default-top-header']);
            //Prefill each form champ with convention and student data
            documentViewer.addEventListener('annotationsLoaded', async () => {
                const fieldManager = annotationManager.getFieldManager();
                Object.entries(fieldsToUpdate).forEach(([fieldName, value]) => {
                    const field = fieldManager.getField(fieldName);
                    if (field) {
                        field.setValue(value);
                    }
                });

                const textField = fieldManager.getField('sign1_es_:signer:signature');
                if (textField) {
                    annotationManager.drawAnnotations(textField.PageNumber);
                }

            });


        });
    }, []);

    return (
        <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    );
}


