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
import { Tab } from "@/components/common/table";
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
      <DialogTitle className="text-center text-[18px] font-bold leading-[20px] text-foreground">
        Withdraw Node
      </DialogTitle>
      <div className="mt-4 text-[14px] font-normal leading-[21px] text-muted-foreground">
        By removing a node, the status will change to{" "}
        <span className="text-foreground">{`'Deregister'`}</span>. The node
        remains in this status for a notice period of{" "}
        <span className="text-foreground">28 days</span>. After that period, you
        will have the option to{" "}
        <span className="text-foreground">unstake your VDA.</span> Please check
        back in <span className="text-foreground">28 days</span> to initiate the
        unstaking process.
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-8">
          <FormField
            control={form.control}
            name="fallback"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fallback" className="text-foreground">
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
                  {`This node will manage the user data that hasn't been moved
                  before the notice period. This node must be in the same region
                  and country.`}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            className="h-[48px] w-full rounded-lg bg-white px-6 py-[14px] text-black disabled:opacity-30"
            type="submit"
            disabled={!form.formState.isValid}
          >
            Confirm
          </Button>
          <div className="flex justify-between text-[11px] font-semibold leading-[16px]">
            <div>Gas fees</div>
            <div>$ 15.14</div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default WithdrawForm;
