"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import GetTeacher from "./actions/getTeacher";
import { Teacher } from "./actions/typeUser"
import getAllSubscription from "@/actions/getAllSubscription";
import { User, UserRole, UserSubscriptions } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TeacherBox from "./teacherBox";
import { currentUser } from "@/lib/auth";
import GetUser from "./actions/getUser";
import { ClipLoader } from "react-spinners";
import ApplicationBox from "./application/applicationBox";
import Subscriptions from "./subscriptions/subscriptions";
import UserInfo from "./userInfo/userInfo";

type allInf = {
	user: {
			id: string;
			name: string | null;
			surname: string | null;
			mail: string | null;
			favourites: string[];
			image: string | null;
			role: UserRole;
			teacherUser: {
					id: string;
			};
	};
}

type Props = {
	user: User
}

const CardProfile = ({user}: Props) => { 

	if (!user) {
		return (
			<div className="w-full h-[80vh] flex items-center justify-center flex-col gap-3">
				<h1 className="text-xl font-semibold text-[#835BD2]">Загрузка данных...</h1>
				<ClipLoader size={40} color="#835BD2" />
			</div>
		)
	}

	return (
		<div className="flex">
			<div className='flex relative'>
				<UserInfo user={user}/>
			</div>
			<div className="ml-5 md:w-[300px] h-[405px] lg:h-[420px] lg:w-[320px] xl:w-[340px] 2xl:w-[360px] bg-white p-6 rounded-3xl shadow-lg w-full mt-10 text-gray-600">
				<ApplicationBox user={user}/>
			</div>
			<div className="ml-5 mt-10 flex flex-col gap-5">
				<div className="md:w-[280px] h-[192px] lg:h-[200px] lg:w-[300px] xl:w-[320px] 2xl:w-[340px] bg-white p-6 rounded-3xl shadow-lg w-full text-gray-600">
					<Subscriptions user={user} />
				</div>
				<div className="md:w-[280px] h-[193px] lg:h-[200px] lg:w-[300px] xl:w-[320px] 2xl:w-[340px] bg-white p-6 rounded-3xl shadow-lg w-full text-gray-600">
					ffff
				</div>
			</div>
		</div>
	)
}

export default CardProfile;
