export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-white font-semibold">Derek Blidy</span>
          </div>

          <p className="text-sm text-center">
            &copy; {year} Derek Blidy. All rights reserved.
          </p>

          <a
            href="mailto:derekmblidy@gmail.com"
            className="text-sm hover:text-yellow-400 transition-colors"
          >
            derekmblidy@gmail.com
          </a>

        </div>
      </div>
    </footer>
  );
}
