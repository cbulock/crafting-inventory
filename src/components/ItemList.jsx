'use client';

import React, { useEffect, useState } from 'react';
import { List, Typography, Spin } from 'antd';
import { supabase } from '../utils/supabaseClient';

const { Text } = Typography;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('items').select('name');

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data);
      }

      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) {
    return <Spin />;
  }

  return (
    <List
      header={<div>Item List</div>}
      bordered
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <Text>{item.name}</Text>
        </List.Item>
      )}
    />
  );
};

export default ItemList;
