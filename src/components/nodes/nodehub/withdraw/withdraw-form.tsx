import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogTitle } from "@/components/ui/dialog";
import { Tab } from "../../nodelist/data-table";
import { Button } from "@/components/ui/button";

const fallbacks = ["1234567890", "1234567891"];

const withdrawFormSchema = z.object({
  fallback: z.enum(["1234567890", "1234567891"]),
});

const WithdrawForm = ({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
}) => {
  const form = useForm<z.infer<typeof withdrawFormSchema>>({
    resolver: zodResolver(withdrawFormSchema),
  });

  const onSubmit = (values: z.infer<typeof withdrawFormSchema>) => {
    console.log(values);
    setTab("success");
    setTimeout(() => {
      setTab("error");
    }, 5000);
  };

  return (
    <>
      <DialogTitle className="text-center font-bold text-[18px] leading-[20px] text-white">
        Withdraw Node
      </DialogTitle>
      <div className="text-white/60 font-normal text-[14px] leading-[21px] mt-4">
        By removing a node, the status will change to{" "}
        <span className="text-white">'Deregister'</span>. The node remains in
        this status for a notice period of{" "}
        <span className="text-white">28 days</span>. After that period, you will
        have the option to <span className="text-white">unstake your VDA.</span>{" "}
        Please check back in <span className="text-white">28 days</span> to
        initiate the unstaking process.
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="fallback"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fallback" className="text-white">
                  Select a fallback node
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/10">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fallbacks.map((fallback) => (
                      <SelectItem
                        key={fallback}
                        value={fallback}
                        useCheckmark={false}
                      >
                        {fallback}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This node will manage the user data that hasn't been moved
                  before the notice period. This node must be in the same region
                  and country.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            className="bg-white text-black py-[14px] px-6 rounded-lg h-[48px] disabled:opacity-30 w-full"
            type="submit"
            disabled={!form.formState.isValid}
          >
            Confirm
          </Button>
          <div className="flex justify-between font-semibold text-[11px] leading-[16px]">
            <div>Gas fees</div>
            <div>$ 15.14</div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default WithdrawForm;
