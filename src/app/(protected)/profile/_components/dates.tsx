/* "use client"

import React from 'react';
import { Calendar, ConfigProvider } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Dates = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD HH:mm'), mode);
  };

  return (
		<ConfigProvider
			theme={{
				components: {
					Calendar:{
						itemActiveBg: "#EDE4FF"
					}
				},
				token: {
					colorPrimary: "#9170D3",
					fontSize: 15,
				}
			}}
		>
		<Calendar 
			onPanelChange={onPanelChange} 
			className='fullBg-black'
			onSelect={(date, { source }) => {
					if (source === 'date') {
						console.log("Date: ", date.format("DD-MM"));
					}
				}
			}
		/>
		<Dialog>
			<DialogTrigger>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile &apos;</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
		</Dialog>
		</ConfigProvider>
	)
};

export default Dates

*/