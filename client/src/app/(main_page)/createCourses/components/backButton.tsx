"use client"

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { HiArrowLeft } from 'react-icons/hi';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // Возвращает на предыдущую страницу
  };

  return (
    <Button onClick={handleBackClick} className="p-0 flex gap-2 py-1 h-8 px-2 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-600 text-sm font-semibold">
      <HiArrowLeft />
      <h1>Назад</h1>
    </Button>
  );
};

export default BackButton;
