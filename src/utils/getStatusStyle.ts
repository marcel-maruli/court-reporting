export const getStatusStyles = (status: string) => {
  switch (status) {
    case 'NEW': return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'ASSIGNED': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'TRANSCRIBED': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'REVIEWED': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-600';
  }
};