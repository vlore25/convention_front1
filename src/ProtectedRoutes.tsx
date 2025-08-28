import { useEffect } from "react";
import { Outlet, useNavigate} from "react-router";
import React from "react";
import { AppLayout } from "./AppLayout";

const ProtectedRoutes: React.FC = () => {
    const token: string | null = localStorage.getItem("jwt_token");
    // On importe et utilise le type 'NavigateFunction' pour le hook.
    const navigate = useNavigate();

    useEffect(() => {
        // La fonction async est typée pour retourner une promesse vide : Promise<void>.
        const verifyToken = async (): Promise<void> => {
            if (token) {
                try {
                    // L'URL de votre endpoint de vérification doit être ajoutée ici.
                    const response: Response = await fetch("http://127.0.0.1:8000/api/users", {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    // Si la réponse n'est pas OK (ex: statut 401, 403), le token est invalide.
                    if (!response.ok) {
                        localStorage.removeItem("jwt_token");
                        navigate('/login', { replace: true });
                    }
                } catch (error) {
                    console.error("La vérification du token a échoué:", error);
                    localStorage.removeItem("jwt_token");
                    navigate('/login', { replace: true });
                }
            } else {
                navigate('/login', { replace: true });
            }
        };

        verifyToken();
    }, [token, navigate]);

    return token ? <AppLayout /> : null;
};

export default ProtectedRoutes;