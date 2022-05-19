import { Breadcrumbs, Link, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { courseNameByIdSelector } from '@redux/courses';
import { employeeInitialsByIdSelector } from '@redux/employees';
import { facultyNameByIdSelector } from '@redux/faculties';
import { studentInitialsByIdSelector } from '@redux/students';
import { taskTitleByIdSelector } from '@redux/tasks';
import { useMemo } from 'react';
import { useLocation, Link as RouterLink, useParams } from 'react-router-dom';
import { useParamSelector } from 'utils/hooks';

const localizationTable: Record<string, string> = {
  '': 'Журнал курса',
  employees: 'Преподаватели',
  faculties: 'Факультеты',
  students: 'Студенты',
  settings: 'Настройки',
  courses: 'Курсы',
  submissions: 'Оценки',
};

type IdsLocalizationTable = Record<string, string>;

const localizeName = (
  name: Nullable<string | number>,
  table: IdsLocalizationTable
): string => {
  let out = '';
  if (Number.isInteger(name)) {
    out = '#' + name;
  }
  if (name != null && name in table) {
    out = table[name];
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
  const params = useParams();
  const location = useLocation();
  const faculty = useParamSelector(facultyNameByIdSelector, {
    facultyId: Number(params.facultyId),
  });
  const employee = useParamSelector(employeeInitialsByIdSelector, {
    employeeId: Number(params.employeeId),
  });
  const student = useParamSelector(studentInitialsByIdSelector, {
    studentId: Number(params.studentId),
  });
  const course = useParamSelector(courseNameByIdSelector, {
    courseId: Number(params.courseId),
  });
  const task = useParamSelector(taskTitleByIdSelector, {
    taskId: Number(params.taskId),
  });

  const parts = useMemo(() => {
    const pathname = location.pathname === '/' ? '' : location.pathname;
    const blocks = pathname.split('/');
    const table = Object.fromEntries(
      [
        [params.facultyId, faculty],
        [params.employeeId, employee],
        [params.studentId, student],
        [params.courseId, course],
        [params.taskId, task],
      ].filter(([k, v]) => k != null && v != null)
    );
    return blocks.map((b, i, arr) => ({
      path: arr.slice(0, i + 1).join('/') || '/',
      name: localizeName(b, table),
    }));
  }, [
    course,
    employee,
    faculty,
    location.pathname,
    params.courseId,
    params.employeeId,
    params.facultyId,
    params.studentId,
    params.taskId,
    student,
    task,
  ]);

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
