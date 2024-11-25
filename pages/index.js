import Head from "next/head"
import { Header, Sidebar } from "../components/index";

export default function Home() {
  return (
    <section className="App ">
      <Head>
        <title> AssetLink </title>
      </Head>
      <Header />
      <Sidebar/>
    </section>
  );
}