
import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getSalesReportApi } from './apiCalls/getSalesReport';
import { useDispatch, useSelector } from 'react-redux';
import { setSalesReportList } from '../../redux/salesReport';
import { RootState } from '../../redux/store';
import ReportHeader, { SelectedDate } from '../components/reports/ReportHeader';
import SalesTable from "../components/reports/SalesTable";

export const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const SalesReport = () =>{
    return(
        <div>slaes</div>
    )
}

export default SalesReport;


