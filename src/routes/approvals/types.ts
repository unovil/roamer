export type ItemType = {
    placeType: string;
    place: {
        id: number;
        name: string;
        image: string;
        blockedDates: PrismaJson.RangeDates;
    };
    requestId: number;
    adminsStatus: {
        name: string;
        id: number;
        status: PrismaJson.RequestStatus;
    }[];
    students: {
        name: string;
        section: string;
        id: number;
    }[];
    requestDates: PrismaJson.RangeDates;
    description: string;
};