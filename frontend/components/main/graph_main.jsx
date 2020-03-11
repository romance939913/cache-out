import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, Tooltip } from 'recharts';

class GraphMain extends React.Component {


    render() {
        const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },];
        const renderLineChart = (
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <YAxis />
                <Tooltip />
            </LineChart>
        );
        return (
            <div>
                {renderLineChart}
            </div>
        )
    }
}

export default GraphMain