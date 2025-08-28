import { Button, Card, Grid, Group, Image, Text, Modal } from '@mantine/core';
import convetionImg from '../assets/images/conventiondummy.png';
import { IconEye, IconLocationShare, IconWritingSign } from '@tabler/icons-react';
import classes from './module/HomePage.module.css';
import { useDisclosure } from '@mantine/hooks';
import ConventionView from '../components/pdf/ConventionView';
import { useEffect, useState } from 'react';
import axios from 'axios';


const conventionsData = [
  {
    id: 1,
    studentId: 3,
    commanderId: 5,
    afpaDirectorId: 7,
    formationId: 2,
    societyId: 4,
    dateStart: '2023-10-01',
    dateEnd: '2023-12-31',
    pdfUrl: '/pdf/sample.pdf',
  },
  {
    id: 2,
    studentId: 8,
    commanderId: 6,
    afpaDirectorId: 9,
    formationId: 1,
    societyId: 3,
    dateStart: '2023-11-15',
    dateEnd: '2024-02-15',
    pdfUrl: '/pdf/sample.pdf',
  },
  {
    id: 3,
    studentId: 10,
    commanderId: 11,
    afpaDirectorId: 12,
    formationId: 3,
    societyId: 1,
    dateStart: '2024-01-10',
    dateEnd: '2024-04-10',
    pdfUrl: '/pdf/sample.pdf',
  }
];

export function StudentHomePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [conventionsDataState, setConventionsDataState] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem('userToken');
      const fetchConventions = async () => {
      try {
        const response = await axios.get('http://http://127.0.0.1:8000/api/me/conventions', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });
        setConventionsDataState(response.data);
      } catch (err) {
        console.error("Failed to fetch convention data:", err);
      } finally {
      }
    };
    fetchConventions();
  }, []);

  const [selectedConvention, setSelectedConvention] = useState(null);

  const conventionCards = conventionsData.map((convention) => (
    <Card shadow="sm" p="md" radius="md" m='xs' withBorder key={convention.id}>
      <Card.Section className={classes.cardSection}>
        <Image
          src={convetionImg}
          height={160}
          alt="Convention image"
        />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={400}>Convention du: </Text>

        <Text fw={400}>{convention.dateStart} - </Text><Text fw={400}>{convention.dateEnd}</Text>

        <Button
          variant="light"
          color="blue"
          size="sm"
          radius="md"
          onClick={() => {
            setSelectedConvention(convention);
            open();                          
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
      >
        Signer et envoyer
      </Button>
    </Card>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} title="Convention de stage" size="80%" styles={{ modal: { maxWidth: '900px' } }}>
        {selectedConvention && <ConventionView convention={selectedConvention} />}
      </Modal>
      <Grid gutter="md">
        {conventionCards}
      </Grid>


    </>
  );
}