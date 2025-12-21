import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-20 mt-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight flex items-center">
        <Link href="/" className="hover:underline text-neutral-900 dark:text-neutral-50">
          Divine Insights
        </Link>
      </h2>
      <ThemeSwitcher />
    </div>
  );
};

export default Header;
