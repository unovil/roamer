// See https://kit.svelte.dev/docs/types#app

import type { Department } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace PrismaJson {
		type DepartmentsType = { departments: Array<Department> }
		type DatesType = { dates: Array<Date>?}
	}
}

export { };
