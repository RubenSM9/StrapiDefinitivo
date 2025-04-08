import { CMS_NAME } from "@lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
      {CMS_NAME}log.{CMS_NAME}
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        ya controlo{" "}
        <a
          href="https://www.google.com"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          {CMS_NAME}
        Google
        </a>{" "}
        and {CMS_NAME}.{CMS_NAME}
      </h4>
    </section>
  );
}
