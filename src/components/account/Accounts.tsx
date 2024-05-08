"use client";

import React from "react";
import { MdTune } from "react-icons/md";
import SearchIcon from "@/assets/icons/search.svg";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCaretDown } from "react-icons/fa";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { accounts } from "@/lib/sample";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const Accounts = () => {
  const { toast } = useToast();
  const pageAccounts = [10, 20, 30];
  return (
    <div className="flex flex-col gap-6 mb-12">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-[18px] leading-[20px]">
          Accounts: 40
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            className="bg-[#FFFFFF26] hover:bg-current hover:opacity-50 p-2 rounded-sm"
          >
            <SearchIcon />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="bg-[#FFFFFF26] hover:bg-current hover:opacity-50"
              >
                <MdTune color="white" size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#333153] border-white/30 border rounded-3 w-[356px] "
              align="end"
            >
              <DropdownMenuLabel className="text-white font-semibold text-[14px] leading-[20px]">
                Filters
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#FFFFFF26] h-[1px]" />
              <DropdownMenuGroup className="pt-4 pb-6">
                <DropdownMenuLabel className="font-normal text-[14px] leading-[20px] text-white/60 py-2 px-6">Region</DropdownMenuLabel>
                <DropdownMenuItem className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="all" />
                  <span>All</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="australia" />
                  <span>Australia</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="europe" />
                  <span>Europe</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="usa" />
                  <span>USA</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#FFFFFF26] h-[1px]" />
              <div className="w-full justify-end flex py-3 pr-4">
                <Button disabled className="rounded-sm py-2.5 px-6 w-[91px] h-10">Apply</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border border-white/20 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF0A] ">
            <TableRow>
              <TableHead className="flex items-center gap-1 text-white/60">
                <span>Account Name</span>
                <FaCaretDown size={15} />
              </TableHead>
              <TableHead className="text-white/60">Country</TableHead>
              <TableHead className="text-white/60">DID</TableHead>
              <TableHead className="text-white/60">Bio</TableHead>
              <TableHead className="flex items-center gap-1 text-white/60">
                <span>Date/time created</span>
                <FaCaretDown size={15} />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account, index) => (
              <TableRow key={index} className="border-white/10">
                <TableCell className="flex items-center text-[14px] font-normal leading-[20px] gap-4 pl-6">
                  <img
                    src={account.profile}
                    className="w-10 h-10 rounded-sm"
                    alt="account-image"
                  />
                  <div>{account.name}</div>
                </TableCell>
                <TableCell className="text-[14px] font-normal leading-[20px]">
                  {account.country}
                </TableCell>
                <TableCell className="text-[#8566F2] flex items-center gap-3 text-[14px] font-normal leading-[20px]">
                  <div>{account.did}</div>
                  <CopyIcon
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(account.did);
                      toast({
                        description: "Account did copied!!!",
                      });
                    }}
                  />
                </TableCell>
                <TableCell className="text-[14px] font-normal leading-[20px]">
                  {account.bio}
                </TableCell>
                <TableCell className="text-[14px] font-normal leading-[20px]">
                  {account.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>Show rows</div>
          <Select>
            <SelectTrigger className="w-20 h-10 py-2 pl-2.5 pr-1 gap-1 rounded bg-white/15">
              <SelectValue placeholder={10} />
            </SelectTrigger>
            <SelectContent>
              {pageAccounts.map((pageAccount) => (
                <SelectItem value={pageAccount.toString()} key={pageAccount}>
                  {pageAccount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <div className="font-normal text-[14px] leading-[20px] text-white/60">
            Page
          </div>
          <div className="flex items-center gap-3">
            <FaChevronLeft color="#FFFFFF99" className="cursor-pointer" />
            <div className="flex text-[14px] font-normal leading-[20px] bg-white/15 rounded py-2.5 px-3">
              <div className="text-white">1</div>
              <div className="text-white/60">/4</div>
            </div>
            <FaChevronRight color="white" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
