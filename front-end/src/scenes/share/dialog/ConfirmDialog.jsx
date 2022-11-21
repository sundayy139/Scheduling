import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

const ConfirmDialog = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { confirmDialog, setConfirmDialog } = props;

  console.log(props);

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={confirmDialog.isOpen}
      sx={{ textAlign: "center" }}
    >
      <DialogTitle sx={{ padding: "0" }}>
        <Box fontSize="80px" m="0">
          <HelpCenterIcon color="error" fontSize="inherit" />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="h4"
          mb="10px"
          fontWeight="bold"
          color={colors.grey[100]}
        >
          {confirmDialog.title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Box p="10px 0 20px 0">
          <Button
            sx={{ marginRight: "20px" }}
            color="error"
            variant="contained"
            onClick={() =>
              setConfirmDialog({ ...confirmDialog, isOpen: false })
            }
          >
            No
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={confirmDialog.onConfirm}
          >
            Yes
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
