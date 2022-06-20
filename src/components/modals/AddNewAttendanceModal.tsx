import { Button, Modal, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';
import AttendanceTimeForm from 'components/forms/AttendanceTimeForm';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CreateDateClassNumberAttendance } from 'validation/yup/attendance';

interface AddNewAttendanceModalProps {
  isAddNewAttendanceModalOpened: boolean;
  onClose: () => void;
  style: object;
  methods: UseFormReturn<CreateDateClassNumberAttendance, any>;
  onSubmit: (data: CreateDateClassNumberAttendance) => void;
}

const AddNewAttendanceModal = ({
  isAddNewAttendanceModalOpened,
  onClose,
  style,
  methods,
  onSubmit,
}: AddNewAttendanceModalProps) => {
  const TopMarginedButton = styled(Button)`
    margin-top: 20px;
  `;
  const { handleSubmit } = methods;

  return (
    <Modal
      open={isAddNewAttendanceModalOpened}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Выберите пару и введите дату
            </Typography>
            <AttendanceTimeForm />
            <TopMarginedButton variant="outlined" color="info" type="submit">
              Выбрать
            </TopMarginedButton>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default AddNewAttendanceModal;
