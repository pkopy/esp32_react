import React from 'react';
import Paper from '@material-ui/core/Paper';

import Chart, {
    ArgumentAxis,
    CommonSeriesSettings,
    Legend,
    Series,
    Tooltip,
    ValueAxis,
    ConstantLine,
    Label
} from 'devextreme-react/chart';
import { Title } from 'devextreme-react/vector-map';

// import { complaintsData } from './data.js';
// const complaintsData = [
//     { complaint: 'Cold pizza', count: 1500 },
//     { complaint: 'Not enough cheese', count: 120 },
//     { complaint: 'Underbaked or Overbaked', count: 52 },
//     { complaint: 'Delayed delivery', count: 1123 },
//     { complaint: 'Damaged pizza', count: 321 },
//     { complaint: 'Incorrect billing', count: 89 },
//     { complaint: 'Wrong size delivered', count: 222 }
// ]


const complaintsData = []

class DetailChart extends React.Component {
    complaintsData = this.props.data


    render() {
        return (
            <Paper style={{height:'600px'}}>

                <Chart
                    style={{height:'90%',width:'90%', marginLeft:'auto', marginRight: 'auto', marginTop:'20px', marginBottom:'30px'}}
                    className='test'
                    // title={{
                    //     text:'Wykres zlecenia',
                    //     paddingTop: 10,
                    //     allignment: 'left'
                    // }}
                    dataSource={this.props.data.measurments}
                    palette={'Harmony Light'}
                    id={'chart'}
                >
                    <Title text={'Wykres'} margin={{top:50}}>
                    
                    </Title>
                    <ArgumentAxis allowDecimals={false}>
                        {/* <Label overlappingBehavior={'stagger'} /> */}
                    </ArgumentAxis>

                    <ValueAxis name={'frequency'} position={'left'} visualRange={[this.props.data.base - this.props.data.min - 10, this.props.data.base + this.props.data.max + 10]}>
                        <ConstantLine value={this.props.data.base} width={2} color={'#fc3535'} dashStyle={'dash'}>
                            <Label visible={true} />
                        </ConstantLine>
                        {/* <ConstantLine value={this.props.data[0].base} width={2} color={'blue'} dashStyle={'dash'}>
                        <Label visible={false} />
                    </ConstantLine> */}
                    </ValueAxis>
                    {/* <ValueAxis
                    name={'percentage'}
                    position={'right'}
                    tickInterval={20}
                    showZero={true}
                    valueMarginsEnabled={false}
                >
                    <Label customizeText={customizePercentageText} />
                    <ConstantLine value={80} width={2} color={'#fc3535'} dashStyle={'dash'}>
                        <Label visible={false} />
                    </ConstantLine>
                </ValueAxis> */}

                    <Series
                        name={'Wartość'}
                        valueField={'measure'}
                        axis={'frequency'}
                        type={'line'}
                        color={'#3f51b5'}
                    />
                    {/* <Series
                    name={'Cumulative percentage'}
                    valueField={'measureNumber'}
                    axis={'percentage'}
                    type={'spline'}
                    color={'#6b71c3'}
                /> */}

                    <Tooltip
                        enabled={true}
                        shared={true}
                        // customizeTooltip={customizeTooltip}
                    />

                    <Legend
                        verticalAlignment={'top'}
                        horizontalAlignment={'center'}
                    />

                    <CommonSeriesSettings argumentField={'measureNumber'} />
                </Chart>
            </Paper>
        );
    }
}

const data = complaintsData.sort(function (a, b) {
    return b.count - a.count;
});

const totalCount = data.reduce(function (prevValue, item) {
    return prevValue + item.count;
}, 0);

let cumulativeCount = 0;

const dataArray = complaintsData.map(function (item) {
    // cumulativeCount += item.count;
    console.log(item)
    return {
        complaint: item.measureNumber,
        count: item.measure,
        // cumulativePercentage: Math.round(cumulativeCount * 100 / totalCount)
    };
});

const customizeTooltip = function (info) {
    // console.log(info)
    return {
        html: `<div><div class="tooltip-header">${
            info.argumentText
            }</div><div class="tooltip-body"><div class="series-name">${
            info.points[0].seriesName
            }: </div><div class="value-text">${
            info.points[0].point.data.id
            }</div></div>`
    };
};

function customizePercentageText(info) {
    return `${info.valueText}%`;
}

export default DetailChart;
