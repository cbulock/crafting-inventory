'use client';

import { useAuth } from '@/context/AuthContext';
import { Avatar, Flex, Spin, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const HeaderBar = () => {
  const { user } = useAuth();

  if (!user) {
    return <Spin />;
  }

  return (
    <Flex>
      <Title>Crafting Inventory</Title>
      <Text>{user?.user_metadata?.name}</Text>
      <Avatar
        size={48}
        icon={<UserOutlined />}
        src={user?.user_metadata?.avatar_url}
      />
    </Flex>
  );
};

export default HeaderBar;
