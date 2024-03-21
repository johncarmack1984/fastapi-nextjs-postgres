import Image from "next/image";

export function TopBar() {
  return (
    <nav className="bg-[rgba(251,_251,_253,_0.8)] [backdrop-filter:saturate(180%)_blur(20px)] py-4 shadow-topbar sticky z-30 top-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <a className="text-3xl font-bold text-gray-800" href="#">
            <Image
              src="/mdme-full-logo-black.ee131f12.svg"
              alt="MDme"
              width={133}
              height={40}
            />
          </a>
        </div>
        <div className="hidden space-x-8 md:flex">
          <a
            className="text-base font-medium text-gray-500 hover:text-gray-900"
            href="#"
          >
            NEW CHAT
          </a>
          <a
            className="text-base font-medium text-gray-500 hover:text-gray-900"
            href="#"
          >
            COMMUNITY
          </a>
          <a
            className="text-base font-medium text-gray-500 hover:text-gray-900"
            href="#"
          >
            LEARN MORE
          </a>
          <a
            className="text-base font-medium text-gray-500 hover:text-gray-900"
            href="#"
          >
            JOIN
          </a>
          <a
            className="text-base font-medium text-gray-500 hover:text-gray-900"
            href="#"
          >
            SIGN IN
          </a>
        </div>
      </div>
    </nav>
  );
}
