// See https://kit.svelte.dev/docs/types#app

import type { Department } from "@prisma/client";
import { lucia } from "$lib/server/auth";
import type { AuthRequest, Session, User } from "lucia";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
		}

		interface PageData {
			user?: User;
		}
		// interface PageState {}
		// interface Platform {}
	}

	namespace PrismaJson {
		type DepartmentsType = { departments: Array<Department>?}
		type DatesType = { dates: Array<Date>?}
	}
}

type Departments = PrismaJson.DepartmentsType;
type Dates = PrismaJson.DatesType;

export { Departments, Dates };
