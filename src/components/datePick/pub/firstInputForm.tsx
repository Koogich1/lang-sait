"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { HiMiniArrowLongRight } from "react-icons/hi2";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FirstTimeFreeUpdate from "../firstTimeUpdateToFree";
import { DayOfWeek } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import Link from "next/link";


const items = [
  {
    id: "MONDAY",
    label: "Понедельник",
  },
  {
    id: "TUESDAY",
    label: "Вторник",
  },
  {
    id: "WEDNESDAY",
    label: "Среда",
  },
  {
    id: "THURSDAY",
    label: "Четверг",
  },
  {
    id: "FRIDAY",
    label: "Пятница",
  },
  {
    id: "SATURDAY",
    label: "Cуббота",
  },
  {
    id: "SUNDAY",
    label: "Воскресенье",
  },
] as const

const FormSchema = z.object({
  firstTime: z.string(),
  secondTime: z.string(),

  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export const FirstTimeInputForm = () => {

  const [isCreateTransition, startCreateTransition] = useTransition();
  const [ open, setOpen ] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstTime: "12:00",
      secondTime: "18:00",
    },
  });

  return(
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit((data) => {
        startCreateTransition(async () => {
          const dayOfWeek: DayOfWeek[] = data.items.map((item) => item as DayOfWeek);
          FirstTimeFreeUpdate(dayOfWeek, data.firstTime, data.secondTime);
        });
      })}
        className="flex items-center justify-center mt-2 w-full flex-col ml-[20%]"
      >
        <div className="flex items-center justify-center gap-3 w-full px-5 relative">
          <div className="absolute left-0 ml-[-120px] mt-[-52px] p-5 py-[34px] outline-none">
            <FormItem className="rounded-xl bg-white p-5 py-[34px] ml-[-15px] shadow-lg border-r-2">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex space-x-3 space-y-0 cursor-pointe items-center"
                        >
                          <FormControl className="p-0 m-0">
                          <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = field.value || [];
                                return checked
                                  ? field.onChange([...updatedValue, item.id])
                                  : field.onChange(updatedValue.filter((value) => value !== item.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              <FormMessage />
            </FormItem>
          </div>
          <div>
            
          </div>
          <FormField
            control={form.control}
            name="firstTime"
            render={({ field }) => (
              <FormItem className="w-[120px]">
                <FormLabel></FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="От" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="00:00">00:00</SelectItem>
                    <SelectItem value="01:00">01:00</SelectItem>
                    <SelectItem value="02:00">02:00</SelectItem>
                    <SelectItem value="03:00">03:00</SelectItem>
                    <SelectItem value="04:00">04:00</SelectItem>
                    <SelectItem value="05:00">05:00</SelectItem>
                    <SelectItem value="06:00">06:00</SelectItem>
                    <SelectItem value="07:00">07:00</SelectItem>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="12:00">12:00</SelectItem>
                    <SelectItem value="13:00">13:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="17:00">17:00</SelectItem>
                    <SelectItem value="18:00">18:00</SelectItem>
                    <SelectItem value="19:00">19:00</SelectItem>
                    <SelectItem value="20:00">20:00</SelectItem>
                    <SelectItem value="21:00">21:00</SelectItem>
                    <SelectItem value="22:00">22:00</SelectItem>
                    <SelectItem value="23:00">23:00</SelectItem>
                    <SelectItem value="24:00">24:00</SelectItem>
                  </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <HiMiniArrowLongRight className="text-[28px] mt-2"/>
          <FormField
            control={form.control}
            name="secondTime"
            render={({ field }) => (
              <FormItem className="w-[120px]">
                <FormLabel></FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="До" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="00:00">00:00</SelectItem>
                    <SelectItem value="01:00">01:00</SelectItem>
                    <SelectItem value="02:00">02:00</SelectItem>
                    <SelectItem value="03:00">03:00</SelectItem>
                    <SelectItem value="04:00">04:00</SelectItem>
                    <SelectItem value="05:00">05:00</SelectItem>
                    <SelectItem value="06:00">06:00</SelectItem>
                    <SelectItem value="07:00">07:00</SelectItem>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="12:00">12:00</SelectItem>
                    <SelectItem value="13:00">13:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="17:00">17:00</SelectItem>
                    <SelectItem value="18:00">18:00</SelectItem>
                    <SelectItem value="19:00">19:00</SelectItem>
                    <SelectItem value="20:00">20:00</SelectItem>
                    <SelectItem value="21:00">21:00</SelectItem>
                    <SelectItem value="22:00">22:00</SelectItem>
                    <SelectItem value="23:00">23:00</SelectItem>
                    <SelectItem value="24:00">24:00</SelectItem>
                  </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit"
          variant="violetSelect" 
          disabled={isCreateTransition}
          className="mt-5 text-base px-10 font-semibold"
          onClick={handleOpen}
        >
          Подтвердить
        </Button>
      </form>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#835BD2]">Вы создали ваше первое расписание!</DialogTitle>
            <DialogDescription className="flex justify-start items-center py-5 text-base text-gray-400">
              <p className="w-1/2">Сейчас вы перейдете в окно, где сможете точнее настроить расписание и ознакомиться с основным интерфейсом.</p>
              <Image alt="main" src={"/mainImg.png"} width={200} height={200} className="absolute right-10 bottom-6"/>
            </DialogDescription>
          </DialogHeader>
          <Link href={'/profile/settings'}>
            <Button variant='violetSelect' className="text-base font-semibold w-[150px]">
              Перейти!
            </Button>
          </Link>
        </DialogContent>
      </Dialog>
  </Form>
    )
};
