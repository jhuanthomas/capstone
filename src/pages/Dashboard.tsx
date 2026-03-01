import { useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const mockData = [
    { date: '2024-01-15', status: 'Present' },
    { date: '2024-01-16', status: 'Late' },
    { date: '2024-01-17', status: 'Present' },
    { date: '2024-01-18', status: 'Absent' },
    { date: '2024-01-19', status: 'Present' },
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

  const filteredData = mockData.filter(record => {
    const matchesDate = !dateFilter || record.date?.startsWith(dateFilter)
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    return matchesDate && matchesStatus
  })

  const stats = {
    monthAttendance: `${mockData.filter(r => r.status === 'Present').length}/${mockData.length}`,
    onTimeRate: `${Math.round((18 / 22) * 100)}%`,
    totalWorkingDays: 22,
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Employee Dashboard</h1>
      <p className="text-gray-600 mb-8">Rabu, 21 Januari 2026</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <p className="text-sm font-medium text-gray-700">This Month Attendance</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.monthAttendance}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <p className="text-sm font-medium text-gray-700">On Time Rate</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.onTimeRate}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <p className="text-sm font-medium text-gray-700">Total Working Days</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalWorkingDays}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
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
          <div className="flex items-end">
            <button
              onClick={() => {
                setDateFilter('')
                setStatusFilter('all')
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Attendance Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Check In</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{record.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      record.status === 'Present' ? 'bg-green-100 text-green-800' :
                      record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">08:15 AM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
