"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

const TimeInputFirst = z.object({
  firstTime: z.number().max(24),
  secondTime: z.number().max(24),
})

export const FirstTimeInputForm = () => {

  const [isCreateTransition, startCreateTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(TimeInputFirst),
    defaultValues: {
      firstTime: 12,
      secondTime: 18,
    },
  });

  return(
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit((data) => {
        startCreateTransition(async () => {
          {/* createEmptyTeacherAvailability(data.firstTime, data.secondTime); 
            
            ТУТ КАРОЧЕ НУЖНО ВСТАВИТЬ ШТУКУ, КОТОРАЯ ПРИНИМАЕТ ВСЕ ТЫКИ ИЛИ РАНГЕ, ГДЕ ЧЕЛОВЕК СВОБОДЕН, ЗАНЯТ
            И ПР, В ИНПУТАХ ВСЕ УЖЕ РАБОТАЕТ!

            */}
        });
      })}
      >
        <FormField
          control={form.control}
          name="firstTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название..." {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secondTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Input placeholder="Название..." {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isCreateTransition}>Добавить</Button>
      </form>
  </Form>
    )
};
