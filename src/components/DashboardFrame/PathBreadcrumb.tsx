import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Box, SxProps, Theme } from '@mui/system';
import React, { useMemo } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const localizationTable: Record<string, string> = {
  '': 'Журнал курса',
  employees: 'Преподаватели',
};

const localizeName = (name: Nullable<string | number>): string => {
  let out = '';
  if (Number.isInteger(name)) {
    out = '#' + name;
  }
  if (name != null && name in localizationTable) {
    out = localizationTable[name];
  }
  return out;
};

export interface PathBreadcrumbProps {
  largeScreen?: boolean;
  sx: SxProps<Theme>;
}

const PathBreadcrumb = ({ largeScreen = true, sx }: PathBreadcrumbProps) => {
  const location = useLocation();

  const parts = useMemo(() => {
    const pathname = location.pathname === '/' ? '' : location.pathname;
    const blocks = pathname.split('/');
    return blocks.map((b, i, arr) => ({
      path: arr.slice(0, i + 1).join('/') || '/',
      name: localizeName(b),
    }));
  }, [location]);

  const crumbs = useMemo(
    () =>
      parts.map(({ path, name }, i, arr) =>
        i === arr.length - 1 ? (
          <Typography key={i} color="#fff">
            {name}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            to={path}
            underline="hover"
            color="#eee"
            key={i}
          >
            {name}
          </Link>
        )
      ),
    [parts]
  );

  return (
    <Breadcrumbs
      maxItems={!largeScreen ? 3 : undefined}
      itemsBeforeCollapse={1}
      itemsAfterCollapse={2}
      sx={sx}
    >
      {crumbs}
    </Breadcrumbs>
  );
};

export default PathBreadcrumb;
