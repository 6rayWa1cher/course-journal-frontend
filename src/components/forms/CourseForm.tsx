import { Divider, Grid, Typography } from '@mui/material';
import { allFacultiesSelector } from '@redux/faculties';
import { groupByIdSelector } from '@redux/groups';
import { groupsByStudentsSelector } from '@redux/selector';
import { studentsByIdsSelector } from '@redux/students';
import FormTextField from 'components/FormTextField';
import GroupSelector from 'components/GroupSelector';
import SubTitle from 'components/SubTitle';
import { find } from 'lodash';
import { GroupId } from 'models/group';
import { StudentDto } from 'models/student';
import { useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParamSelector, useTypedSelector } from 'utils/hooks';
import { formatFullNameWithInitials } from 'utils/string';
import { CreateCourseSchemaType, EditCourseSchemaType } from 'validation/yup';
import StudentPicker from './StudentPicker';

const CourseForm = () => {
  const { control, watch } = useFormContext<
    CreateCourseSchemaType | EditCourseSchemaType
  >();

  const [groupId, setGroupId] = useState<GroupId | null>(null);
  const selectedGroup = useParamSelector(groupByIdSelector, {
    groupId: groupId ?? -1,
  });

  const studentIds = watch('students');

  const selectedGroups = useParamSelector(groupsByStudentsSelector, {
    ids: studentIds,
  });

  const students = useParamSelector(studentsByIdsSelector, {
    ids: studentIds,
  });

  const faculties = useTypedSelector(allFacultiesSelector);

  const selectedStudentsText = useMemo(
    () =>
      selectedGroups
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((g) => {
          const selectedStudents = students.filter(
            (s): s is StudentDto => s?.group === g.id
          );
          const mappedStudents = selectedStudents.map((s) =>
            formatFullNameWithInitials(s)
          );
          const faculty = find(faculties, { id: g.faculty });
          return [
            g.id,
            `${faculty?.name}, ${g.name}: ${mappedStudents.join(', ')}`,
          ];
        })
        .map(([id, text]) => (
          <Typography key={id} variant="body1">
            {text}
          </Typography>
        )),
    [faculties, selectedGroups, students]
  );

  return (
    <>
      <FormTextField
        name="name"
        control={control}
        variant="standard"
        margin="normal"
        label="Название"
        type="text"
        fullWidth
        required
      />
      <Divider sx={{ pt: 2 }} />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <SubTitle>Подбор студентов</SubTitle>
        </Grid>
        <Grid item xs={12} md={6}>
          <GroupSelector groupId={groupId} setGroupId={setGroupId} />
        </Grid>
        {groupId != null && selectedGroup != null && (
          <Grid item xs={12} md={6}>
            <Typography component="h3" variant="h6">
              Студенты {selectedGroup.name} группы
            </Typography>
            <StudentPicker groupId={groupId} />
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography component="h3" variant="h6">
            Выбранные студенты
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {selectedStudentsText}
        </Grid>
      </Grid>
    </>
  );
};

export default CourseForm;
