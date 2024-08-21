'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import useStore from '@/store';
import supabase from '../utils/supabaseClient';

const FormSchema = z.object({
  item: z.number({
    required_error: 'Please select an item.',
  }),
  quantity: z.number({
    required_error: 'Please enter a quantity.',
  }),
});

const ItemSearch = ({ projectId }) => {
  const { user } = useAuth();
  const { fetchItems } = useStore();
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState(null);
  // TODO: add loading state
  // const [loading, setLoading] = useState(true);

  if (!projectId) {
    return null;
  }

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fetchDefaultItems = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('id, name')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data);
      }
      // setLoading(false);
    };

    fetchDefaultItems();
  }, []);

  const onSubmit = async (data) => {
    const { item, quantity } = data;
    const { error } = await supabase.from('user_items').insert([
      {
        name: itemName,
        project: projectId,
        source_item: item,
        quantity,
        user: user?.id,
      },
    ]);

    if (error) {
      toast({
        variant: 'destructive',
        description: `Error inserting item: ${error.message}`,
      });
    } else {
      toast({
        description: 'Item added successfully',
      });
      fetchItems({ projectId, userId: user?.id });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-4 mb-4"
      >
        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Item</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? items.find((item) => item.id === field.value)?.name
                        : 'Select an item'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search items..." />
                    <CommandList>
                      <CommandEmpty>No item found.</CommandEmpty>
                      <CommandGroup>
                        {items.map((item) => (
                          <CommandItem
                            value={item.id}
                            key={item.id}
                            onSelect={() => {
                              form.setValue('item', item.id);
                              setItemName(item.name);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                item.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {item.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Controller
                  name="quantity"
                  control={form.control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <input
                      type="number"
                      name={name}
                      ref={ref}
                      value={value}
                      onBlur={onBlur}
                      onChange={(e) =>
                        onChange(
                          e.target.value === '' ? '' : Number(e.target.value),
                        )
                      }
                      style={{ width: '8ch' }}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end">
          Add to Inventory
        </Button>
      </form>
    </Form>
  );
};

ItemSearch.propTypes = {
  projectId: PropTypes.number,
};

export default ItemSearch;
