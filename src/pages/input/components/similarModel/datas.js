
const planTypeArr1 = ['“尖兵”“领雁”研发攻关项目', '改革创新平台计划项目', '公益技术应用研究项目'];
const planTypeArr2 = ['尖兵领雁', '重点研发', '基础公益', '人才团队', '其他'];
const docTypeArr = ['项目申报书', '科技报告', '其他'];
const wayArr = ['对比', '自比'];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

const SELECTAREA = {
    省级: '',
    地市级: '',
    '县（市、区）级': '',
};

const CHECKLIST = [
    {
        value: '省级',
        name: 'province',
    },
    {
        value: '地级市',
        name: 'city',
    },
    {
        value: '县（市、区）级',
        name: 'district',
    },
];


export { planTypeArr1, planTypeArr2, docTypeArr, wayArr, SELECTAREA, CHECKLIST, formItemLayout }
