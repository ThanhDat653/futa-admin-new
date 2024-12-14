import Link from "next/link";
import {IScheduleGroupByRegion, IScheduleInGroup} from "@/models/dashboard";
import {formatDistance, formatDuration, formatVND} from "@/lib/utils";

interface IPopularRouteCardProps {
    departure: string
    img: string
    schedule: IScheduleInGroup[]
}

const PopularRouteCard = ({
                              schedule,
                              departure,
                              img,
                          }: IPopularRouteCardProps) => {
    return (
        <div className="flex w-full flex-col">
            {schedule?.map((trip) => (
                <div
                    className="w-full border-b border-gray-100 px-5 py-4"
                    key={trip.id}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg capitalize text-teal-700">
                            {departure} - {trip.regionTo.name}
                        </h3>
                        <h5 className="text-gray-900">{formatVND(trip.price)}</h5>
                    </div>
                    <p className="w-full text-left text-base text-gray-500">
                        {formatDistance(trip.distance)} -{' '}
                        {formatDuration(trip.duration)}
                    </p>
                </div>
            ))}
        </div>
    )
}

const PopularRoute = async ({data}: { data: IScheduleGroupByRegion[] }) => {
    // console.log(data)

    return (
        <div className="w-full bg-white rounded-xl">
            <div className="container mx-auto flex flex-col items-center justify-start">
                <div
                    className="flex-col h-fit w-full items-center justify-start overflow-x-scroll lg:justify-center lg:overflow-visible">
                    {data.map((schedule) => (
                        <PopularRouteCard
                            schedule={schedule.schedules}
                            departure={schedule.name}
                            img={`https://trip.s3-hcm-r1.s3cloud.vn/landing/${schedule.slug}.png`}
                            key={schedule.slug}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PopularRoute
