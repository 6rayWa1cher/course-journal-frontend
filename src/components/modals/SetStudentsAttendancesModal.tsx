import { Button, Modal, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';

interface SetStudentsAttendancesModalProps {
  isSetStudentAttendancesModalOpened: boolean;
  onClose: () => void;
  studentName: string;
  style: object;
  onAddAttendance: (attendanceType: string) => void;
}

const SetStudentsAttendancesModal = ({
  isSetStudentAttendancesModalOpened,
  onClose,
  studentName,
  style,
  onAddAttendance,
}: SetStudentsAttendancesModalProps) => {
  const TopMarginedButton = styled(Button)`
    margin-top: 20px;
  `;

  return (
    <Modal
      open={isSetStudentAttendancesModalOpened}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {studentName}
        </Typography>
        <TopMarginedButton
          variant="outlined"
          color="success"
          onClick={() => onAddAttendance('ATTENDED')}
        >
          Присутствует
        </TopMarginedButton>
        <TopMarginedButton
          variant="outlined"
          color="error"
          onClick={() => onAddAttendance('ABSEND')}
        >
          Отсутствует
        </TopMarginedButton>
        <TopMarginedButton
          variant="outlined"
          color="info"
          onClick={() => onAddAttendance('SERIOUS_REASON')}
        >
          Уважительная причина
        </TopMarginedButton>
      </Box>
    </Modal>
  );
};

export default SetStudentsAttendancesModal;
