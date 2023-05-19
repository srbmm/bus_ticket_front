import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Chart = ({data}) => {
    return (
        <ResponsiveContainer width={1000} height={600}>
    <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="count" maxBarSize={100} fill="#8884d8" />
    </BarChart>
        </ResponsiveContainer>
    )
}
export default Chart