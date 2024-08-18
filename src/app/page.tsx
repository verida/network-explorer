import { redirect } from "next/navigation"

import { getIdentitiesPageRoute } from "@/features/routes/utils"

export default async function RootPage() {
  redirect(getIdentitiesPageRoute())
}
