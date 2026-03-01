import { useState } from 'react'

export default function AccessManagement() {
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectingUser, setRejectingUser] = useState<any>(null)

  const mockPendingUsers = [
    { id: '1', fullName: 'Aboi Employee', email: 'aboi@gmail.com', username: 'aboi', status: 'Pending', date: '12/12/2026' },
    { id: '2', fullName: 'Karyawan New', email: 'new@gmail.com', username: 'karyawan', status: 'Pending', date: '13/12/2026' },
  ]

  const handleApprove = (user: any) => {
    alert(`${user.fullName} has been approved!`)
  }

  const handleRejectClick = (user: any) => {
    setRejectingUser(user)
    setShowRejectModal(true)
  }

  const confirmReject = () => {
    if (rejectingUser) {
      alert(`${rejectingUser.fullName}'s registration has been rejected.`)
      setShowRejectModal(false)
      setRejectingUser(null)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Access Management</h1>
      <p className="text-gray-600 mb-8">Review and approve new user registrations</p>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Pending Approvals</h2>

        {mockPendingUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No pending approvals</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockPendingUsers.map(user => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{user.fullName}</h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                    <div className="flex gap-6 mt-3 text-sm">
                      <span className="text-gray-600">
                        <span className="font-medium">Username:</span> {user.username}
                      </span>
                      <span className="text-gray-600">
                        <span className="font-medium">Date:</span> {user.date}
                      </span>
                    </div>
                    <span className="inline-block mt-3 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(user)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectClick(user)}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">⚠️</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Are you sure?</h2>
              <p className="text-gray-600 text-center mb-6">
                You won't reject this account?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false)
                    setRejectingUser(null)
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
