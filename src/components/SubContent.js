import { useRef, useEffect, useState } from 'react';
import { Button } from 'antd';

function classNameContainsClass(fullClassName, className) {
  return !!fullClassName && new RegExp(`(?:^|\\s)${className}(?:\\s|$)`).test(fullClassName);
}

function addClass(el, className = 'default') {
  if (typeof el.classList === 'object') {
    el.classList.add(className);
  }
  let elClass = el.className;
  if (elClass) {
    if (!classNameContainsClass(elClass, className)) {
      elClass += ` ${className}`;
    }
  } else {
    elClass = className;
  }
  // eslint-disable-next-line no-param-reassign
  el.className = elClass;
}

function deleteClass(el, className) {
  if (typeof el.classList === 'object') {
    el.classList.remove(className);
  }
  let elClass = el.className;
  if (elClass) {
    elClass = elClass.replace(new RegExp(`(?:^|\\s)${className}(?:\\s|$)`), '');
    // eslint-disable-next-line no-param-reassign
    el.className = elClass;
  }
}

export default ({ data }) => {
  const [expand, setExpand] = useState(0); // 0:收起 1:展开 2:隐藏
  const domRef = useRef();
  useEffect(() => {
    if (domRef.current) {
      if (domRef.current.scrollHeight === domRef.current.offsetHeight) {
        setExpand(2);
      }
      if (domRef.current.scrollHeight > domRef.current.offsetHeight) {
        // addClass(domRef.current, 'lz-hidde-clamp');
        setExpand(1);
      }
    }
    return () => {};
  }, [data]);
  function toggleExpand() {
    if (domRef.current) {
      if (expand) {
        addClass(domRef.current, 'lz-hidde-clamp');
        setExpand(0);
      } else {
        deleteClass(domRef.current, 'lz-hidde-clamp');
        setExpand(1);
      }
    }
  }
  return (
    <div>
      <div className="lz-second-content lz-line2" ref={domRef}>
        {data}
      </div>
      {expand !== 2 ? (
        <div style={{ textAlign: 'right' }} data-pdf="hidden">
          <Button type="link" onClick={toggleExpand} className="lz-sub-more">
            {expand === 1 ? '展开全部' : '收起'}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
