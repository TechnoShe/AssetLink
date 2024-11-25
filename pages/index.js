import Head from "next/head";
import { Main, Header, Sidebar } from "../components/index";

export default function Home() {
  return (
    <section className="App">
      <Head>
        <title>AssetLink</title>
      </Head>

      <Header />

      <div className="flex">
        <div
          style={{ background: "rgba(164, 178, 255, 0.2)" }}
          className="fixed top-24 p-4 z-5 left-4 bottom-0 w-64 rounded-lg mb-4 shadow-2xl shadow-black"
        >
          <Sidebar />
        </div>

        <div className=" ml-72 mt-[6rem] flex-grow h-[calc(100vh-6rem)] overflow-y-auto ">
          <Main />
        </div>
      </div>
    </section>
  );
}
