export type Teacher = {
	user: {
			id: string;
			name: string | null;
			surname: string | null;
			mail: string | null;
			favourites: string[];
			image: string | null;
			lessons: number | undefined;
			role: string | null;
			teacherUser: {
					id: string;
					name: string | null;
					surname: string | null;
					mail: string | null;
					favourites: string[];
					image: string | null;
			};
	};
};