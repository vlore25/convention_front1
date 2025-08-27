import { AppShell} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
    >
      <AppShell.Header>

      </AppShell.Header>
      <AppShell.Main p="md">
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md"></AppShell.Footer>
    </AppShell>
  );
}