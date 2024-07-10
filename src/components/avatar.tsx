"use client"

import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import axios from "axios";
import userImg from "@/actions/getImageUser";

type Props = {
  id: string;
};

const Avatar: React.FC<Props> = ({ id }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user?endpoint=current`);
        const user = response.data
        const userImage = user.image
        setImageUrl(userImage)
      } catch (error) {
        console.error("Error fetching user avatar:", error);
      }
    };

    fetchUserAvatar();
  }, [id]);

  return (
    <div>
      {imageUrl}
    </div>
  );
};

export default Avatar;