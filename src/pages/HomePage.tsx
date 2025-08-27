import { Button, Card, Grid, Group, Image, Text, Modal } from '@mantine/core';
import convetionImg from '../assets/images/conventiondummy.png';
import { IconEye, IconLocationShare, IconWritingSign } from '@tabler/icons-react';
import classes from './module/HomePage.module.css';
import { useDisclosure } from '@mantine/hooks';
import ConventionView from '../components/pdf/ConventionView';
const pdfURL = 'pdf/sample.pdf';
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

export function HomePage() {
    const [opened, { open, close }] = useDisclosure(false);

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

        <Button variant="light" color="blue" size="sm" radius="md" onClick={open}>
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
    <Modal opened={opened} onClose={close} title="Authentication" size="80%" styles={{ modal: { maxWidth: '900px' } }}>
            <ConventionView/>
      </Modal>
     <Grid gutter="md">
        {conventionCards}
     </Grid>
   
      
     </>
  );
}