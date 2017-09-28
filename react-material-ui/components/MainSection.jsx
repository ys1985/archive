import React, { Component, PropTypes } from 'react';
import mui, {CircularProgress,
             Tabs,
             Tab,
             DatePicker
            } from 'material-ui';

class MainSection extends Component {
  render() {
    return (
      <div>
        <h1>Progress Component / 読み込みアニメーション</h1>
        <CircularProgress mode="indeterminate" size={1.5} />
        <CircularProgress mode="indeterminate" color={"red"} size={2} />
        <br/>

      <h1>Tab Component / タブ切り替え</h1>
      <Tabs>
          <Tab label="タブ1" value="0" />
          <Tab label="タブ2" value="1" />
          <Tab label="タブ3" value="2" />
        </Tabs>
        <br/>
        <h1>DatePicker Component / カレンダー日付入力</h1>
        <DatePicker hintText="Portrait Dialog" />
        <br/>
      </div>

    );
  }
}

export default MainSection;
