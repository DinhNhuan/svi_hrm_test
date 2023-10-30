import React from 'react';

import { MdBolt } from 'react-icons/md';
import { iconAssignLeave, iconLeaveCalendar, iconLeaveList, iconMyLeave } from '@/assets/images';
import QuickAccessItem from './QuickAccessItem';
import WidgetLayout from '../WidgetLayout';




const items = [
    {
        title: "assign leave",
        image: iconAssignLeave,
        path: ""
    },
    {
        title: "leave list",
        image: iconLeaveList,
        path: ""
    },
    {
        title: "my leave",
        image: iconMyLeave,
        path: ""
    },
    {
        title: "leave calendar",
        image: iconLeaveCalendar,
        path: ""
    },


]


const QuickAccess = () => {
    return (
        <WidgetLayout title='quick access' widgetIcon={MdBolt}>
            <div className="flex justify-between items-start flex-wrap ">
                {items && items.map(item => <QuickAccessItem key={item.title} item={item} />)}
            </div>
        </WidgetLayout>

    )
}

export default QuickAccess