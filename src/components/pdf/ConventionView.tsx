import { useEffect, useRef } from "react";

export default function ConventionView() {
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
                            }
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


