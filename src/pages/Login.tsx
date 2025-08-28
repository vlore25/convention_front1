import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Image,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import Afpalogo from '../assets/logo/afpa_logo.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';


export function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            navigate('/student');
        }
    }, [navigate]);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleFormSubmit = (values) => {
        setLoading(true);
        console.log("Submitting raw values:", values);
        const userPayload = {
            ...values,
        };

        axios.post('http://127.0.0.1:8000/api/login_check', userPayload, {
            headers: {
                'Content-Type': 'application/ld+json'
            }
        })
            .then(function (response) {
                console.log("Connexion réussie:", response.data);
                const token = response.data.token;
                localStorage.setItem('userToken', token);

                if (token) {
                    localStorage.setItem('jwt_token', token);
                } else {
                    console.log("Aucun token reçu, veuillez réessayer.");
                }
            })
            .catch(function (error) {
                console.error("Error:", error.response ? error.response.data : error.message);

            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <Container size={420} mt={80}>
            <Image src={Afpalogo} ></Image>
            <Title ta="center">
                Connexion
            </Title>

            <form onSubmit={form.onSubmit(handleFormSubmit)}>
                <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
                    <TextInput
                        label="Courrier"
                        placeholder="courrier@nomcourrier.com"
                        required radius="md"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label="Mot de passe"
                        placeholder="Mot de passe ultra securisée"
                        required mt="md"
                        radius="md"
                        {...form.getInputProps('password')}
                    />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Se souvenir" />
                        <Anchor c='#86bc24' component="button" size="sm">
                            Mot de passe oublié?
                        </Anchor>
                    </Group>
                    <Text ta="center" mt="md">
                        <Anchor component={Link} to="/create-account" c="#86bc24" >
                            Créer un compte
                        </Anchor>
                    </Text>
                    <Button color='#86bc24' fullWidth mt="xl" radius="md" type="submit">
                        Connexion
                    </Button>
                </Paper>
            </form>
        </Container >
    );
}