import Typography from '@mui/material/Typography';

export interface TitleProps {
  children: Children;
}

const Title = ({ children }: TitleProps) => {
  return (
    <Typography component="h2" variant="h4" color="primary">
      {children}
    </Typography>
  );
};

export default Title;
