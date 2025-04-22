import { getUsers } from "@/lib/admin-utils"
import { UsersTable } from "@/components/admin/users-table"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#503E24]">Users</h1>
        <p className="text-[#503E24]/70 mt-1">Manage user accounts and permissions</p>
      </div>

      <UsersTable users={users} />
    </div>
  )
}
