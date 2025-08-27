import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell>
      <AppShell.Header>

      </AppShell.Header>
      <AppShell.Navbar p="md">
    
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md"></AppShell.Footer>
    </AppShell>
  );
}