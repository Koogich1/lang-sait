"use client"

import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import GetTeacher from "./actions/getTeacher";
import { Teacher } from "./actions/typeUser"
import getAllSubscription from "@/actions/getAllSubscription";
import { Language, User, UserRole, UserSubscriptions } from "@prisma/client";

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
import findUserLanguages from "../settings/components/languages/findUserLanguages";
import Image from "next/image";
import HomeWorkBox from "./homeWork/homeWorkBox";

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
		<div className="flex flex-col gap-3 mt-5">
			<div className="flex w-full flex-col sm:flex-row gap-3 items-start">
				<div className='flex md:w-1/2 relative w-full lg:w-1/3 min-w-[260px]'>
					<UserInfo user={user}/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/3 lg:min-w-[310px] xl:min-w-[360px] bg-white py-4 px-3 rounded-3xl shadow-lg text-gray-600">
					<ApplicationBox user={user}/>
				</div>
				<div className="hidden lg:block w-full md:w-1/2 lg:w-1/3 bg-white py-4 px-3 rounded-3xl shadow-lg text-gray-600">
					<HomeWorkBox user={user} />
				</div>
			</div>
			<div className="flex w-full flex-col sm:flex-row gap-3 items-start">
				<div className="lg:hidden w-full bg-white py-4 px-3 rounded-3xl shadow-lg text-gray-600">
					<HomeWorkBox user={user} />
				</div>
			</div>
		</div>
	)
}

export default CardProfile;
