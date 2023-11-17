export default function Button({ type, value, onClick }) {
  return (
    <input
      className="text-white dark:text-black text-[15px] font-medium tracking-[0.1pt] h-[40px] px-[24px] bg-black dark:bg-white shadow-1 rounded-full cursor-pointer"
      type="submit"
      value={value}
      onClick={onClick}
    />
  );
}
