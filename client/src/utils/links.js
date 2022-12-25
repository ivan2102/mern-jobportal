import {RiPieChart2Fill} from 'react-icons/ri';
import {ImStatsBars2} from 'react-icons/im';
import {GrFormAdd} from 'react-icons/gr';
import {CgProfile} from 'react-icons/cg';

const links = [

    {
       id: 1,
       text: 'stats',
       path: '/',
       icon: <RiPieChart2Fill />
    },

    {
        id: 2,
        text: 'all jobs',
        path: 'all-jobs',
        icon: <ImStatsBars2 />
     },

     {
        id: 3,
        text: 'add job',
        path: 'add-job',
        icon: <GrFormAdd />
     },

     {
        id: 4,
        text: 'profile',
        path: 'profile',
        icon: <CgProfile />
     }
]

export default links;