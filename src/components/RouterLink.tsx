import { Link } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

export interface RouterLinkProps {
  to: string;
  children: Children;
}

const RouterLink = ({
  to,
  children,
  ...props
}: RouterLinkProps & LinkProps) => (
  <Link component={ReactRouterLink} to={to} variant="body2" {...props}>
    <Box
      sx={{
        color: 'primary.main',
      }}
    >
      {children}
    </Box>
  </Link>
);

export default RouterLink;
