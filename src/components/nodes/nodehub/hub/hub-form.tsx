import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Tab } from "@/components/common/table"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { COUNTRIES } from "@/features/countries/constants"
import { Logger } from "@/features/logger"

const logger = Logger.create("<CreateNodeForm>")

const regions = ["Africa", "Asia", "Australia", "Europe", "USA"]

const nodeFormSchema = z.object({
  operator_did: z.string(),
  public_key: z.string(),
  slots: z.number(),
  region: z.enum(["Africa", "Asia", "Australia", "Europe", "USA"]),
  countryCode: z.string(),
  endpoint_url: z.string().url(),
  datacenter: z.string(),
})

const CreateNodeForm = ({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<Tab>>
}) => {
  const form = useForm<z.infer<typeof nodeFormSchema>>({
    resolver: zodResolver(nodeFormSchema),
  })

  function onSubmit(values: z.infer<typeof nodeFormSchema>) {
    logger.debug("Submitted values", values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-2 space-y-5 px-2"
      >
        <FormField
          control={form.control}
          name="operator_did"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Node Operator DID</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="rounded-lg bg-white/20 px-3"
                  placeholder="did:VDA:mainnet:0x486e2c30cd7149bf1f77fe8d553c8078b9644a55"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="public_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Node Public Key</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="rounded-lg bg-white/20 px-3"
                  placeholder="12v63ZuXUvMF42ZFh1hPbGkfWB7DR7hCCpwA6NAiEQnbKKJH8fG"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Slots</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="rounded-lg border-white bg-white/10 px-3 focus-visible:outline-1"
                  placeholder="Enter number of slots"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Region</FormLabel>
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
                    {regions.map((region) => (
                      <SelectItem
                        key={region}
                        value={region}
                        useCheckmark={false}
                      >
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country Code</FormLabel>
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
                    {COUNTRIES.map((countryCode, index) => (
                      <SelectItem
                        key={index}
                        value={countryCode.code}
                        useCheckmark={false}
                      >
                        {`${countryCode.country} (${countryCode.code})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="endpoint_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="rounded-lg\\ bg-white/10 px-3"
                  placeholder="Enter your URL"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Datacenter</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Data center 1", "Datacenter 2"].map((datacenter) => (
                    <SelectItem
                      key={datacenter}
                      value={datacenter}
                      useCheckmark={false}
                    >
                      {datacenter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3">
          <Button className="h-[48px] w-[98px] rounded-lg bg-white/15 px-6 py-2.5">
            Cancel
          </Button>
          <Button
            className="h-[48px] w-[116px] rounded-lg bg-white px-6 py-[14px] text-black disabled:opacity-30"
            // disabled={!form.formState.isValid}
            // type="submit"
            onClick={() => {
              setTab("stake")
            }}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateNodeForm
