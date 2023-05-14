const GreenCard = ({data}) => {
    return (
        <div className="bg-green-300 text-gray-700 p-1 rounded">
                <div className="flex justify-between">
                    <div>اتوبوس: {data.bus_name}</div>
                    <div>نام ایستگاه: {data.station_name}</div>
                </div>
            </div>);
};

export default GreenCard;
