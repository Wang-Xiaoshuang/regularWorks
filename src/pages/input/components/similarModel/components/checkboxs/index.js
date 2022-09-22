import { useState } from 'react';
import { Form, Checkbox, Radio } from 'antd';

const CheckboxGroup = Checkbox.Group;

const GenerateCheckboxs = props => {
    const { arr, name, label, form, setWay, radio, disable } = props;
    // 通过form和setWay直接改动了父组件里的状态
    const [indeterminate, setIndeterminate] = useState(false); // 不定—部分选中
    const [checkAll, setCheckAll] = useState(false); // 判定是否勾选“全选”

    const onChange = list => {
        if (setWay) {
            setWay(list.target.value);
        } else {
            setIndeterminate(!!list.length && list.length < arr.length);
            setCheckAll(list.length === arr.length);
        }
    };

    const onCheckAllChange = e => {
        if (e.target.checked) {
            form.setFields([{ name, value: arr }]);
        } else {
            form.setFields([{ name, value: [] }]);
        }
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return radio ? (
        // 单选
        <Form.Item name={name} label={label} initialValue={arr[0]}>
            <Radio.Group options={arr} onChange={onChange} />
        </Form.Item>
    ) : (
        <>
            <Form.Item label={label}>
                <Checkbox
                    disabled ={disable}
                    indeterminate={indeterminate}
                    onChange={e => onCheckAllChange(e, arr)}
                    checked={checkAll}
                >
                    全部
                </Checkbox>
                <Form.Item name={name} noStyle>
                    <CheckboxGroup disabled ={disable} options={arr} onChange={onChange} />
                </Form.Item>
            </Form.Item>
        </>
    );
};

export default GenerateCheckboxs;
