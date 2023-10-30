import WidgetLayout from '../WidgetLayout'

import { BsBagCheck } from 'react-icons/bs'
import { defaultPhoto } from '@/assets/images'
import MyActionItem from '../ActionItem'


const actionList= [
    {
        title: "toan nguyen",
        subTitle: "Maternity Leave - US",
        userAvatar: defaultPhoto

    },
    {
        title: "nguyen vo",
        subTitle: "Maternity Leave - US",
        userAvatar: defaultPhoto

    },
    {
        title: "test",
        subTitle: "Maternity Leave - US",
        userAvatar: defaultPhoto

    },
    {
        title: "test",
        subTitle: "Maternity Leave - US",
        userAvatar: defaultPhoto

    },
    {
        title: "test",
        subTitle: "Maternity Leave - US",
        userAvatar: defaultPhoto

    },
    {
        title: "test",
        subTitle: "Maternity Leave - US",
        userAvatar: defaultPhoto

    },

]

const LeaveToday = () => {
    return (
        <WidgetLayout title='employee on leave today' widgetIcon={BsBagCheck}>
            <div className="flex flex-col justify-between items-start flex-wrap gap-y-2 min-w-[18rem]">
                {actionList && actionList.map((action, index) => <MyActionItem action={action} key={index} />)}
            </div>
        </WidgetLayout>
    )
}

export default LeaveToday