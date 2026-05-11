// Card Component
// Reusable card component for displaying information

export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
