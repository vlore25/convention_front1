import { AppShell} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { MyHeader} from './components/MyHeader';

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
    >
      <AppShell.Header h={60} p="xs">
        <MyHeader />
      </AppShell.Header>  
      <AppShell.Main p="md" mt={60}>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md"></AppShell.Footer>
    </AppShell>
  );
}