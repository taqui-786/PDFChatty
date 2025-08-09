import Link from 'next/link';
import HeroImg from '../../public/hero_section_img.png'
export   const portfolioConfig = {
  title: "PDFlow – Chat, Summarize, and Extract PDFs Effortlessly",
  description:
    "PDFlow is your AI-powered document assistant. Upload any PDF and instantly get summaries, key points, named entities, and even chat with your documents using a beautiful flow-based interface.",
  }
function Page() {
  return (
    <div className="flex-1 space-y-16 px-6 py-20 sm:space-y-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="text-3xl leading-[1.2] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          Your PDFs Just Got 100x Smarter
        </h2>
        <p className="text-muted-foreground mt-6 text-center text-xl tracking-normal text-balance sm:text-2xl sm:leading-normal md:text-3xl">
        Drag, drop, and dissect every page with AI tools designed for serious document wrangling.
        </p>
        <div className="mx-auto mt-10 flex w-full max-w-xs flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={'/chat'} prefetch={false}>
          <button
            data-slot="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-primary/70 focus-visible:ring-primary/20 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-12 px-6 has-[>svg]:px-6 text-lg leading-[0.1] [&amp;_svg:not([className*='size-'])]:size-5 w-full sm:w-auto"
          >
            Get Started{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-up-right"
              aria-hidden="true"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </button>
                    </Link>

          <Link href={'/learn'}  prefetch={false}>
          <button
            data-slot="button"
            className="inline-flex cursor-pointer  items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-primary/70 focus-visible:ring-primary/20 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-12 px-6 has-[>svg]:px-6 text-lg leading-[0.1] [&amp;_svg:not([className*='size-'])]:size-5 w-full sm:w-auto"
            >
            
            Learn More
          </button>
            </Link>
        </div>
      </div>
      <div className="bg-primary/90 mx-auto aspect-video w-full  max-w-screen-xl rounded-lg border p-1.5 sm:p-2.5 sm:shadow-lg">
        <img
          src={HeroImg.src}
          alt=""
          className="h-full w-full rounded-md border object-cover object-top dark:hidden"
        />
        <img
          src={HeroImg.src}
          alt=""
          className="hidden h-full w-full rounded-md border object-cover object-top dark:block"
        />
      </div>
    </div>
  );
}

export default Page;
