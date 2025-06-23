"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Eye, Edit, Trash2, UserCheck, Phone, Mail, Calendar, Users, TrendingUp } from "lucide-react"
import { getAllUsers, updateUserRole, verifyUserEmail, deleteUser, updateUserInfo, getUserById } from "@/actions/user"
import { toast } from "sonner"
import { format } from "date-fns"

type User = {
  id: string
  name: string | null
  email: string | null
  role: string
  emailVerified: Date | null
  phone: string | null
  image: string | null
  createdAt: Date
  _count: {
    investments: number
    complaints: number
    landSubmissions: number
  }
}

type UserDetail = {
  id: string
  name: string | null
  email: string | null
  role: string
  emailVerified: Date | null
  phone: string | null
  image: string | null
  createdAt: Date
  updatedAt: Date
  wallet: {
    balance: number
  } | null
  investments: Array<{
    id: string
    investmentAmount: number
    project: {
      title: string
      projectStatus: string
    }
  }>
  complaints: Array<{
    id: string
    subject: string
    status: string
    createdAt: Date
  }>
  _count: {
    investments: number
    complaints: number
    landSubmissions: number
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "USER"
  })

  useEffect(() => {
    loadUsers()
  }, [searchTerm, roleFilter, currentPage])

  const loadUsers = async () => {
    setLoading(true)
    const result = await getAllUsers({
      search: searchTerm,
      role: roleFilter,
      page: currentPage,
      limit: 10,
    })

    if (result.success) {
      setUsers(result.users)
      setPagination(result.pagination)
    } else {
      toast.error(result.error || "Failed to load users")
    }
    setLoading(false)
  }

  const handleViewUser = async (userId: string) => {
    const result = await getUserById(userId)
    if (result.user) {
      setSelectedUser(result.user)
      setViewDialogOpen(true)
    } else {
      toast.error(result.error || "Failed to load user details")
    }
  }

  const handleEditUser = async (userId: string) => {
    const result = await getUserById(userId)
    if (result.user) {
      setSelectedUser(result.user)
      setEditForm({
        name: result.user.name || "",
        email: result.user.email || "",
        phone: result.user.phone || "",
        role: result.user.role,
      })
      setEditDialogOpen(true)
    } else {
      toast.error(result.error || "Failed to load user details")
    }
  }

  const handleUpdateUser = async () => {
    if (!selectedUser) return

    // Update basic info
    const updateResult = await updateUserInfo(selectedUser.id, {
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
    })

    if (updateResult.success) {
      // Update role if changed
      if (editForm.role !== selectedUser.role) {
        const roleResult = await updateUserRole(selectedUser.id, editForm.role as any)
        if (!roleResult.success) {
          toast.error(roleResult.error || "Failed to update user role")
          return
        }
      }
      toast.success("User updated successfully")
      setEditDialogOpen(false)
      loadUsers()
    } else {
      toast.error(updateResult.error || "Failed to update user")
    }
  }

  const handleVerifyEmail = async (userId: string) => {
    const result = await verifyUserEmail(userId)
    if (result.success) {
      toast.success("User email verified successfully")
      loadUsers()
    } else {
      toast.error(result.error || "Failed to verify email")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      const result = await deleteUser(userId)
      if (result.success) {
        toast.success("User deleted successfully")
        loadUsers()
      } else {
        toast.error(result.error || "Failed to delete user")
      }
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500"
      case "DEVELOPER":
        return "bg-blue-500"
      default:
        return "bg-green-500"
    }
  }

  if (loading && users.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading users...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage all platform users</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Total Users: {pagination?.totalUsers || 0}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="USER">Users</SelectItem>
                <SelectItem value="ADMIN">Admins</SelectItem>
                <SelectItem value="DEVELOPER">Developers</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => loadUsers()}>
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({pagination?.totalUsers || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback>
                        {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.name || "No Name"}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-1" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-1" />
                          {user.phone}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {format(new Date(user.createdAt), "MMM dd, yyyy")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                      <div className="flex items-center space-x-2 mt-2">
                        {user.emailVerified ? (
                          <Badge variant="outline" className="text-green-600">
                            <UserCheck className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-orange-600">
                            Unverified
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {user._count.investments} investments • {user._count.complaints} complaints
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewUser(user.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user.id)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      {!user.emailVerified && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVerifyEmail(user.id)}
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, pagination.totalUsers)} of {pagination.totalUsers} users
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  disabled={!pagination.hasPrev}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={!pagination.hasNext}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.image || ""} />
                  <AvatarFallback>
                    {selectedUser.name?.charAt(0)?.toUpperCase() || selectedUser.email?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name || "No Name"}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <Badge className={getRoleBadgeColor(selectedUser.role)}>
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Phone</Label>
                  <p className="text-sm">{selectedUser.phone || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Email Verified</Label>
                  <p className="text-sm">{selectedUser.emailVerified ? "Yes" : "No"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Joined</Label>
                  <p className="text-sm">{format(new Date(selectedUser.createdAt), "PPP")}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Wallet Balance</Label>
                  <p className="text-sm">₦{selectedUser.wallet?.balance?.toLocaleString() || 0}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Investments</p>
                        <p className="text-2xl font-bold">{selectedUser._count.investments}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Complaints</p>
                        <p className="text-2xl font-bold">{selectedUser._count.complaints}</p>
                      </div>
                      <Users className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Land Submissions</p>
                        <p className="text-2xl font-bold">{selectedUser._count.landSubmissions}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {selectedUser.investments.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Recent Investments</Label>
                  <div className="mt-2 space-y-2">
                    {selectedUser.investments.slice(0, 3).map((investment) => (
                      <div key={investment.id} className="bg-gray-50 p-2 rounded">
                        <p className="text-sm font-medium">{investment.project.title}</p>
                        <p className="text-xs text-gray-600">
                          ₦{investment.investmentAmount.toLocaleString()} • {investment.project.projectStatus}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={editForm.role} onValueChange={(value) => setEditForm({ ...editForm, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="DEVELOPER">Developer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {users.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  )
}
