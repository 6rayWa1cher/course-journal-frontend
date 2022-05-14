import Typography from '@mui/material/Typography';

export interface SubTitleProps {
  children: Children;
}

const SubTitle = ({ children }: SubTitleProps) => {
  return (
    <Typography component="h2" variant="h5" color="primary">
      {children}
    </Typography>
  );
};

export default SubTitle;
