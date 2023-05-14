const YellowCard = ({data}) => {
        return (<div className="bg-yellow-300 text-gray-700 p-1 rounded">
                <div className="flex justify-between">
                    <div>اتوبوس ها: {data.bus_name}</div>
                    <div>نام ایستگاه: {data.station_name}</div>
                </div>
            </div>);

};

export default YellowCard;
