import { Box } from '@mui/system';

export interface ScrollableProps {
  height: number | string;
  children: Children;
  onlyMax?: boolean;
}

const Scrollable = ({
  height: number,
  children,
  onlyMax = false,
}: ScrollableProps) => {
  return (
    <Box
      sx={{
        height: !onlyMax ? number : undefined,
        maxHeight: number,
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
};

export default Scrollable;
