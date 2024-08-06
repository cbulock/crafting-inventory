'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
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
import supabase from '../utils/supabaseClient';

const FormSchema = z.object({
  item: z.number({
    required_error: 'Please select an item.',
  }),
});

const ItemSearch = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  // TODO: add loading state
  // const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('items').select('id, name');

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data);
      }

      // setLoading(false);
    };

    fetchItems();
  }, []);

  const onSubmit = async (data) => {
    const { error } = await supabase
      .from('user_items')
      .insert([{ item: data.item, user: user?.id }]);

    if (error) {
      toast({
        variant: 'destructive',
        description: `Error inserting item: ${error.message}`,
      });
    } else {
      toast({
        description: 'Item added successfully',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ItemSearch;
