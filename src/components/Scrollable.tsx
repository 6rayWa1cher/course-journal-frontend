import { Box } from '@mui/system';

export interface ScrollableProps {
  height: number | string;
  children: Children;
}

const Scrollable = ({ height: number, children }: ScrollableProps) => {
  return (
    <Box sx={{ height: number, maxHeight: number, overflow: 'auto' }}>
      {children}
    </Box>
  );
};

export default Scrollable;
