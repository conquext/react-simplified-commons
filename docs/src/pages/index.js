import * as React from 'react'
import { Banner } from 'components/Banner'
import { Sticky } from 'components/Sticky'
import { Nav } from 'components/Nav'
import { siteConfig } from 'siteConfig'
import Link from 'next/link'
import { Footer } from 'components/Footer'
import { ClientsMarquee } from 'components/clients/ClientsMarquee'
import { Seo } from 'components/Seo'
import Head from 'next/head'

const Home = props => {
  return (
    <React.Fragment>
      <Seo
        title="React Table"
        description="Hooks for building lightweight, fast and extendable datagrids for React"
      />
      <Head>
        <title>
          React Table - Hooks for building lightweight, fast and extendable
          datagrids for React
        </title>
      </Head>
      <div className="h-full min-h-full bg-gray-50">
        <Banner />
        <Sticky>
          <Nav />
        </Sticky>
        <div className="relative overflow-hidden bg-white">
          <div className="container relative px-4 py-24 mx-auto sm:mt-12">
            <img
              src={require('images/emblem-light.svg')}
              className="absolute right-0 h-0 transform scale-150 translate-x-1/2 -translate-y-1/2 top-1/2 lg:h-full xl:translate-x-1/5"
              alt="React Table Emblem"
            />
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-6 ">
                <div className="text-center lg:text-left md:max-w-2xl md:mx-auto ">
                  <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    Lightweight and extensible
                    <br className="hidden md:inline xl:hidden" />{' '}
                    <span>data tables for React</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Build and design powerful datagrid experiences while
                    retaining 100% control over markup and styles.
                  </p>

                  <div className="mx-auto mt-5 sm:flex sm:justify-center lg:justify-start lg:mx-0 md:mt-8">
                    <div className="rounded-md shadow">
                      <Link href="/docs/overview">
                        <a className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-coral hover:bg-coral-light focus:outline-none focus:border-coral focus:shadow-outline-coral md:py-4 md:text-lg md:px-10">
                          Get Started
                        </a>
                      </Link>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                      <a
                        href={siteConfig.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 transition duration-150 ease-in-out bg-white border border-transparent rounded-md text-coral hover:text-coral-light focus:outline-none focus:border-coral-light focus:shadow-outline-coral md:py-4 md:text-lg md:px-10"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-lg border-t border-gray-200 bg-gray-50 ">
          <div className="py-24 ">
            <div className="container mx-auto">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div>
                  <div>
                    <h3 className="text-xl font-bold leading-6 text-gray-900 xl:text-2xl">
                      Designed to have zero design.
                    </h3>
                    <p className="mt-2 text-base leading-6 text-gray-600 lg:mt-4 xl:text-lg lg:leading-normal">
                      You want your tables to be powerful without sacrificing
                      how they look! After all, what good is that nice theme you
                      designed if you can't use it?! React Table is{' '}
                      <strong>headless</strong> by design (it's just a hook),
                      which means that you are in complete and full control of
                      how your table renders down to the very last component,
                      class or style.
                    </p>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0">
                  <div>
                    <h3 className="text-xl font-bold leading-6 text-gray-900 xl:text-2xl">
                      Powerful and Declarative
                    </h3>
                    <p className="mt-2 text-base leading-6 text-gray-600 lg:mt-4 xl:text-lg lg:leading-normal">
                      React Table is a workhorse. It's built to materialize,
                      filter, sort, group, aggregate, paginate and display
                      massive data sets using a very small API surface. Just
                      hitch your wagon (new or existing tables) to React Table
                      and you'll be supercharged into productivity like never
                      before.
                    </p>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0">
                  <div>
                    <h3 className="text-xl font-bold leading-6 text-gray-900 xl:text-2xl">
                      Extensible
                    </h3>
                    <p className="mt-2 text-base leading-6 text-gray-600 lg:mt-4 xl:text-lg lg:leading-normal">
                      Plugins are important for a healthy ecosystem, which is
                      why React Table has it's very own plugin system allowing
                      you to override or extend any logical step, stage or
                      process happening under the hood. Are you itching to build
                      your own row grouping and aggregation strategy? It's all
                      possible!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6">
            <div className="mb-3 text-sm font-semibold tracking-wider text-center text-gray-400 uppercase">
              Trusted in Production by
            </div>

            <ClientsMarquee />
          </div>
        </div>
        <div className="relative overflow-hidden text-lg bg-white border-t border-gray-200">
          <div className="lg:block lg:absolute lg:inset-0">
            <svg
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width="2400"
              height="2400"
              fill="none"
              viewBox="0 0 2400 2400"
            >
              <defs>
                <pattern
                  id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-100"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                x="0"
                width="2400"
                height="2400"
                fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
              />
            </svg>
          </div>
          <div className="relative py-12">
            <div className="m-6 text-4xl font-semibold tracking-wider text-center text-gray-500 uppercase">
              Diamond Sponsors
            </div>

            <a
              href="https://github.com/sponsors/tannerlinsley"
              target="_blank"
              className="flex items-center justify-center w-56 h-56 m-auto text-sm font-bold text-gray-500 transition duration-200 ease-out bg-gray-200 border-4 border-transparent rounded-full opacity-50 hover:border-green-500 hover:text-green-500 hover:opacity-100"
            >
              Become a Sponsor
            </a>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="mt-10">
                <div className="m-6 mt-10 text-3xl font-semibold tracking-wider text-center text-gray-500 uppercase">
                  Gold Sponsors
                </div>
                <a
                  href="https://tryretool.com/?utm_source=sponsor&utm_campaign=react_table"
                  target="_blank"
                  className="block m-auto w-96"
                >
                  <img src="https://raw.githubusercontent.com/tannerlinsley/files/master/images/patreon/sponsor-retool.png" />
                </a>
              </div>

              <div className="mt-10">
                <div className="m-6 mt-10 text-3xl font-semibold tracking-wider text-center text-gray-500 uppercase">
                  Silver Sponsors
                </div>
                <a
                  href="https://neo4j.com/"
                  target="_blank"
                  className="block w-64 m-auto mb-6"
                >
                  <img src="https://go.neo4j.com/rs/710-RRC-335/images/neo4j_logo.svg" />
                </a>
                <a
                  href="https://nozzle.io/"
                  target="_blank"
                  className="block w-64 m-auto"
                >
                  <img
                    src="https://nozzle.io/img/logo-blue.png"
                    alt="Nozzle - Google Keyword Rank Tracker"
                  />
                </a>
              </div>

              <div className="mt-10">
                <div className="m-6 mt-10 text-3xl font-semibold tracking-wider text-center text-gray-500 uppercase">
                  Bronze Sponsors
                </div>
                <a
                  href="https://tripwire.com"
                  target="_blank"
                  className="block w-48 m-auto mb-6"
                >
                  <img src="https://www.tripwire.com/-/media/tripwiredotcom/icons/tripwire-logo-footer.svg"></img>
                </a>
                <a
                  href="https://www.fream.pl/"
                  target="_blank"
                  className="block w-48 m-auto mb-6"
                >
                  <img src="https://www.fream.pl/wp-content/uploads/2017/08/logo.png"></img>
                </a>
                <a
                  href="https://www.encamp.com/careers/senior-software-engineer"
                  target="_blank"
                  className="block w-48 m-auto"
                >
                  <img src="https://assets.website-files.com/5dee7e4754c6bbc1eaf4210b/5deea3042cdb07ff7082211d_encamp-logo.svg"></img>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="mt-10">
                <div className="m-3 mt-10 text-2xl font-semibold tracking-wider text-center text-gray-500 uppercase">
                  Supporters
                </div>
                <ul className="text-center list-none">
                  <li className="font-bold text-gray-800">Jon Eickmeier</li>
                  <li className="font-bold text-blue-800">
                    <a href="https://github.com/rhefner">
                      Richard Hefner (@rhefner)
                    </a>
                  </li>
                  <li className="font-bold text-blue-800">
                    <a href="https://gitHub.com/snorkypie">
                      Steeve Lennmark (@snorkypie)
                    </a>
                  </li>
                  <li className="font-bold text-blue-800">
                    <a href="https://github.com/jthurau">Josh Thurau</a>
                  </li>
                  <li className="font-bold text-blue-800">
                    <a href="https://github.com/gragland">Gabe Ragland</a>
                  </li>
                </ul>
              </div>

              <div className="mt-10">
                <div className="m-3 mt-10 text-2xl font-semibold tracking-wider text-center text-gray-500 uppercase">
                  Fans
                </div>
                <ul className="text-center list-none">
                  <li>Hugo Meissner</li>
                  <li>Benoit Leger-Derville</li>
                  <li>David Pickut</li>
                  <li>Robert Tajnšek</li>
                  <li>Eric Lanehart (@pushred)</li>
                  <li>Anish P Patel (@anishpatelyaadada)</li>
                  <li>Janus Reith (@janus-reith)</li>
                  <li>Timo Mämecke (@timomeh)</li>
                  <li>Tyler Reiff (@reiff12)</li>
                  <li>Matt Stvartak (@mattstvartak)</li>
                  <li>JP Rosevear (@jprosevear)</li>
                  <li>Stefan Khan-Kernahan (@skhanker)</li>
                  <li>Nicholas Canvoa</li>
                </ul>
              </div>
              <div className="mt-10">
                <div className="m-3 mt-10 text-2xl font-semibold tracking-wider text-center text-gray-500 uppercase">
                  Fans
                </div>
                <ul className="text-center list-none">
                  <li>Jesse Jafa (@awareness481)</li>
                  <li>Salik Syed (@saliksyed)</li>
                  <li>Chet Corcos (@ccorcos)</li>
                  <li>Yefri Laura (@yefrioscar)</li>
                  <li>Muhammad Umar (@umarmuha)</li>
                  <li>Joe Alden (@joalden)</li>
                  <li>Standard Resume (@StandardResumeSponsors)</li>
                  <li>Jay (@jjstrat3)</li>
                  <li>TC Schiller (@tcschiller)</li>
                  <li>Brent Clark (@brentmclark)</li>
                  <li>Mario Menjívar (@mariomenjr)</li>
                  <li>Kelley van Evert (@kelleyvanevert)</li>
                  <li>Aaron VanEtveldt (@totaldis)</li>
                </ul>
              </div>
            </div>
            <div className="mt-10 text-center">
              <a
                href="https://github.com/sponsors/tannerlinsley"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 text-base text-lg font-medium font-bold leading-6 text-white transition duration-150 ease-in-out bg-green-500 border border-transparent rounded-full hover:bg-green-500-light focus:outline-none focus:shadow-outline"
              >
                Become a Sponsor
              </a>
            </div>
          </div>
        </div>

        <div className="relative py-24 bg-gray-100 border-t border-gray-200 ">
          <div className="container max-w-3xl px-4 mx-auto sm:px-6 lg:px-8 sm:text-center">
            <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 lg:leading-none">
              Take it for a spin!
            </h3>
            <p className="my-4 text-xl leading-7 text-gray-600">
              With some basic styles, some table markup and few columns, you're
              already well on your way to creating a drop-dead powerful table.
            </p>
          </div>
          <div
            style={{
              height: 224,
            }}
          />
        </div>

        <section className="bg-gray-900 body-font">
          <div className="container relative px-4 mx-auto max-w-7xl -mt-72">
            <iframe
              src="https://codesandbox.io/embed/github/tannerlinsley/react-table/tree/master/examples/basic?autoresize=1&fontsize=16&theme=dark"
              title="tannerlinsley/react-table: basic"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              className="shadow-2xl"
              style={{
                width: '100%',
                height: '80vh',
                border: '0',
                borderRadius: 8,
                overflow: 'hidden',
                position: 'static',
                zIndex: 0,
              }}
            ></iframe>
          </div>
          <div className="container px-4 py-24 mx-auto sm:px-6 lg:px-8">
            <div className="pb-16  sm:text-center">
              <h3 className="mx-auto mt-2 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:leading-none">
                You get a hook! And you get a hook!
              </h3>
              <p className="max-w-3xl mx-auto mt-4 text-xl leading-7 text-gray-300">
                React Table is built with hooks in mind for just about
                everything. Even the plugins themselves are hooks! And as you
                can see with these features, hooks pack a powerful punch.
              </p>
            </div>
            <div>
              <div className="grid max-w-screen-lg grid-flow-row grid-cols-1 gap-4 mx-auto text-lg text-white sm:grid-cols-2 md:grid-cols-3">
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Lightweight (5k - 14kb)
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  100% Custom Cell Formmatters
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Headless
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Auto out-of-the-box
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Opt-in fully controllable
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Sorting
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Multi Sort
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Global Filters
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Columns Filters
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Pagination
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Row Grouping
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Aggregation
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Row Selection
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Row Expansion
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Column Ordering
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Virtualizable
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Resizable Columns
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Server-side data models
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Plugin System
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Nested/Grouped Headers
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Footers
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Sub-Row Components
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Column Hiding
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-800 rounded-full bg-coral">
                    <Check />
                  </span>
                  Table, Flex, and Grid Helpers
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-gray-200 border-b border-gray-300">
          <div className="container py-12 mx-auto text-center">
            <h3 className="mx-auto mt-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-800 md:text-5xl lg:leading-none">
              Feeling Chatty?
            </h3>
            <a
              href="https://discord.gg/WrRKjPJ"
              target="_blank"
              className="inline-block p-5 mx-auto mt-12 text-2xl font-extrabold leading-tight tracking-tight text-white bg-gray-800 rounded-full"
            >
              Join the #TanStack Discord!
            </a>
          </div>
        </div>
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="container flex flex-wrap items-center justify-between px-4 py-24 mx-auto md:flex-no-wrap md:space-x-8">
            <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Wow, you've come a long way!
            </h2>
            <div className="flex mt-8 lg:flex-shrink-0 md:mt-0">
              <div className="inline-flex rounded-md shadow">
                <Link href="/docs/overview">
                  <a className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-center text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-coral hover:bg-coral-light focus:outline-none focus:shadow-outline">
                    Okay, let's get started!
                  </a>
                </Link>
              </div>
              <div className="inline-flex ml-3 rounded-md shadow">
                <a
                  href={siteConfig.repoUrl}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-center transition duration-150 ease-in-out bg-white border border-transparent rounded-md text-coral hover:text-coral-light focus:outline-none focus:shadow-outline"
                >
                  Take me to the GitHub repo.
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <style jsx global>{`
          .gradient {
            -webkit-mask-image: linear-gradient(
              180deg,
              transparent 0,
              #000 30px,
              #000 calc(100% - 200px),
              transparent calc(100% - 100px)
            );
          }
        `}</style>
      </div>
    </React.Fragment>
  )
}

export default Home
Home.displayName = 'Home'
const Check = React.memo(() => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="3"
    className="w-3 h-3"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5"></path>
  </svg>
))
