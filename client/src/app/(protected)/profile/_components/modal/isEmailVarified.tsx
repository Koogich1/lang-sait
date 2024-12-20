"use client"

import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Props = {
	user: User | null
}

const IsEmailVerifiedModal = ({ user }: Props) => {
    const [isModalShown, setIsModalShown] = useState(false);

    useEffect(() => {
        const hasModalBeenShown = sessionStorage.getItem('isEmailModalShown');

        // Проверяем, показано ли модальное окно за текущую сессию
        if (!hasModalBeenShown && user && user.emailVerified) {
            setIsModalShown(true);
            sessionStorage.setItem('isEmailModalShown', 'true');
        }
    }, [user]);

    const closeModal = () => {
        setIsModalShown(false);
    };

    return (
        <Dialog open={isModalShown} onOpenChange={setIsModalShown}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Email не подтвержден</DialogTitle>
                    <DialogDescription>
                        Пожалуйста, проверьте вашу электронную почту для подтверждения.
                    </DialogDescription>
                </DialogHeader>
                {/* Кнопка для закрытия модального окна */}
                <button onClick={closeModal}>Закрыть</button>
            </DialogContent>
        </Dialog>
    );
};

export default IsEmailVerifiedModal;
