import { NodesTable } from "@/app/nodes/_components/nodes-table"
import NodesList from "@/components/nodes/NodesList"

export function NodesTableSection() {
  return (
    <>
      {/* TODO: Remove old Nodes list once the new table is ready*/}
      <NodesList />
      <NodesTable />
    </>
  )
}
