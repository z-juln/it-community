import { FireOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export interface MenuItem {
  path: string;
  label: string;
  icon?: React.ReactChildren | JSX.Element;
}

export interface TabConfig {
  top: MenuItem[];
  userDropDown: Required<MenuItem>[];
}

const tabConfig: TabConfig = {
  top: [
    { path: "/", label: "首页" },
    { path: "/ranking", label: "排行榜" },
  ],
  userDropDown: [
    {
      path: "/author-center",
      label: "贡献者中心",
      icon: <FireOutlined />,
    },
    { path: "/contact", label: "联系我们", icon: <QuestionCircleOutlined /> },
    { path: "/about", label: "关于我们", icon: <QuestionCircleOutlined /> },
  ],
};

export default tabConfig;
