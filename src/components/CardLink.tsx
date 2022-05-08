import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SubTitle from './SubTitle';

export interface CardLinkProps {
  title: string;
  link: string;
  Icon: any;
}

const CardLink = ({ title, link, Icon }: CardLinkProps) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => navigate(link), [navigate, link]);
  return (
    <Card onClick={handleClick}>
      <CardContent>
        <SubTitle>{title}</SubTitle>
        <CardMedia>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '110px',
            }}
          >
            <Icon sx={{ fontSize: 70 }} />
          </Box>
        </CardMedia>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} size="small">
          Перейти
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardLink;
