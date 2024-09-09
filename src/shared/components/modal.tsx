import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import React from "react";

export interface ModalProps {
  open: boolean;
  title: string;
  body: string;
  textButton: string;
  role: 'error' | 'warning' | 'info';
  callback: () => void;
}

export const CustomModal: React.FC<ModalProps> = ({ open, title, body, role, textButton, callback }: ModalProps) => {
  return (
    <>
      <Dialog
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        open={open}
        handler={callback}
        size="sm"
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <span
            className={
              `text-${role === 'error' ? 'red' :
                role === 'warning' ? 'yellow' :
                  role === 'info' ? 'blue-gray' :
                    'blue-gray'}-500`
            }
          >{title}</span>
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>{body}</DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <Button
            variant="outlined"
            color={
              role === 'error' ? 'red' :
                role === 'warning' ? 'yellow' :
                  role === 'info' ? 'blue-gray' :
                    'blue-gray'
            }
            className="mt-6 text-center flex justify-center items-center"
            onClick={callback}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>{textButton}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
} 