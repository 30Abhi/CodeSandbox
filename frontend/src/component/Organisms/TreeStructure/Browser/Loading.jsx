import React, { useEffect, useRef } from 'react';
import { Flex, Row, Spin, Switch,Input } from 'antd';

export const Loading = () => {
    const [auto, setAuto] = React.useState(false);
    const [percent, setPercent] = React.useState(-50);
    const timerRef = React.useRef(null);
    React.useEffect(() => {
      timerRef.current = setTimeout(() => {
        setPercent((v) => {
          const nextPercent = v + 5;
          return nextPercent > 150 ? -50 : nextPercent;
        });
      }, 100);
      return () => clearTimeout(timerRef.current);
    }, [percent]);
    const mergedPercent = auto ? 'auto' : percent;
    return (
      <Flex align="center" gap="middle">
        
        <Spin percent={mergedPercent} size="small" />
        <Spin percent={mergedPercent} />
        <Spin percent={mergedPercent} size="large" />
      </Flex>
    );
  };
  
      
