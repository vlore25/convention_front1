import { useEffect, useRef } from "react";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const day = today.getDate();
  return `${day}/${month}/${year}`;
}

export default function ConventionView(props) {
    console.log("Convention data:", props.convention.dateStart);
    const containerRef = useRef(null);
    const documentUrl = '/pdf/sample.pdf';

    useEffect(() => {
        const container = containerRef.current;
        let cleanup = () => { };

        (async () => {
            const NutrientViewer = (await import("@nutrient-sdk/viewer")).default;


            NutrientViewer.unload(container);

            if (container && NutrientViewer) {
                NutrientViewer.load({

                    container,
                    document: documentUrl,
                    baseUrl: `${window.location.protocol}//${window.location.host}/${import.meta.env.PUBLIC_URL ?? ""
                        }`,
                    instantJSON: {
                        format: "https://pspdfkit.com/instant-json/v1",
                        formFieldValues: [
                            {
                                name: "datedocument_es_:date",
                                value: getDate(),
                                type: "pspdfkit/form-field-value",
                                v: 1
                            },
                            {
                                name: "internname",
                                value: "LORE PACHECO Victor",
                                type: "pspdfkit/form-field-value",
                                v: 1
                            },
                            {
                                name: "formationname",
                                value: "Developpeur web et web mobile",
                                type: "pspdfkit/form-field-value",
                                v: 1
                            },
                            {
                                name: "datestart_es_:date",
                                value: props.convention.dateStart,
                                type: "pspdfkit/form-field-value",
                                v: 1
                            },
                            {
                                name: "dateend_es_:date",
                                value: props.convention.dateEnd,
                                type: "pspdfkit/form-field-value",
                                v: 1
                            },
                        ]
                    }
                });
            }

            cleanup = () => {
                NutrientViewer.unload(container);
            };
        })();

        return cleanup;
    }, [documentUrl]);

    return <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '70vh' }} />;
}


