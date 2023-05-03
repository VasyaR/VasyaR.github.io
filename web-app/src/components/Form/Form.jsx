import { Box, Modal } from "@mui/material";
import { Portal } from "../Portal/Portal";
import { style } from "./Form.styles";

export const Form = ({ children, open, openModal }) => {
  return (
    <>
      {open ? (
        <Portal>
          <Modal
            open={open}
            onClose={openModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              {children}
              {/* <ChildModal /> */}
            </Box>
          </Modal>
        </Portal>
      ) : null}
    </>
  );
};
