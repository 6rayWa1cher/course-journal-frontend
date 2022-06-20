import { SvgIconComponent } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Typography,
  CardActionArea,
} from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface CardLinkProps {
  title: string;
  link: string;
  Icon: SvgIconComponent;
}

const CardLink = ({ title, link, Icon }: CardLinkProps) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => navigate(link), [navigate, link]);
  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography
            component="h2"
            variant="h5"
            color="primary"
            textOverflow="clip"
            overflow="hidden"
          >
            {title}
          </Typography>
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
      </CardActionArea>
      <CardActions>
        <Button onClick={handleClick} size="small">
          Перейти
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardLink;
