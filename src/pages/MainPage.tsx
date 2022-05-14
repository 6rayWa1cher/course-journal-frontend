import { Grid } from '@mui/material';
import { useDocumentTitle } from 'utils/hooks';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardLink from 'components/CardLink';
import SettingsIcon from '@mui/icons-material/Settings';

const items = [
  { title: 'Факультеты', link: '/faculties', Icon: AccountBalanceIcon },
  { title: 'Преподаватели', link: '/employees', Icon: AccountBoxIcon },
  { title: 'Настройки', link: '/settings', Icon: SettingsIcon },
];

const MainPage = () => {
  useDocumentTitle('Главная');

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {items.map((item, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <CardLink {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MainPage;
