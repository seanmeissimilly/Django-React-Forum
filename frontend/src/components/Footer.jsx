import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gray-400 p-3">
      <footer className="flex justify-between">
        <Typography color="blue-gray" className="text-left font-normal">
          © 2024 AlInfo
        </Typography>
        <ul className="flex gap-x-8">
          <li>
            <Typography
              as="a"
              href="/help"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Ayuda
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/about"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Acerca de
            </Typography>
          </li>
        </ul>
      </footer>
    </div>
  );
}
