function ButtonRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-2 text-xs text-gray-500 sm:text-sm">
      {children}
    </div>
  );
}

export default ButtonRow;
