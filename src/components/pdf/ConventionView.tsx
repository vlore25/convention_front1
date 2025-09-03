import WebViewer from '@pdftron/webviewer';
import { formToJSON } from 'axios';
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
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('fr-FR');
}

export default function ConventionView(props) {
    const viewer = useRef(null);
    const hasMounted = useRef(false);

    const fieldsToUpdate = {
        'conventiondate_es_:date': "25/12/1996",
        'internname': '',
        'formationname': '',
        
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
            const { documentViewer, annotationManager} = instance.Core;
            instance.UI.disableElements(['default-top-header']);

            documentViewer.addEventListener('annotationsLoaded', () => {

                const fieldManager = annotationManager.getFieldManager();
                console.log(props);
                console.log(fieldManager);
                
                Object.entries(fieldsToUpdate).forEach(([fieldName]))
                const field = fieldManager.getField(fieldName);
                if (field) {
                    field.setValue('Victor');
                }
            });
        });
    }, []);

    return (
        <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    );
}


