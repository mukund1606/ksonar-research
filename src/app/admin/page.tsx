"use client";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";

export default function AdminPage() {
  const {
    isOpen: isChangePasswordOpen,
    onOpen: onChangePasswordOpen,
    onOpenChange: onChangePasswordOpenChange,
  } = useDisclosure();

  return (
    <>
      <div className="mt-4 flex flex-col items-center gap-24 px-4 md:px-8 xl:px-12">
        <div>
          <h1 className="mb-4 mt-8 text-center text-4xl font-bold">Manage</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button
              className="w-full text-xl font-bold"
              color="primary"
              as={Link}
              href="/admin/reports"
            >
              Manage Reports
            </Button>
            {/* <Button className="w-full text-xl font-bold" color="secondary">
              Manage Feedbacks
            </Button> */}
            <Button
              className="w-full text-xl font-bold"
              color="danger"
              onPress={onChangePasswordOpen}
            >
              Change Password
            </Button>
            <Modal
              isDismissable={false}
              isOpen={isChangePasswordOpen}
              onOpenChange={onChangePasswordOpenChange}
            >
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  Change Password
                </ModalHeader>
                <ModalBody>
                  <ChangePasswordForm />
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
