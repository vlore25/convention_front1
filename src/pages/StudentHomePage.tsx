import { Button, Card, Grid, Group, Image, Text, Modal } from '@mantine/core';
import convetionImg from '../assets/images/conventiondummy.png';
import { IconEye, IconLocationShare, IconWritingSign } from '@tabler/icons-react';
import classes from './module/HomePage.module.css';
import { useDisclosure } from '@mantine/hooks';
import ConventionView from '../components/pdf/ConventionView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalPdfView from '../components/ModalPdfView';

// Utility function to format date strings
function formatDate(dateString: Date) {
  return new Date(dateString).toLocaleDateString('fr-FR');
}
export function StudentHomePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [conventionsDataState, setConventionsDataState] = useState([]);
  const [pdfAction, setPdfAction] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    console.log("Fetching conventions with token:", token);
    const fetchConventions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/me/conventions', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });
        console.log("Fetched conventions data:", response.data);
        setConventionsDataState(response.data);
      } catch (err) {
        console.error("Failed to fetch convention data:", err);
      } finally {
      }
    };
    fetchConventions();
  }, []);

  const [selectedConvention, setSelectedConvention] = useState(null);

  const conventionCards = conventionsDataState.map((convention) => (
    <Card shadow="sm" p="md" radius="md" m='xs' withBorder key={convention.id}>
      <Card.Section className={classes.cardSection}>
        <Image
          src={convetionImg}
          height={160}
          alt="Convention image"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={400}>Convention du: {formatDate(convention.dateStart) + ' - ' + formatDate(convention.dateEnd)}
        </Text>
        <Button
          variant="light"
          color="blue"
          size="sm"
          radius="md"
          onClick={() => {
            setSelectedConvention(convention);
            open();
            setPdfAction('view');
          }}
        >
          <IconEye size={18} stroke={1.5} />
        </Button>
      </Group>
      <Button
        leftSection={<IconWritingSign size={14} />}
        rightSection={<IconLocationShare size={14} />}
        color="#86bc24"
        fullWidth mt="md"
        radius="md"
        onClick={() => {
            setSelectedConvention(convention);
            open();
            setPdfAction('sign');
          }}
      >
        Signer et envoyer
      </Button>
    </Card>
  ));

  return (
    <>
      <ModalPdfView
        opened={opened}
        onClose={close}
        selectedConvention={selectedConvention}
        selectedAction={pdfAction}
      />
      <Grid gutter="md">
        {conventionCards}
      </Grid>
    </>
  );
}