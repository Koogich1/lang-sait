"use client"

import { useCallback, useEffect, useState } from "react"
import CardProfile from "../_components/card-profile"
import Header from "../_components/header"
import { currentUser } from "@/lib/auth"
import type { ExtendedUser } from "@/next-auth"
import { ClipLoader } from "react-spinners"
import { auth } from "@/auth"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    const userinfo = await currentUser();
    if (userinfo) {
      setUser(userinfo);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [fetchUser, user]);

  if (!user) {
    return(
      <div className="w-full h-[100vh] flex items-center justify-center">
        <ClipLoader color="#835BD2" size={100}/>
      </div>
    )
  }

  if(user.role === "MODERATOR"){
    router.push("/createCourses/materials")
  }

  return(
    <div>
      <div>
        <Header 
          header="Профиль"
          user={user}
        />
      </div>
      <CardProfile user={user}
      />
    </div>
  )
}

export default UserProfile
