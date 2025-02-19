'use client';

import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import axiosInstance from '@/lib/axios/axiosInstance';
import toasting from '@/lib/utils/toasting';
import toastMessage from '@/lib/constants/toastMessage';

import { useUser } from '@/store/useUser';

import Modal from '@/components/Modal/Modal';

interface LogOutModalProps {
  handleSetOff: () => void;
}

const oauthType = {
  // TODO oauth type 전달
  kakao: 'kakao',
  naver: 'naver',
  google: 'google',
};

export default function LogoutModal({ handleSetOff }: LogOutModalProps) {
  const router = useRouter();
  const { logoutUser } = useUser();

  const handleLogout = async () => {
    try {
      const result = await axiosInstance.patch(`/auth/${oauthType.kakao}`);

      if (result.status === 204) {
        logoutUser();
        toasting({ type: 'success', txt: toastMessage.ko.loggedOut });
        router.push('/');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toasting({ type: 'error', txt: toastMessage.ko.loggedOutError });
      }
    }
  };

  return (
    <Modal handleModalClose={handleSetOff}>
      <Modal.Title>로그아웃 하시나요?</Modal.Title>
      <Modal.Button onCancel={handleSetOff} onClick={handleLogout}>
        확인
      </Modal.Button>
    </Modal>
  );
}
