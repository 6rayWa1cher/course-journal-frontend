import { Divider, Grid, LinearProgress, TextField } from '@mui/material';
import {
  courseTokenByCourseIdSelector,
  deleteCourseTokenThunk,
  internalUrlFromCourseTokenSelector,
  issueCourseTokenThunk,
} from '@redux/courseTokens';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import AddButton from 'components/buttons/AddButton';
import SubTitle from 'components/SubTitle';
import { CourseId } from 'models/course';
import { useCallback, useMemo } from 'react';
import { useLoadingPlain, useMySnackbar, useParamSelector } from 'utils/hooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DeleteButton from 'components/buttons/DeleteButton';

export interface CourseTokenSettingsProps {
  courseId: CourseId;
}

const CourseTokenSettings = ({ courseId }: CourseTokenSettingsProps) => {
  const courseToken = useParamSelector(courseTokenByCourseIdSelector, {
    courseId,
  });
  const courseTokenId = courseToken?.id ?? -1;
  const urlSuffix = useParamSelector(internalUrlFromCourseTokenSelector, {
    courseTokenId,
  });
  const url = useMemo(
    () => (urlSuffix != null ? `${location.origin}${urlSuffix}` : undefined),
    [urlSuffix]
  );

  const dispatch = useAppDispatch();
  const { enqueueSuccess, enqueueInfo } = useMySnackbar();

  const issueToken = useLoadingPlain(
    useCallback(async () => {
      await dispatch(issueCourseTokenThunk({ course: courseId })).then(
        unwrapResult
      );
      enqueueSuccess('Ссылка доступа создана');
    }, [courseId, dispatch, enqueueSuccess]),
    { immediate: false, enqueue: true }
  );
  const handleAddCourseTokenClick = useCallback(
    () => issueToken.execute(),
    [issueToken]
  );

  const deleteToken = useLoadingPlain(
    useCallback(async () => {
      await dispatch(deleteCourseTokenThunk({ courseTokenId })).then(
        unwrapResult
      );
      enqueueSuccess('Ссылка доступа удалена');
    }, [courseTokenId, dispatch, enqueueSuccess]),
    { immediate: false, enqueue: true }
  );
  const handleDeleteCourseTokenClick = useCallback(
    () => deleteToken.execute(),
    [deleteToken]
  );

  return (
    <>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs>
          <SubTitle>Ссылка доступа на чтение</SubTitle>
        </Grid>
        {courseToken == null && (
          <Grid item>
            <AddButton
              onClick={handleAddCourseTokenClick}
              disabled={issueToken.loading}
            />
          </Grid>
        )}
        {courseToken != null && (
          <Grid item>
            <DeleteButton
              onClick={handleDeleteCourseTokenClick}
              disabled={deleteToken.loading}
            />
          </Grid>
        )}
      </Grid>
      {(issueToken.loading || deleteToken.loading) && <LinearProgress />}
      <Divider />
      {url != null && (
        <CopyToClipboard
          text={url}
          onCopy={() => enqueueInfo('Ссылка скопирована')}
        >
          <TextField
            value={url}
            InputProps={{ readOnly: true, disableUnderline: true }}
            fullWidth
          />
        </CopyToClipboard>
      )}
    </>
  );
};

export default CourseTokenSettings;
