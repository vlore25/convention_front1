import {
  IconChevronDown,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { Container, Group, Menu, Text, UnstyledButton, Image, Tabs,} from '@mantine/core';
import AfpalogoURL from '../assets/logo/afpa_logo.png?url';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import classes from './Header.module.css';



export function MyHeader() {
  const { user, isLoading } = useAuth();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();

  const handleTokenDelete = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

   const displayUser = {
    name: user ? `${user.first_name} ${user.last_name}` : 'Invité',
    formation: user ? `${user.formation.name}` : 'Aucune formation',
  };

  
  return (
    <header className={classes.header}>
      <Container className={classes.mainSection}>
        <div className={classes.inner}>
          <Image src={AfpalogoURL} h={50} w="auto" />

          {user && (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            > <Group>
              <Text fw={500} size="sm" lh={1} mr={3}>
                  {displayUser.formation}
                </Text>
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group gap={7}>
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {displayUser.name}
                      </Text>
                      <IconChevronDown size={12} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                
              </Group>
              <Menu.Dropdown>
                <Menu.Label>Options</Menu.Label>
                <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                  Informations compte
                </Menu.Item>
                <Group onClick={handleTokenDelete}>
                  <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>
                    <Text >Déconnexion</Text>
                  </Menu.Item>
                </Group>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </Container>

      
    </header>
  );
}