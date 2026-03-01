import { useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function HRDashboard() {
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const mockRecords = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-01-21', checkIn: '08:15', status: 'Late' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-01-21', checkIn: '07:55', status: 'Present' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', date: '2024-01-21', checkIn: '-', status: 'Absent' },
  ]

  const weeklyData = [
    { day: 'Monday', present: 18, late: 2, absent: 1 },
    { day: 'Tuesday', present: 19, late: 1, absent: 1 },
    { day: 'Wednesday', present: 20, late: 0, absent: 1 },
    { day: 'Thursday', present: 19, late: 2, absent: 0 },
    { day: 'Friday', present: 17, late: 2, absent: 2 },
  ]

  const statusData = [
    { name: 'Present', value: 18, color: '#22c55e' },
    { name: 'Late', value: 2, color: '#eab308' },
    { name: 'Absent', value: 1, color: '#ef4444' },
  ]

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = !dateFilter || record.date?.startsWith(dateFilter)
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    return matchesSearch && matchesDate && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-semibold'
    switch (status) {
      case 'Present':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Present</span>
      case 'Late':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Late</span>
      case 'Absent':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Absent</span>
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Welcome back, Zulfi Alfarizi!</h1>
      <p className="text-gray-600 mb-8">Rabu, 21 Januari 2026</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <p className="text-sm font-medium text-gray-700">Total Employees</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">21</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <p className="text-sm font-medium text-gray-700">Present Today</p>
          <p className="text-3xl font-bold text-green-600 mt-2">0</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
          <p className="text-sm font-medium text-gray-700">Late Today</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">0</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
          <p className="text-sm font-medium text-gray-700">Absent Today</p>
          <p className="text-3xl font-bold text-red-600 mt-2">21</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Daily Attendance Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Weekly Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#22c55e" name="Present" />
              <Bar dataKey="late" fill="#eab308" name="Late" />
              <Bar dataKey="absent" fill="#ef4444" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Attendance Records</h2>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Employee</label>
            <input
              type="text"
              placeholder="Name or email"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
                setDateFilter('')
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Check In</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr key={record.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{record.name}</td>
                  <td className="px-4 py-3">{record.email}</td>
                  <td className="px-4 py-3">{record.date}</td>
                  <td className="px-4 py-3">{record.checkIn}</td>
                  <td className="px-4 py-3">{getStatusBadge(record.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-4">Showing {filteredRecords.length} records</p>
      </div>
    </div>
  )
}
